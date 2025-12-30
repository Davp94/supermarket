import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { Dropdown, type DropdownProps } from "primereact/dropdown"
import { classNames } from "primereact/utils"

interface ControlledDropdownProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  options: Array<{ label: string; value: any }>
  placeholder?: string
  optionLabel?: string
  optionValue?: string
  disabled?: boolean
  required?: boolean
  filter?: boolean
  showClear?: boolean
  className?: string
  dropdownProps?: Omit<DropdownProps, "value" | "onChange" | "options">
}

export function DropdownController<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Selecciona una opción",
  optionLabel = "label",
  optionValue = "value",
  disabled = false,
  required = false,
  filter = false,
  showClear = true,
  className,
  dropdownProps,
}: ControlledDropdownProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={classNames("flex flex-col gap-2", className)}>
          {label && (
            <label
              htmlFor={field.name}
              className={classNames("font-medium text-sm", {
                "text-destructive": fieldState.error,
              })}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}

          <Dropdown
            id={field.name}
            value={field.value}
            onChange={(e) => field.onChange(e.value)}
            options={options}
            optionLabel={optionLabel}
            optionValue={optionValue}
            placeholder={placeholder}
            disabled={disabled}
            filter={filter}
            showClear={showClear}
            className={classNames("w-full", {
              "p-invalid": fieldState.error,
            })}
            {...dropdownProps}
          />

          {fieldState.error && <small className="text-destructive text-sm">{fieldState.error.message}</small>}
        </div>
      )}
    />
  )
}
