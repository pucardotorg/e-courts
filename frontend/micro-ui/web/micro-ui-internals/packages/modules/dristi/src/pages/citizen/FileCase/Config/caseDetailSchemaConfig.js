export const caseDetailsConfig = {
  chequeDetails: {
    number: {
      type: "string",
      pattern: "^\\d{6}$",
      description: "6 digit number",
    },
    amount: {
      type: "string",
      pattern: "^\\d{1,12}$",
      description: "up to 12 digit number",
    },
    payeeName: {
      type: "string",
      pattern: "^[a-zA-Z]{1,100}$",
      description: "sting having a max of 100 alphabets. no numbers",
    },
    payeeBank: {
      type: "string",
      pattern: "^[a-zA-Z0-9]{1,200}$",
      description: "sting having a max of 200 alphanumeric characters",
    },
    payerName: {
      type: "string",
      pattern: "^[a-zA-Z]{1,100}$",
      description: "sting having a max of 100 alphabets. no numbers",
    },
    payerBank: {
      type: "string",
      pattern: "^[a-zA-Z0-9]{1,200}$",
      description: "sting having a max of 200 alphanumeric characters",
    },
    payerBankIFSC: {
      type: "string",
      minLength: 11,
      maxLength: 11,
      pattern: "^[a-zA-Z]{4}0[a-zA-Z0-9]{6}$",
      description: "11 character string. first for alphabets. fifth 0. last six mostly numeric, but alphanumeric allowed",
    },
    cheque: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for bounced cheque, stored in the document array in main case object",
    },
    issueDate: {
      type: "string",
      format: "date",
    },
    depositDate: {
      type: "string",
      format: "date",
    },
    insufficientFunds: {
      type: "boolean",
    },
    returnMemo: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for cheque return memo, stored in the document array in main case object",
    },
    comments: {
      type: "string",
      pattern: "^[a-zA-Z0-9]{0,400}$",
      description: "any additional comments. max of 400 alphanumeric characters",
    },
    required: [
      "number",
      "amount",
      "payeeName",
      "payeeBank",
      "payerName",
      "payerBank",
      "payerBankIFSC",
      "cheque",
      "issueDate",
      "depositDate",
      "insufficientFunds",
      "returnMemo",
    ],
  },
  debtDetails: {
    debtLiability: {
      type: "boolean",
    },
    nature: {
      type: "string",
    },
    liability: {
      enum: ["full", "partial"],
    },
    amount: {
      type: "string",
      pattern: "^\\d{1,12}$",
      description: "up to 12 digit number",
    },
    debtLiabilityProof: {
      type: "boolean",
    },
    docProof: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for liability proof, stored in the document array in main case object",
    },
    comments: {
      type: "string",
      pattern: "^[a-zA-Z0-9]{0,400}$",
      description: "any additional comments. max of 400 alphanumeric characters",
    },
    required: ["debtLiability"],
  },
  demandNoticeDetails: {
    isTimelyNotice: {
      type: "boolean",
    },
    dispatchMode: {
      enum: ["post", "in-person"],
    },
    issueDate: {
      type: "string",
      format: "date",
    },
    dispatchDate: {
      type: "string",
      format: "date",
    },
    noticeDoc: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for demand notice, stored in the document array in main case object",
    },
    dispatchProofDoc: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for proof of dispatch of demand notice, stored in the document array in main case object",
    },
    serviceDate: {
      type: "string",
      format: "date",
    },
    isServiceProof: {
      type: "boolean",
    },
    serviceProofDoc: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for proof of service of demand notice, stored in the document array in main case object",
    },
    replyDate: {
      type: "string",
      format: "date",
    },
    replyProofDoc: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for proof of reply of demand notice, stored in the document array in main case object",
    },
    isPaidAfterNotice: {
      type: "boolean",
      description: "did the payer pay within 15 days after the notice or not",
    },
    accrualDate: {
      type: "string",
      format: "date",
      description:
        "Date when the 15 days from service of demand notice was complete (date of accrual of cause of action). Auto filled based on 15 days from service date",
    },
    required: ["isTimelyNotice", "dispatchMode", "issueDate", "dispatchDate", "serviceDate", "isServiceProof"],
  },
  delayAppDetails: {
    isDelayed: {
      type: "boolean",
    },
    reason: {
      type: "string",
      pattern: "^[a-zA-Z0-9]{0,400}$",
      description: "any additional comments. max of 400 alphanumeric characters",
    },
    document: {
      type: "string",
      format: "uuid",
      description: "uuid of the document for delay condonation application, stored in the document array in main case object",
    },
    required: ["isDelayed"],
  },
  required: ["chequeDetails", "debtDetails", "demandNoticeDetails", "delayAppDetails"],
};
