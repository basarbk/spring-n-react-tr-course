import { Spinner } from "./Spinner";

export function Button({apiProgress, disabled, children}) {
  return (
    <button
      className="btn btn-primary"
      disabled={apiProgress || disabled}
    >
      {apiProgress && <Spinner sm={true} />}
      {children}
    </button>
  );
}
