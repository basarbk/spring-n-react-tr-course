import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "./api";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";

export function Activation() {
  const { token } = useParams();
  const [apiProgress, setApiProgress] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function activate() {
      setApiProgress(true);
      try {
        const response = await activateUser(token);
        setSuccessMessage(response.data.message);
      } catch (axiosError) {
        setErrorMessage(axiosError.response.data.message);
      } finally {
        setApiProgress(false);
      }
    }

    activate();
  }, []);

  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
            <Spinner />
        </Alert>
      )}
      {successMessage && (
        <Alert>{successMessage}</Alert>
      )}
      {errorMessage && <Alert styleType="danger">{errorMessage}</Alert>}
    </>
  );
}
