import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import PlacesAutocomplete from "react-places-autocomplete";
import { Form, Label, List, Segment } from "semantic-ui-react";
import { FieldProps } from "react-final-form";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

interface IProps extends FieldProps<string, HTMLInputElement> {
  setLatlng: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | undefined>
  >;
  Options: {};
}

export const ActivityFormPlacesAutocomplete: React.FC<IProps> = ({
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
        }}
        searchOptions={Options}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              name={name}
              onBlur={() => {
                input.onBlur();
                setdropdownIsOpen(false);
              }}
              onFocus={input.onFocus}
              onChange={(e) => {
                getInputProps().onChange(e); //trigger PlacesAutocomplete search
                input.onChange(e); //trigger validation to work
                e.currentTarget.value.length > 0
                  ? setdropdownIsOpen(true)
                  : setdropdownIsOpen(false);
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

            {loading && <Segment>Loading...</Segment>}

            {dropdownIsOpen && (
              <Segment>
                <List>
                  {suggestions.map((suggestion) => {
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
                      <List.Item key={suggestion.description}>
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span
                            onClick={() => {
                              setdropdownIsOpen(false);
                              input.onChange(suggestion.description);
                              handleSelect(suggestion.description);
                            }}
                          >
                            {suggestion.description}
                          </span>
                        </div>
                      </List.Item>
                    );
                  })}
                </List>
              </Segment>
            )}
          </div>
          // </div>
        )}
      </PlacesAutocomplete>
    </Form.Field>
  );
};

export default observer(ActivityFormPlacesAutocomplete);
