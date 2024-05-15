import React, { useMemo, useState } from "react";
import { LabelFieldPair, CardLabel, TextInput, CardLabelError } from "@egovernments/digit-ui-react-components";
import LocationSearch from "./LocationSearch";
import Axios from "axios";
const getLocation = (places, code) => {
  let location = null;
  location = places?.address_components?.find((place) => {
    return place.types.includes(code);
  })?.long_name;
  return location ? location : null;
};
const AddressComponent = ({ t, config, onSelect, formData = {}, errors }) => {
  const inputs = useMemo(
    () =>
      config?.populators?.inputs || [
        {
          label: "CS_PIN_LOCATION",
          type: "LocationSearch",
          name: [],
        },
      ],
    [config?.populators?.inputs]
  );
  const [coordinateData, setCoordinateData] = useState({ callback: () => {} });

  const getLatLngByPincode = async (pincode) => {
    const response = await Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=AIzaSyAASfCFja6YxwDzEAzhHFc8B-17TNTCV0g`
    );
    return response;
  };
  function setValue(value, input) {
    if (input === "pincode") {
      getLatLngByPincode(value)
        .then((res) => {
          if (
            (res.data.results && res.data.results?.length === 0) ||
            (res.data.status === "OK" && getLocation(res.data.results[0], "country") !== "India")
          ) {
            onSelect(config.key, {
              ...formData[config.key],
              ...["state", "district", "city", "locality", "coordinates", "pincode"].reduce((res, curr) => {
                res[curr] = "";
                if (curr === "pincode") {
                  res[curr] = value;
                }
                return res;
              }, {}),
            });
          } else {
            const [location] = res.data.results;
            onSelect(config.key, {
              ...formData[config.key],
              [input]: value,
              state: getLocation(location, "administrative_area_level_1") || "",
              district: getLocation(location, "administrative_area_level_3") || "",
              city: getLocation(location, "locality") || "",
              locality: (() => {
                const plusCode = getLocation(location, "plus_code");
                const neighborhood = getLocation(location, "neighborhood");
                const sublocality_level_1 = getLocation(location, "sublocality_level_1");
                const sublocality_level_2 = getLocation(location, "sublocality_level_2");
                return [plusCode, neighborhood, sublocality_level_1, sublocality_level_2]
                  .reduce((result, current) => {
                    if (current) {
                      result.push(current);
                    }
                    return result;
                  }, [])
                  .join(", ");
              })(),
              coordinates: { latitude: location.geometry.location.lat, longitude: location.geometry.location.lng },
            });
            coordinateData.callback({ lat: location.geometry.location.lat, lng: location.geometry.location.lng });
          }
        })
        .catch(() => {
          onSelect(config.key, {
            ...formData[config.key],
            ...["state", "district", "city", "locality", "coordinates", "pincode"].reduce((res, curr) => {
              res[curr] = "";
              if (curr === "pincode") {
                res[curr] = value;
              }
              return res;
            }, {}),
          });
        });
      return;
    }
    if (Array.isArray(input)) {
      onSelect(config.key, {
        ...formData[config.key],
        ...input.reduce((res, curr) => {
          res[curr] = value[curr];
          return res;
        }, {}),
      });
    } else onSelect(config.key, { ...formData[config.key], [input]: value });
  }

  return (
    <div>
      {inputs?.map((input, index) => {
        let currentValue = (formData && formData[config.key] && formData[config.key][input.name]) || "";
        let isFirstRender = true;

        return (
          <React.Fragment key={index}>
            {errors[input.name] && <CardLabelError>{t(input.error)}</CardLabelError>}
            <div>
              <div className="field" style={{ width: "100%" }}>
                {input?.type === "LocationSearch" ? (
                  <LocationSearch
                    locationStyle={{ maxWidth: "540px" }}
                    position={formData?.[config.key]?.coordinates || {}}
                    setCoordinateData={setCoordinateData}
                    onChange={(pincode, location, coordinates = {}) => {
                      console.log(location);
                      setValue(
                        {
                          pincode: formData && isFirstRender && formData[config.key] ? formData[config.key]["pincode"] : pincode || "",
                          state:
                            formData && isFirstRender && formData[config.key]
                              ? formData[config.key]["state"]
                              : getLocation(location, "administrative_area_level_1") || "",
                          district:
                            formData && isFirstRender && formData[config.key]
                              ? formData[config.key]["district"]
                              : getLocation(location, "administrative_area_level_3") || "",
                          city:
                            formData && isFirstRender && formData[config.key]
                              ? formData[config.key]["city"]
                              : getLocation(location, "locality") || "",
                          locality:
                            isFirstRender && formData[config.key]
                              ? formData[config.key]["locality"]
                              : (() => {
                                  const plusCode = getLocation(location, "plus_code");
                                  const neighborhood = getLocation(location, "neighborhood");
                                  const sublocality_level_1 = getLocation(location, "sublocality_level_1");
                                  const sublocality_level_2 = getLocation(location, "sublocality_level_2");
                                  return [plusCode, neighborhood, sublocality_level_1, sublocality_level_2]
                                    .reduce((result, current) => {
                                      if (current) {
                                        result.push(current);
                                      }
                                      return result;
                                    }, [])
                                    .join(", ");
                                })(),
                          coordinates,
                        },
                        input.name
                      );
                      isFirstRender = false;
                    }}
                  />
                ) : (
                  <div style={{ diplay: "flex" }}>
                    <div style={{ cursor: "pointer", width: "50%", flex: "1" }}>
                      <CardLabel className="card-label-smaller">
                        {t(input.label)}
                        {/* {input.isMandatory ? <span style={{ color: "#FF0000" }}>{" * "}</span> : null} */}
                      </CardLabel>
                      <TextInput
                        className="field desktop-w-full"
                        key={input.name}
                        value={formData && formData[config.key] ? formData[config.key][input.name] : undefined}
                        onChange={(e) => {
                          setValue(e.target.value, input.name);
                        }}
                        disable={input.isDisabled}
                        defaultValue={undefined}
                        {...input.validation}
                      />
                    </div>
                  </div>
                )}
                {currentValue &&
                  currentValue.length > 0 &&
                  input.validation &&
                  !currentValue.match(Digit.Utils.getPattern(input.validation.patternType) || input.validation.pattern) && (
                    <CardLabelError style={{ width: "100%", marginTop: "-15px", fontSize: "16px", marginBottom: "12px", color: "#FF0000" }}>
                      <span style={{ color: "#FF0000" }}> {t(input.validation?.errMsg || "CORE_COMMON_INVALID")}</span>
                    </CardLabelError>
                  )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AddressComponent;
