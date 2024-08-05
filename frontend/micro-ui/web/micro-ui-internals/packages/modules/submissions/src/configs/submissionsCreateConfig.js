export const submissionTypeConfig = [
  {
    body: [
      {
        isMandatory: true,
        key: "submissionType",
        type: "dropdown",
        label: "SUBMISSION_TYPE",
        disable: true,
        populators: {
          name: "submissionType",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          styles: { maxWidth: "100%" },
          required: true,
          isMandatory: true,
          options: [
            {
              code: "APPLICATION",
              name: "APPLICATION",
            },
          ],
        },
      },
    ],
  },
];

export const applicationTypeConfig = [
  {
    body: [
      {
        isMandatory: true,
        key: "applicationType",
        type: "dropdown",
        label: "APPLICATION_TYPE",
        disable: false,
        populators: {
          name: "applicationType",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          styles: { maxWidth: "100%" },
          required: true,
          isMandatory: true,
          mdmsConfig: {
            masterName: "ApplicationType",
            moduleName: "Application",
            localePrefix: "APPLICATION_TYPE",
            select:
              "(data) => {return data['Application'].ApplicationType?.filter((item)=>![`EXTENSION_SUBMISSION_DEADLINE`,`RE_SCHEDULE`,`CHECKOUT_REQUEST`].includes(item.type)).map((item) => {return { ...item, name: 'APPLICATION_TYPE_'+item.type };});}",
          },
        },
      },
    ],
  },
];

