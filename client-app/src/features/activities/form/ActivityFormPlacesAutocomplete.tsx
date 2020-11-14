import React, {
  SetStateAction,
  Dispatch,
  useContext,
  useState,
  useEffect,
} from "react";
import { observer } from "mobx-react-lite";
import PlacesAutocomplete from "react-places-autocomplete";
import { Form, Label } from "semantic-ui-react";
import { FieldRenderProps, FieldProps } from "react-final-form";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

interface IProps extends FieldProps<string, HTMLInputElement> {
  setaddress: Dispatch<SetStateAction<string | undefined>>;
  setLatlng: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | undefined>
  >;
  Options: {};
}

export const ActivityFormPlacesAutocomplete: React.FC<IProps> = ({
  setaddress,
  setLatlng,
  Options,
  input,
  placeholder,
  meta: { touched, error, active },
  name,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { disableUpdateForm } = rootStore.profileStore;

  const [dropdownIsOpen, setdropdownIsOpen] = useState(false);
  const [currentValue, setcurrentValue] = useState<string>(input.value);
  const FieldProps = {
    placeholder: placeholder,
    className: "location-search-input",
  };
  useEffect(() => {
    setcurrentValue(input.value);

  }, [input.value]);

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLatlng(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <Form.Field disabled={disableUpdateForm} error={touched && !!error}>
      <PlacesAutocomplete
        value={currentValue}
        onChange={(value) => {
          setcurrentValue(value);
          console.log(value);
        }}
        onSelect={(value) => {
          handleSelect(value);
        }}
        searchOptions={Options}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              name={name}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              onChange={(e) => {
                getInputProps().onChange(e);
                input.onChange(e); //for validation to work
              }}
              value={currentValue}
              placeholder={getInputProps(FieldProps).placeholder}
              className={getInputProps(FieldProps).className}
            ></input>
            {touched && !!error && (
              <Label basic color="red">
                {error}
              </Label>
            )}

            <div
              className={`autocomplete-dropdown-container ${
                dropdownIsOpen && !error && "active"
              }`}
            >
              {loading && <div>Loading...</div>}
              {active &&
                suggestions.map((suggestion) => {
                  setdropdownIsOpen(true);
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";

                  const style = suggestion.active
                    ? {
                        backgroundColor: "rgb(234, 234, 234)",
                        cursor: "pointer",
                      }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={suggestion.description}
                    >
                      <span
                        onClick={() => {
                          setaddress(suggestion.description);
                          setcurrentValue(suggestion.description);
                          setdropdownIsOpen(false);
                        }}
                      >
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </Form.Field>
  );
};

export default observer(ActivityFormPlacesAutocomplete);
