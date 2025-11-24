interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType: "outlined" | "something-else";
}

export const InputField = (props: InputFieldProps) => {
  const { inputType, ...rest } = props;

  return (
    <input
      {...rest}
    />
  )
};