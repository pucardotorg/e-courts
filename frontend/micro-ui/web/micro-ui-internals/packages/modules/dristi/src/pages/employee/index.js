import { BackButton, HelpOutlineIcon, PrivateRoute, Toast } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CaseFileAdmission from "./admission/CaseFileAdmission";
import Home from "./home";
import { useToast } from "../../components/Toast/useToast";
import ApplicationDetails from "./ApplicationDetails";
import ViewCaseFile from "./scrutiny/ViewCaseFile";
import JudgeScreen from "./Judge/JudgeScreen";

const EmployeeApp = ({ path, url, userType, tenants, parentRoute }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { toastMessage, toastType, closeToast } = useToast();
  const Inbox = window?.Digit?.ComponentRegistryService?.getComponent("Inbox");
  const hideHomeCrumb = [`${path}/cases`];
  const employeeCrumbs = [
    {
      path: `/digit-ui/employee`,
      content: t("ES_COMMON_HOME"),
      show: !hideHomeCrumb.includes(location.pathname),
      isLast: false,
    },
    {
      path: `${path}/registration-requests`,
      content: t("ES_REGISTRATION_REQUESTS"),
      show: location.pathname.includes("/registration-requests"),
      isLast: !location.pathname.includes("/details"),
    },
    {
      path: ``,
      content: t("ES_APPLICATION_DETAILS"),
      show: location.pathname.includes("/registration-requests/details"),
      isLast: true,
    },
  ];
  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container">
          {!location.pathname.endsWith("/registration-requests") && (
            <div className="back-button-home">
              <BackButton />

              {/* <Breadcrumb crumbs={employeeCrumbs} breadcrumbStyle={{ paddingLeft: 20 }}></Breadcrumb> */}
              <span style={{ display: "flex", justifyContent: "right", gap: "5px" }}>
                <span style={{ color: "#f47738" }}>Help</span>
                <HelpOutlineIcon />
              </span>
            </div>
          )}
          <PrivateRoute exact path={`${path}/registration-requests`} component={Inbox} />
          <PrivateRoute exact path={`${path}/registration-requests/details`} component={(props) => <ApplicationDetails {...props} />} />
          <div className={location.pathname.endsWith("employee/dristi/cases") ? "file-case-main" : ""}>
            <PrivateRoute exact path={`${path}/cases`} component={Home} />
          </div>
          <div className={"file-case-main"}>
            <PrivateRoute exact path={`${path}/admission/info`} component={(props) => <CaseFileAdmission {...props} t={t} path={path} />} />
            <PrivateRoute exact path={`${path}/case`} component={(props) => <ViewCaseFile {...props} t={t} />} />
            <PrivateRoute exact path={`${path}/admission`} component={(props) => <JudgeScreen {...props} t={t} path={path} />} />
          </div>
        </div>
        {toastMessage && (
          <Toast
            style={{ right: 24, left: "unset" }}
            label={toastMessage}
            onClose={closeToast}
            {...(toastType !== "success" && { [toastType]: true })}
          />
        )}
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;
