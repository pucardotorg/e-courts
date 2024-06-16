import React, { useMemo, useState } from "react";
import { FormComposerV2, Header, Loader, Toast } from "@egovernments/digit-ui-react-components";
import { CustomArrowDownIcon, RightArrow } from "../../../icons/svgIndex";
import { reviewCaseFileFormConfig } from "../../citizen/FileCase/Config/reviewcasefileconfig";
import AdmissionActionModal from "./AdmissionActionModal";
import { Redirect, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useSearchCaseService from "../../../hooks/dristi/useSearchCaseService";
import { DRISTIService } from "../../../services";
import { formatDate } from "../../citizen/FileCase/CaseType";
import CustomCaseInfoDiv from "../../../components/CustomCaseInfoDiv";

const DIGIT = window.Digit;

function CaseFileAdmission({ t, path }) {
  const [isDisabled, setIsDisabled] = useState(false);
  // const { caseId } = DIGIT.hooks.useQueryParams();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [submitModalInfo, setSubmitModalInfo] = useState(null);
  const [formdata, setFormdata] = useState({ isenabled: true, data: {}, displayindex: 0 });
  const roles = Digit.UserService.getUser()?.info?.roles;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const caseId = searchParams.get("caseId");
  const tenantId = window?.Digit.ULBService.getCurrentTenantId();
  const { data: caseFetchResponse, refetch: refetchCaseData, isLoading } = useSearchCaseService(
    {
      criteria: [
        {
          caseId: caseId,
        },
      ],
      tenantId,
    },
    {},
    "dristi",
    caseId,
    Boolean(caseId)
  );
  const caseDetails = useMemo(() => caseFetchResponse?.criteria?.[0]?.responseList?.[0] || null, [caseFetchResponse]);

  const formConfig = useMemo(() => {
    if (!caseDetails) return null;
    return [
      ...reviewCaseFileFormConfig.map((form) => {
        return {
          ...form,
          body: form.body.map((section) => {
            return {
              ...section,
              populators: {
                ...section.populators,
                inputs: section.populators.inputs?.map((input) => {
                  delete input.data;
                  return {
                    ...input,
                    data: caseDetails?.additionalDetails?.[input?.key]?.formdata || caseDetails?.caseDetails?.[input?.key]?.formdata || {},
                  };
                }),
              },
            };
          }),
        };
      }),
    ];
  }, [reviewCaseFileFormConfig, caseDetails]);

  const updateCaseDetails = async (action, data = {}) => {
    const newcasedetails = { ...caseDetails, additionalDetails: { ...caseDetails.additionalDetails, judge: data } };

    return DRISTIService.caseUpdateService(
      {
        cases: {
          ...newcasedetails,
          linkedCases: caseDetails?.linkedCases ? caseDetails?.linkedCases : [],
          filingDate: formatDate(new Date()),
          workflow: {
            ...caseDetails?.workflow,
            action,
          },
        },
        tenantId,
      },
      tenantId
    );
  };

  const caseInfo = [
    {
      key: "Case Number",
      value: caseDetails?.caseNumber,
    },
    {
      key: "Case Category",
      value: caseDetails?.caseCategory,
    },
    {
      key: "Case Type",
      value: "NIA S138",
    },
    {
      key: "Court Name",
      value: "Kerala City Criminal Court",
    },
    {
      key: "Submitted on",
      value: caseDetails?.filingDate,
    },
  ];
  const onFormValueChange = (setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
    if (JSON.stringify(formData) !== JSON.stringify(formdata.data)) {
      setFormdata((prev) => {
        return { ...prev, data: formData };
      });
    }
  };
  const onSubmit = () => {
    setSubmitModalInfo({
      header: "The case file has been admitted successfully.",
      subHeader: "Case updates with file number has been sent to all parties via SMS.",
      caseInfo: caseInfo,
      backButtonText: "Back to Home",
      nextButtonText: "Schedule next hearing",
      isArrow: false,
      showTable: true,
    });

    setModalInfo({ type: "admitCase", page: "0" });
    setShowModal(true);
  };
  const onSaveDraft = () => {
    setSubmitModalInfo({
      header: "Admission hearing has been successfully scheduled",
      caseInfo: [
        {
          key: "Case Number",
          value: caseDetails?.caseNumber,
        },
        {
          key: "Case Category",
          value: caseDetails?.caseCategory,
        },
        {
          key: "Case Type",
          value: "NIA S138",
        },
        {
          key: "Court Name",
          value: "Kerala City Criminal Court",
        },
        {
          key: "Submitted on",
          value: caseDetails?.filingDate,
        },
        {
          key: "Next Hearing Date",
          value: "17 March 2024",
        },
      ],
      shortCaseInfo: [
        {
          key: "Case Number",
          value: caseDetails?.caseNumber,
        },
        {
          key: "Court Name",
          value: "Kerala City Criminal Court",
        },
        {
          key: "Case Type",
          value: "NIA S138",
        },
      ],
      backButtonText: "Back to Home",
      nextButtonText: "Next Case",
      isArrow: true,
      showTable: true,
    });
    setShowModal(true);
    setModalInfo({ type: "schedule", page: "0" });
  };
  const onSendBack = () => {
    setSubmitModalInfo({
      header: "The case file has been sent back for correction",
      subHeader: "CASE_UPDATES_SENT_VIA_SMS_MESSAGE.",
      caseInfo: [{ key: "Case File Number", value: caseDetails?.filingNumber }],
      backButtonText: "Back to Home",
      nextButtonText: "Next Case",
      isArrow: true,
      showCopytext: true,
    });
    setShowModal(true);
    setModalInfo({ type: "sendCaseBack", page: "0" });
  };

  const closeToast = () => {
    setShowErrorToast(false);
  };

  const handleSendCaseBack = (props) => {
    updateCaseDetails("SEND_BACK", { comment: props?.commentForLitigant }).then((res) => {
      setModalInfo({ ...modalInfo, page: 1 });
    });
  };
  const handleAdmitCase = () => {
    updateCaseDetails("ADMIT", formdata).then((res) => {
      setModalInfo({ ...modalInfo, page: 1 });
    });
  };
  const handleScheduleCase = (props) => {
    updateCaseDetails("SCHEDULE_ADMISSION_HEARING", props).then((res) => {
      setModalInfo({ ...modalInfo, page: 2 });
    });
  };

  if (!caseId) {
    return <Redirect to="admission" />;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (showModal) {
    return (
      <AdmissionActionModal
        t={t}
        setShowModal={setShowModal}
        setSubmitModalInfo={setSubmitModalInfo}
        submitModalInfo={submitModalInfo}
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        handleSendCaseBack={handleSendCaseBack}
        handleAdmitCase={handleAdmitCase}
        path={path}
        handleScheduleCase={handleScheduleCase}
      ></AdmissionActionModal>
    );
  }
  const sidebar = ["litigentDetails", "caseSpecificDetails", "additionalDetails"];
  const labels = {
    litigentDetails: "CS_LITIGENT_DETAILS",
    caseSpecificDetails: "CS_CASE_SPECIFIC_DETAILS",
    additionalDetails: "CS_ADDITIONAL_DETAILS",
  };
  const complainantFirstName = caseDetails?.additionalDetails?.complaintDetails?.formdata[0].data?.firstName;
  const complainantLastName = caseDetails?.additionalDetails?.complaintDetails?.formdata[0].data?.lastName;

  const complainantFullName =
    complainantFirstName && complainantLastName
      ? `${complainantFirstName} ${complainantLastName}`
      : complainantFirstName || complainantLastName || "Unknown";

  const respondentFirstName = caseDetails?.additionalDetails?.respondentDetails?.formdata[0].data?.firstName;

  const respondentFullName = respondentFirstName || "Unknown";
  return (
    <div className="view-case-file">
      <div className="file-case">
        <div className="file-case-side-stepper">
          <div className="file-case-select-form-section">
            {sidebar.map((key, index) => (
              <div className="accordion-wrapper">
                <div key={index} className="accordion-title">
                  <div>{`${index + 1}. ${t(labels[key])}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="file-case-form-section">
          <div className="employee-card-wrapper">
            <div className="header-content">
              <div className="header-details">
                <Header>
                  {complainantFullName} <span style={{ color: "#77787B" }}>vs</span> {respondentFullName}
                </Header>
                <div className="header-icon" onClick={() => {}}>
                  <CustomArrowDownIcon />
                </div>
              </div>
            </div>
            <CustomCaseInfoDiv data={caseInfo} style={{ margin: "24px 0px" }} />
            <FormComposerV2
              label={t("CS_ADMIT_CASE")}
              config={formConfig}
              onSubmit={onSubmit}
              // defaultValues={}
              onSecondayActionClick={onSaveDraft}
              defaultValues={{}}
              onFormValueChange={onFormValueChange}
              cardStyle={{ minWidth: "100%" }}
              isDisabled={isDisabled}
              cardClassName={`e-filing-card-form-style review-case-file`}
              secondaryLabel={t("CS_SCHEDULE_ADMISSION_HEARING")}
              showSecondaryLabel={true}
              // actionClassName="admission-action-buttons"
              actionClassName="e-filing-action-bar"
              showSkip={true}
              onSkip={onSendBack}
              noBreakLine
              submitIcon={<RightArrow />}
            />
            {showErrorToast && <Toast error={true} label={t("ES_COMMON_PLEASE_ENTER_ALL_MANDATORY_FIELDS")} isDleteBtn={true} onClose={closeToast} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseFileAdmission;
