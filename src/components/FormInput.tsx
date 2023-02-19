import { useState } from "react";

type InputProps = {
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  inputAdornment: boolean;
};
const FormInput = ({
  label,
  type,
  onChange,
  value,
  name,
  inputAdornment = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form_input">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        autoComplete="off"
      />
      {inputAdornment ? (
        <div
          className="show_password"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16.83C9.60998 16.83 7.66998 14.89 7.66998 12.5C7.66998 10.11 9.60998 8.17 12 8.17C14.39 8.17 16.33 10.11 16.33 12.5C16.33 14.89 14.39 16.83 12 16.83ZM12 9.67C10.44 9.67 9.16998 10.94 9.16998 12.5C9.16998 14.06 10.44 15.33 12 15.33C13.56 15.33 14.83 14.06 14.83 12.5C14.83 10.94 13.56 9.67 12 9.67Z"
              fill="#A6A6A6"
            />
            <path
              d="M12 21.52C8.24002 21.52 4.69002 19.32 2.25002 15.5C1.19002 13.85 1.19002 11.16 2.25002 9.5C4.70002 5.68 8.25002 3.48 12 3.48C15.75 3.48 19.3 5.68 21.74 9.5C22.8 11.15 22.8 13.84 21.74 15.5C19.3 19.32 15.75 21.52 12 21.52ZM12 4.98C8.77002 4.98 5.68002 6.92 3.52002 10.31C2.77002 11.48 2.77002 13.52 3.52002 14.69C5.68002 18.08 8.77002 20.02 12 20.02C15.23 20.02 18.32 18.08 20.48 14.69C21.23 13.52 21.23 11.48 20.48 10.31C18.32 6.92 15.23 4.98 12 4.98Z"
              fill="#A6A6A6"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
