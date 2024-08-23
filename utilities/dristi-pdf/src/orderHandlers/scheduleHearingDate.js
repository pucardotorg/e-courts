const cheerio = require('cheerio');
const config = require("../config");
const { search_individual_uuid, search_case, search_order, search_mdms, search_hrms, create_pdf, search_sunbirdrc_credential_service, search_application } = require("../api");
const { renderError } = require("../utils/renderError");

function formatDate(epochMillis) {
    // Convert epoch milliseconds to a Date object
    const date = new Date(epochMillis);

    // Ensure that the date is a valid Date object
    if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

async function scheduleHearingDate(req, res, qrCode) {
    const cnrNumber = req.query.cnrNumber;
    const orderId = req.query.orderId;
    const tenantId = req.query.tenantId;
    const requestInfo = req.body.RequestInfo;
    const orderDate = req.query.date;
    const entityId = req.query.entityId;
    const code = req.query.code;

    const missingFields = [];
    if (!cnrNumber) missingFields.push("cnrNumber");
    if (!orderId) missingFields.push("orderId");
    if (!tenantId) missingFields.push("tenantId");
    if (!orderDate) missingFields.push("date")
    if (requestInfo === undefined) missingFields.push("requestInfo");
    if (qrCode === 'true' && (!entityId || !code)) missingFields.push("entityId and code");

    if (missingFields.length > 0) {
        return renderError(res, `${missingFields.join(", ")} are mandatory to generate the PDF`, 400);
    }

    // Function to handle API calls
    const handleApiCall = async (apiCall, errorMessage) => {
        try {
            return await apiCall();
        } catch (ex) {
            renderError(res, `${errorMessage}`, 500, ex);
            throw ex;  // Ensure the function stops on error
        }
    };

    try {
        // Search for case details
        const resCase = await handleApiCall(
            () => search_case(cnrNumber, tenantId, requestInfo),
            "Failed to query case service"
        );
        const courtCase = resCase?.data?.criteria[0]?.responseList[0];
        if (!courtCase) {
            renderError(res, "Court case not found", 404);
        }
        
        // Search for HRMS details
        const resHrms = await handleApiCall(
            () => search_hrms(tenantId, "JUDGE", courtCase.courtId, requestInfo),
            "Failed to query HRMS service"
        );
        const employee = resHrms?.data?.Employees[0];
        if (!employee) {
            renderError(res, "Employee not found", 404);
        }

        // Search for MDMS court room details
        const resMdms = await handleApiCall(
            () => search_mdms(courtCase.courtId, "common-masters.Court_Rooms", tenantId, requestInfo),
            "Failed to query MDMS service for court room"
        );
        const mdmsCourtRoom = resMdms?.data?.mdms[0]?.data;
        if (!mdmsCourtRoom) {
            renderError(res, "Court room MDMS master not found", 404);
        }

        // Search for MDMS court establishment details
        const resMdms1 = await handleApiCall(
            () => search_mdms(mdmsCourtRoom.courtEstablishmentId, "case.CourtEstablishment", tenantId, requestInfo),
            "Failed to query MDMS service for court establishment"
        );
        const mdmsCourtEstablishment = resMdms1?.data?.mdms[0]?.data;
        if (!mdmsCourtEstablishment) {
            renderError(res, "Court establishment MDMS master not found", 404);
        }

        // Search for order details
        const resOrder = await handleApiCall(
            () => search_order(tenantId, orderId, requestInfo),
            "Failed to query order service"
        );
        const order = resOrder?.data?.list[0];
        if (!order) {
            renderError(res, "Order not found", 404);
        }

        // Search for application details
        const resApplication = await handleApiCall(
            () => search_application(tenantId, order.applicationNumber[0], requestInfo),
            "Failed to query application service"
        );
        const application = resApplication?.data?.applicationList[0];
        if (!application) {
            renderError(res, "Application not found", 404);
        }

        // Search for individual details
        const resIndividual = await handleApiCall(
            () => search_individual_uuid(tenantId, application.onBehalfOf[0], requestInfo),
            "Failed to query individual service using id"
        );
        const individual = resIndividual?.data?.Individual[0];
        if (!individual) {
            renderError(res, "Individual not found", 404);
        }

        // Handle QR code if enabled
        let base64Url = "";
        if (qrCode === 'true') {
            const resCredential = await handleApiCall(
                () => search_sunbirdrc_credential_service(tenantId, code, entityId, requestInfo),
                "Failed to query sunbirdrc credential service"
            );
            const $ = cheerio.load(resCredential.data);
            const imgTag = $('img');
            if (imgTag.length === 0) {
                return renderError(res, "No img tag found in the sunbirdrc response", 500);
            }
            base64Url = imgTag.attr('src');
        }

        let year;
        if (typeof courtCase.filingDate === 'string') {
            year = courtCase.filingDate.slice(-4);
        } else if (courtCase.filingDate instanceof Date) {
            year = courtCase.filingDate.getFullYear();
        } else if (typeof courtCase.filingDate === 'number') {
            // Assuming the number is in milliseconds (epoch time)
            year = new Date(courtCase.filingDate).getFullYear();
        } else {
            return renderError(res, "Invalid filingDate format", 500);
        }

        var stringDate
        try {
            stringDate = formatDate(order.createdDate);
        } catch (error) {
            return renderError(res, "Cannot convert epoch time to date", 500, error);
        }

        const data = {
            "Data": [
                {
                    "courtName": mdmsCourtRoom.name,
                    "place": mdmsCourtEstablishment.boundaryName,
                    "state": mdmsCourtEstablishment.rootBoundaryName,
                    "caseNumber": courtCase.cnrNumber,
                    "year": year,
                    "caseName": courtCase.caseTitle,
                    "date": stringDate,
                    "dateOfNextHearing": orderDate,
                    "partyNames": `${individual.name.givenName} ${individual.name.familyName}`,
                    "additionalComments": order.comments,
                    "judgeSignature": "Judges Signature",
                    "judgeName": employee.user.name,
                    "courtSeal": "Court Seal",
                    "qrCodeUrl": base64Url
                }
            ]
        };

        // Generate the PDF
        const pdfKey = qrCode === 'true' ? config.pdf.schedule_hearing_date_qr : config.pdf.schedule_hearing_date;
        const pdfResponse = await handleApiCall(
            () => create_pdf(tenantId, pdfKey, data, req.body),
            "Failed to generate PDF of order for Scheduling of Hearing Date"
        )
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        pdfResponse.data.pipe(res).on('finish', () => {
            res.end();
        }).on('error', (err) => {
            return renderError(res, "Failed to send PDF response", 500, err);
        });
    } catch (ex) {
        return renderError(res, "Failed to query details of order for Scheduling of Hearing Date", 500, ex);
    }
}

module.exports = scheduleHearingDate;