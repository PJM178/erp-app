import errorMessageStyles from "./UiNotifications.module.css";

type MessageColor = "error" | "warning" | "success";

interface ErrorMessageProps {
  color: MessageColor;
  children: React.ReactNode;
  enabled: boolean;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  if (!props.enabled) return null;
  
  const messageColor = {
    error: "error-message--color-error",
    warning: "error-message--color-error",
    success: "error-message--color-error",
  };

  return (
    <div className={`${errorMessageStyles["error-message--container"]} ${errorMessageStyles[messageColor[props.color]]}`.trim()}>
      <span className={`material-symbol--container material-symbols-outlined`.trim()}>
        error
      </span>
      <span>
        {props.children}
      </span>
    </div>
  )
};