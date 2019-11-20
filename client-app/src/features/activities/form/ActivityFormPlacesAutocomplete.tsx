import React, {
  SetStateAction,
  Dispatch,
  useState,
  useContext,
  Component
} from 'react';
import { observer } from 'mobx-react-lite';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  FormFieldProps,
  Form,
  Label,
  InputProps,
  Input
} from 'semantic-ui-react';
import {
  FieldRenderProps,
  FieldInputProps,
  FieldMetaState,
  FieldProps
} from 'react-final-form';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FieldProps<string, HTMLInputElement> {
  address: string;
  setaddress: Dispatch<SetStateAction<string>>;
  handleSelect: (address: string) => void;
  Options: {};
}

export const ActivityFormPlacesAutocomplete: React.FC<IProps> = ({
  address,
  setaddress,
  handleSelect,
  Options,
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
  name
}) => {
  const rootStore = useContext(RootStoreContext);
  const { disableUpdateForm } = rootStore.profileStore;

  const FieldProps = {
    placeholder: placeholder,
    className: 'location-search-input'
  };

  return (
    <Form.Field disabled={disableUpdateForm} error={touched && !!error}>
      <PlacesAutocomplete

        value={address}
        onChange={value => {
          setaddress(value);
        }}
        onSelect={handleSelect}
        searchOptions={Options}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              name={name}
              {...input}
              onChange={e => {
                getInputProps().onChange(e);
                input.onChange(e);
                console.log();
                setaddress(e.currentTarget.value);
              }}
              // onClick={e => {
              //   setaddress(e.currentTarget.value);
              //   input.value = e.currentTarget.value;
              // }}
              value={address}
              placeholder={getInputProps(FieldProps).placeholder}
              className={getInputProps(FieldProps).className}
            ></input>
            {touched && !!error && (
              <Label basic color='red'>
                {error}
              </Label>
            )}

            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                //inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span >{suggestion.description}</span>
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

{
  /* <input {...input} placeholder={placeholder}></input>
      {touched && !!error && (
        <Label basic color='red'></Label>
          {error}
        </Label>
      )} */
}

export default observer(ActivityFormPlacesAutocomplete);
