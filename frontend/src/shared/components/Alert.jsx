export function Alert(props) {
  const { children, styleType, center } = props;
  return (
    <div className={`alert alert-${styleType || "success"} ${center ? 'text-center' : ''}`}>{children}</div>
  );
}
