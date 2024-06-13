import React, { useEffect, useState } from "react";
import DependentCheckBoxComponent from "../../../components/DependentCheckBoxComponent";
import { Button, CardHeader, CardLabel, SubmitBar, Toast } from "@egovernments/digit-ui-react-components";

function SelectParticipant({
  config,
  setShowModal,
  modalInfo,
  setModalInfo,
  scheduleHearingParams,
  setScheduleHearingParam,
  selectedValues,
  setSelectedValues,
  handleInputChange,
  handleScheduleCase,
  t,
}) {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const isEmpty = isObjectEmpty(selectedValues);
  const onSubmitSchedule = (props) => {
    if (isEmpty) {
      console.log("submit");
      setShowErrorToast(true);
    } else setModalInfo({ ...modalInfo, page: 2 });
  };
  const closeToast = () => {
    setShowErrorToast(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, 2000);

    return () => clearTimeout(timer);
  }, [closeToast]);
  return (
    <div>
      <CardLabel>{config?.header}</CardLabel>
      <DependentCheckBoxComponent options={config} onInputChange={handleInputChange} selectedValues={selectedValues} />
      <div className="action-button-application">
        <Button
          variation="secondary"
          onButtonClick={() => setModalInfo({ ...modalInfo, page: 0 })}
          className="primary-label-btn"
          label={"Back"}
        ></Button>

        <SubmitBar
          variation="primary"
          onSubmit={(props) => {
            onSubmitSchedule(props);
          }}
          className="primary-label-btn"
          label={"Schedule"}
        ></SubmitBar>
      </div>
      {showErrorToast && <Toast error={true} label={t("ES_COMMON_PLEASE_ENTER_ALL_MANDATORY_FIELDS")} isDleteBtn={true} onClose={closeToast} />}
    </div>
  );
}

export default SelectParticipant;
