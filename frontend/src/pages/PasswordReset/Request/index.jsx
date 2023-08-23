import { Input } from "@/shared/components/Input";
import { usePasswordResetRequest } from "./usePasswordResetRequest";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";

export function PasswordResetRequest() {
  const {onSubmit, onChangeEmail, apiProgress, success, error, generalError} = usePasswordResetRequest();
  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="card-header text-center">
            <span className="fs-3">Reset your password</span>
          </div>
          <div className="card-body">
            <Input
              id="email"
              label="E-mail"
              error={error}
              onChange={onChangeEmail}
            />
            {success && (
              <Alert>{success}</Alert>
            )}
            {generalError && (
              <Alert styleType="danger">{generalError}</Alert>
            )}
            <div className="text-center">
              <Button
                apiProgress={apiProgress}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}