import { useCallback, useState } from "react";
import { resetPassword } from "./api";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useSetPassword() {
  const [apiProgress, setApiProgress] = useState(false);
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [success, setSuccess] = useState();
  const [generalError, setGeneralError] = useState()
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setSuccess();
    setErrors({});
    setGeneralError()
    try {
      const response = await resetPassword(searchParams.get("tk"), { password });
      setSuccess(response.data.message);
      navigate("/login")
    } catch (axiosError) {
      if(axiosError.response.data.status === 400) {
        setErrors(axiosError.response?.data.validationErrors);
      } else {
        setGeneralError(axiosError.response.data.message);
      }
    } finally {
      setApiProgress(false);
    }
  }, [password, searchParams]);



  return {
    apiProgress,
    onChangePassword: (event) => {
      setPassword(event.target.value),
      setErrors({})
    },
    onChangePasswordRepeat: (event) => setPasswordRepeat(event.target.value),
    onSubmit,
    success,
    errors: {
      password: errors.password,
      passwordRepeat: password !== passwordRepeat ? 'Password mismatch' : ''
    },
    generalError,
    disabled: password ? password !== passwordRepeat : true

  };
}