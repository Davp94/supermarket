import { InputText } from "primereact/inputtext";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface InputControllerProps {
  name: string;
  control: Control<any>;
  rules: RegisterOptions | null;
  label?: string;
  placeholder: string;
}
export default function InputController({
    name,
    control,
    rules,
    label,
    placeholder
}: InputControllerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules ? rules : undefined}
      render={({ field, fieldState }) => (
        <>
          <InputText
            id={field.name}
            {...field}
            placeholder={placeholder}
          />
          {fieldState.error && <small>{fieldState.error.message}</small>}
        </>
      )}
    />
  );
}
