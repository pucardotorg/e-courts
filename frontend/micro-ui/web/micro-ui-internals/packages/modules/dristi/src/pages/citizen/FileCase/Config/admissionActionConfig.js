export const modalConfig = [
  {
    headModal: "Send Case Back",
    body: [
      {
        type: "component",
        component: "SelectCustomNote",
        key: "sendBackCaseNote",
        withoutLabel: true,
        populators: {
          inputs: [
            {
              infoHeader: "CS_COMMON_NOTE",
              infoText: "Please make sure you have reviewed all the necessary case details and documents.  ",
              infoTooltipMessage: "CS_NOTETOOLTIP_RESPONDENT_PERSONAL_DETAILS",
              type: "InfoComponent",
            },
          ],
        },
      },
      {
        type: "textarea",
        label: "Leave your comments for Litigants / Advocates to view",
        populators: {
          name: "commentForLitigant",
        },
      },
    ],
  },
  {
    headModal: "Are you sure you want to admit this case?",
    text:
      "By admitting this case, you confirm that you’ve considered all submissions and legal documents filed electronically and you ensure adherence to relevant statutes and judicial procedures",
    submitText: "Yes, I’m sure",
  },
  {
    headModal: "CS_SCHEDULE_ADMISSION_HEARING",
    label: "PURPOSE_OF_HEARING",
    name: "purposeOfHearing",
  },
  {
    headModal: "CS_SELECT_CUSTOM_DATE",
    label: "CS_HEARINGS_SCHEDULED",
    showBottomBar: true,
    buttonText: "CS_COMMON_CONFIRM",
  },
];
export const selectParticipantConfig = {
  header: "Choose participants for the hearing",
  checkBoxText: "Who should be present for the hearing on ",
  checkBoxes: [
    {
      name: "Compliant",
      dependentText: "Select one or more Complainants",
      dependentFields: ["Rajesh Khanna", "Suhani Bhati", "Kajol Chugh"],
    },
    {
      name: "Respondent",
      dependentText: "Select one or more Respondents",
      dependentFields: ["Shikha S.", "Kopal Singh"],
    },
  ],
};
