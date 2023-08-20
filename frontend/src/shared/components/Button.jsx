import { Spinner } from "./Spinner";

export function Button({
  apiProgress,
  disabled,
  children,
  onClick,
  styleType = "primary",
  type
}) {
  return (
    <button
      className={`btn btn-${styleType}`}
      disabled={apiProgress || disabled}
      onClick={onClick}
      type={type}
    >
      {apiProgress && <Spinner sm={true} />}
      {children}
    </button>
  );
}
