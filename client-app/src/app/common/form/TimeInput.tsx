import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { TimeInput as TimeInputWidget } from "react-widgets";
interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const TimeInput: React.FC<IProps> = ({
  input,
  width,
  date = false,
  time = false,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <>
      <Form.Field error={touched && !!error} width={width} data-cy="timepicker">
        <TimeInputWidget
          onBlur={input.onBlur}
          onChange={input.onChange}
          // value={input.value || null}
          id="timePicker"
          readOnly={false}
        ></TimeInputWidget>

        {touched && !!error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    </>
  );
};

export default TimeInput;
