import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps extends FieldRenderProps<string, HTMLElement> {
  style?: React.CSSProperties | undefined;
}

const TextInput: React.FC<IProps> = ({
  disabled,
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
  style,
}) => {
  return (
    <Form.Field error={touched && !!error} {...{ disabled, width, type }}>
      <input {...input} {...{ placeholder, style }}></input>
      {touched && !!error && (
        <Label basic color="red" data-cy="error-label">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(TextInput);