export const configsRescheduleRequest = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        disable: true,
        isMandatory: false,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId", hideInForm: true },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: { name: "applicationDate" },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
      {
        inline: true,
        label: "INITIAL_HEARING_DATE",
        disable: true,
        isMandatory: true,
        key: "initialHearingDate",
        type: "date",
        populators: {
          name: "initialHearingDate",
          error: "CORE_REQUIRED_FIELD_ERROR",
        },
      },
      {
        inline: true,
        label: "RESCHEDULING_REASON",
        isMandatory: true,
        key: "reschedulingReason",
        type: "dropdown",
        populators: {
          name: "reschedulingReason",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          styles: { maxWidth: "100%" },
          required: true,
          isMandatory: true,
          mdmsConfig: {
            moduleName: "Application",
            masterName: "ReschedulingReason",
            select: "(data) => {return data['Application'].ReschedulingReason?.map((item) => {return item;});}",
          },
        },
      },
      {
        inline: true,
        label: "PROPOSED_DATE",
        isMandatory: true,
        key: "changedHearingDate",
        type: "date",
        populators: {
          name: "changedHearingDate",
          error: "CORE_REQUIRED_FIELD_ERROR",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "minTodayDateValidation",
            },
          },
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsCheckoutRequest = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        disable: true,
        isMandatory: false,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: { name: "applicationDate" },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
      {
        inline: true,
        label: "INITIAL_HEARING_DATE",
        disable: true,
        isMandatory: true,
        key: "initialHearingDate",
        type: "date",
        populators: {
          name: "initialHearingDate",
          error: "CORE_REQUIRED_FIELD_ERROR",
        },
      },
      {
        inline: true,
        label: "RESCHEDULING_REASON",
        isMandatory: true,
        key: "reschedulingReason",
        type: "dropdown",
        populators: {
          name: "reschedulingReason",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          styles: { maxWidth: "100%" },
          required: true,
          isMandatory: true,
          mdmsConfig: {
            moduleName: "Application",
            masterName: "ReschedulingReason",
            select: "(data) => {return data['Application'].ReschedulingReason?.map((item) => {return item;});}",
          },
        },
      },
      {
        inline: true,
        label: "PROPOSED_DATE",
        isMandatory: true,
        key: "changedHearingDate",
        type: "date",
        populators: {
          name: "changedHearingDate",
          error: "CORE_REQUIRED_FIELD_ERROR",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "minTodayDateValidation",
            },
          },
        },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsExtensionSubmissionDeadline = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
      {
        inline: true,
        label: "DOCUMENT_TYPE",
        isMandatory: true,
        disable: true,
        type: "dropdown",
        key: "documentType",
        populators: {
          name: "documentType",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          styles: { maxWidth: "100%" },
          required: true,
          isMandatory: true,
          mdmsConfig: {
            moduleName: "Submission",
            masterName: "DocumentType",
            localePrefix: "",
          },
        },
      },
      {
        inline: true,
        label: "SUBMISSION_DATE",
        isMandatory: true,
        disable: true,
        key: "initialSubmissionDate",
        type: "date",
        populators: {
          name: "initialSubmissionDate",
        },
      },
      {
        inline: true,
        label: "REQUESTED_DATE",
        isMandatory: true,
        key: "changedSubmissionDate",
        type: "date",
        populators: {
          name: "changedSubmissionDate",
        },
      },
      {
        inline: true,
        label: "EXTENSION_REASON",
        isMandatory: true,
        key: "extensionReason",
        type: "dropdown",
        populators: {
          name: "extensionReason",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          styles: { maxWidth: "100%" },
          required: true,
          isMandatory: true,
          mdmsConfig: {
            moduleName: "Application",
            masterName: "ExtensionReason",
            select: "(data) => {return data['Application'].ExtensionReason?.map((item) => {return item;});}",
          },
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "component",
        component: "SelectCustomTextArea",
        key: "extensionBenefit",
        isMandatory: true,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaHeader: "EXTENSION_BENEFIT",
              headerClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsProductionOfDocuments = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomDragDrop",
        key: "listOfProducedDocuments",
        isMandatory: true,
        populators: {
          inputs: [
            {
              // isMandatory: true,
              // isOptional: "CS_IS_OPTIONAL",
              isMandatory: true,
              name: "documents",
              // documentSubText: "PRODUCED_DOCUMENTS",
              documentHeader: "PRODUCED_DOCUMENTS",
              documentHeaderStyle: { fontSize: "19px", fontWeight: 700 },
              type: "DragDropComponent",
              maxFileSize: 50,
              maxFileErrorMessage: "CS_FILE_LIMIT_50_MB",
              fileTypes: ["PDF", "JPEG"],
              isMultipleUpload: true,
              uploadGuidelines: "UPLOAD_PDF_JPEG_50",
              headerClassName: "dristi-font-bold",
            },
          ],
        },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomDragDrop",
        key: "reasonForDocumentsSubmission",
        isMandatory: true,
        populators: {
          inputs: [
            {
              // isMandatory: true,
              // isOptional: "CS_IS_OPTIONAL",
              isMandatory: true,
              name: "documents",
              // documentSubText: "PRODUCED_DOCUMENTS",
              documentHeader: "REASON_FOR_DOCUMENT_SUBMISSION",
              documentHeaderStyle: { fontSize: "19px", fontWeight: 700 },
              type: "DragDropComponent",
              maxFileSize: 50,
              maxFileErrorMessage: "CS_FILE_LIMIT_50_MB",
              fileTypes: ["PDF", "JPEG"],
              isMultipleUpload: true,
              uploadGuidelines: "UPLOAD_PDF_JPEG_50",
              headerClassName: "dristi-font-bold",
            },
          ],
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsCaseWithdrawal = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
      {
        inline: true,
        label: "REASON_FOR_WITHDRAWAL",
        isMandatory: true,
        type: "dropdown",
        key: "reasonForWithdrawal",
        populators: {
          name: "reasonForWithdrawal",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          required: true,
          isMandatory: true,
          styles: { maxWidth: "100%" },
          mdmsConfig: {
            moduleName: "Application",
            masterName: "ReasonForWithdrawal",
            select: "(data) => {return data['Application'].ReasonForWithdrawal?.map((item) => {return item;});}",
          },
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsCaseTransfer = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
      {
        inline: true,
        label: "REQUESTED_COURT",
        isMandatory: true,
        disable: true,
        key: "requestedCourt",
        type: "text",
        populators: { name: "requestedCourt" },
      },
      {
        inline: true,
        label: "GROUNDS_FOR_SEEKING_TRANSFER",
        isMandatory: true,
        key: "groundsForTransfer",
        type: "text",
        populators: {
          name: "groundsForTransfer",
          error: "CS_ALPHANUMERIC_ALLOWED",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericInputTextValidation",
            },
          },
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsSettlement = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsBailBond = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
      {
        inline: true,
        label: "PLACE_OF_DETENTION",
        isMandatory: true,
        key: "placeOfDetention",
        type: "text",
        populators: {
          name: "placeOfDetention",
          error: "CS_ALPHANUMERIC_ALLOWED",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericInputTextValidation",
            },
          },
        },
      },
      {
        inline: true,
        label: "BAIL_AMOUNT",
        isMandatory: true,
        key: "bailAmount",
        type: "text",
        populators: {
          name: "bailAmount",
          error: "CS_VALID_AMOUNT_DECIMAL",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "twoDecimalNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsSuretyOld = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
      {
        inline: true,
        label: "NAME_OF_SURETY",
        isMandatory: true,
        key: "nameOfSurety",
        type: "text",
        populators: {
          name: "nameOfSurety",
          error: "CS_ALPHANUMERIC_ALLOWED",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericInputTextValidation",
            },
          },
        },
      },
      {
        inline: true,
        label: "BAIL_AMOUNT",
        isMandatory: true,
        key: "bailAmount",
        type: "text",
        populators: {
          name: "bailAmount",
          error: "CS_VALID_AMOUNT_DECIMAL",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "twoDecimalNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsBail = [
  {
    body: [
      {
        inline: true,
        label: "REF_ORDER_ID",
        isMandatory: false,
        disable: true,
        key: "refOrderId",
        type: "text",
        populators: { name: "refOrderId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: true,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: true,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: true,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: true,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_APPLICATION",
        disable: true,
        isMandatory: true,
        key: "applicationDate",
        type: "date",
        populators: {
          name: "applicationDate",
        },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: true,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "PARTY_TYPE",
        isMandatory: true,
        type: "dropdown",
        key: "partyType",
        populators: {
          optionsKey: "name",
          hideInForm: true,
          options: [
            {
              code: "complainant",
              name: "Complainant",
            },
            {
              code: "respondant",
              name: "Respondant",
            },
          ],
        },
      },
      {
        inline: true,
        label: "REPRESENTED_BY",
        isMandatory: true,
        key: "representedBy",
        type: "text",
        populators: { name: "representedBy", hideInForm: true },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomDragDrop",
        key: "documentsListForBail",
        isMandatory: true,
        populators: {
          inputs: [
            {
              isMandatory: true,
              name: "documents",
              // documentSubText: "PRODUCED_DOCUMENTS",
              documentHeader: "LIST_OF_DOCUMENTS",
              documentHeaderStyle: { fontSize: "19px", fontWeight: 700 },
              type: "DragDropComponent",
              maxFileSize: 50,
              maxFileErrorMessage: "CS_FILE_LIMIT_50_MB",
              fileTypes: ["PDF", "JPEG"],
              isMultipleUpload: true,
              uploadGuidelines: "UPLOAD_PDF_JPEG_50",
              headerClassName: "dristi-font-bold",
            },
          ],
        },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomTextArea",
        key: "reasonForBail",
        isMandatory: true,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaHeader: "REASON_FOR_BAIL",
              headerClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomTextArea",
        key: "comments",
        isMandatory: false,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "COMMENTS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              isOptional: true,
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];

export const configsSurety = [
  {
    body: [
      {
        label: "Add any information to support your application",
        placeholder: "Type Here.....",
        key: "additionalInfo",
        isMandatory: true,
        type: "textarea",
        inline: false,
        populators: {
          name: "additionalInfo",
        },
      },
      {
        type: "component",
        component: "SelectCustomNote",
        key: "info",
        inline: false,
        isMandatory: false,
        populators: {
          inputs: [
            {
              infoHeader: "Info",
              infoText: "If you would like to submit document(s) for bail bond, kindly make a separate submission for the same.",
              infoTooltipMessage: "CS_NOTETOOLTIP_RESPONDENT_PERSONAL_DETAILS",
              type: "InfoComponent",
            },
          ],
        },
      },
      {
        type: "component",
        component: "CustomInfo",
        key: "suretyDocuments",
        inline: false,
        isMandatory: false,
        populators: {
          inputs: [
            {
              infoHeader: "Surety documents",
              infoText: "To understand what kind of documents you can upload as surety,",
              infoTooltipMessage: "CS_NOTETOOLTIP_RESPONDENT_PERSONAL_DETAILS",
              type: "InfoComponent",
              linkText: "click here",
              modalHeading: "List of surety documents",
              modalData: [
                {
                  title: "Tax Records",
                  description: "PAN Card, Aadhar card, Passport, Driving license, Voter ID, Ration card or Bank passbook",
                  hint: "Upload .pdf or .jpg. Maximum upload size of 5MB",
                },
                {
                  title: "Salary Receipts",
                  description: "A copy of the bounced chequeon the  basis which this case is being filed",
                  hint: "Upload .pdf or .jpg. Maximum upload size of 5MB",
                },
              ],
            },
          ],
        },
      },
      {
        type: "component",
        component: "AddSubmissionDocument",
        key: "submissionDocuments",
        inline: false,
        populators: {
          inputs: [
            {
              isMandatory: true,
              key: "documentType",
              type: "dropdown",
              label: "Document Type",
              name: "documentType",
              disable: false,
              populators: {
                name: "documentType",
                optionsKey: "name",
                required: true,
                options: [
                  {
                    code: "taxRecords",
                    name: "Tax Records",
                  },
                  {
                    code: "salaryReciepts",
                    name: "Salary Reciepts",
                  },
                  // Add more options as needed
                ],
              },
            },
            {
              label: "Document Title",
              type: "text",
              name: "documentTitle",
              validation: {
                isRequired: true,
                pattern: /^[0-9A-Z/]{0,20}$/,
                errMsg: "",
              },
              isMandatory: true,
            },
            {
              label: "Attachment",
              type: "documentUpload",
              name: "document",
              validation: {
                isRequired: true,
              },
              isMandatory: true,
              allowedFileTypes: /(.*?)(png|jpeg|jpg|pdf)$/i,
            },
          ],
        },
      },
    ],
  },
];

export const configsOthers = [
  {
    body: [
      {
        label: "APPLICATION_TITLE",
        isMandatory: true,
        key: "applicationTitle",
        type: "text",
        populators: {
          name: "applicationTitle",
          error: "CS_ALPHANUMERIC_ALLOWED",
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericInputTextValidation",
            },
          },
        },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomTextArea",
        key: "applicationDetails",
        isMandatory: true,
        populators: {
          inputs: [
            {
              name: "text",
              textAreaSubHeader: "DETAILS",
              subHeaderClassName: "dristi-font-big-bold",
              placeholder: "TYPE_HERE_PLACEHOLDER",
              type: "TextAreaComponent",
            },
          ],
          validation: {
            customValidationFn: {
              moduleName: "dristiSubmissions",
              masterName: "alphaNumericValidation",
            },
          },
        },
      },
    ],
  },
];
