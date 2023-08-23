import { Input } from "@/shared/components/Input";
import { useSetPassword } from "./useSetPassword";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";

export function SetPassword() {
  const {apiProgress, errors, generalError, onChangePassword, onChangePasswordRepeat, onSubmit, success, disabled} = useSetPassword();
  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="card-header text-center">
            <span className="fs-3">Set your password</span>
          </div>
          <div className="card-body">
            <Input
              id="password"
              label="Password"
              error={errors.password}
              type="password"
              onChange={onChangePassword}
            />
            <Input
              id="passwordRepeat"
              label="Password Repeat"
              error={errors.passwordRepeat}
              type="password"
              onChange={onChangePasswordRepeat}
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
                disabled={disabled}
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