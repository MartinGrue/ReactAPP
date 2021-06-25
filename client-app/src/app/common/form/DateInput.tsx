import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker, FormatterOverrides } from "react-widgets";
import { Localization } from "react-widgets";
import { DateLocalizer, NumberLocalizer } from "react-widgets/IntlLocalizer";
interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

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
    <Localization
      date={new DateLocalizer({ culture: "de-de", firstOfWeek: 1 })}
    >
      <Form.Field error={touched && !!error} width={width}>
        <DateTimePicker
          // containerClassName={"dateTimePicker-Container"}
          onKeyDown={(e) => e.preventDefault()}
          onBlur={input.onBlur}
          step={15}
          onChange={input.onChange}
          value={input.value || null}
          placeholder={placeholder}
          {...rest}
          id="id"
          includeTime={true}
        />
        {touched && !!error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    </Localization>
  );
};

export default DateInput;
