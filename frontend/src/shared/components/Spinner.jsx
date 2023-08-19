export function Spinner(props) {
  const { sm } = props;
  return (
    <span
      className={`spinner-border ${sm ? "spinner-border-sm" : ""}`}
      aria-hidden="true"
    ></span>
  );
}
