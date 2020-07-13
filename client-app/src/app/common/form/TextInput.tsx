import React, { useContext } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  const rootStore = useContext(RootStoreContext);
  const { disableUpdateForm } = rootStore.profileStore;

  return (
    <Form.Field disabled={disableUpdateForm} error={touched && !!error} type={type} width={width}>
      <input {...input} placeholder={placeholder}></input>
      {touched && !!error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
    </Form.Field>
  );
};

export default observer(TextInput);
