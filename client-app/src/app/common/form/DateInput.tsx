import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps
  extends FieldRenderProps<Date, HTMLElement>,
    FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  date = false,
  time = false,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* <DateTimePicker
        containerClassName={"dateTimePicker-Container"}
        onKeyDown={(e) => e.preventDefault()}
        onBlur={input.onBlur}
        // time={time}
        // timeFormat="HH:mm"
        step={15}
        // date={date}
        // format={date ? "dd.MM.yyyy" : "HH:mm"}
        onChange={input.onChange}
        value={input.value || null}
        placeholder={placeholder}
        {...rest}
        id="id"
      /> */}
      {touched && !!error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
