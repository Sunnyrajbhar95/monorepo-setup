import { forwardRef, useState, useId } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  labelClassName?: string;
  error?: string;
  errorClassName?: string;
  helperText?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      labelClassName = "",
      error,
      errorClassName = "",
      helperText,
      startIcon,
      endIcon,
      showPasswordToggle = false,
      containerClassName = "",
      className = "",
      type = "text",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordType = type === "password" || showPasswordToggle;
    const computedType = isPasswordType
      ? isPasswordVisible
        ? "text"
        : "password"
      : type;

    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-xs font-medium uppercase tracking-wider text-slate-300 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={computedType}
            className={`w-full rounded-xl border border-slate-800 bg-slate-950/70 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500/70 focus:bg-slate-950 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 ${
              startIcon ? "pl-10" : "pl-3.5"
            } ${
              endIcon || isPasswordType ? "pr-11" : "pr-4"
            } ${
              error
                ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
                : ""
            } ${className}`}
            {...props}
          />

          {isPasswordType ? (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {isPasswordVisible ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.75"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.75"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          ) : endIcon ? (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500">
              {endIcon}
            </span>
          ) : null}
        </div>

        {error && (
          <p className={`text-xs text-rose-400 ${errorClassName}`}>{error}</p>
        )}

        {!error && helperText && (
          <p className="text-xs text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
