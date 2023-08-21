import { useAuthDispatch, useAuthState } from "@/shared/state/context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateUser } from "./api";
import { Input } from "@/shared/components/Input";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";

export function UserEditForm({ setEditMode, setTempImage }) {
  const authState = useAuthState();
  const { t } = useTranslation();
  const [newUsername, setNewUsername] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();
  const [newImage, setNewImage] = useState();

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
    setErrors({});
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username);
    setNewImage();
    setTempImage();
  };

  const onSelectImage = (event) => {
    if(event.target.files.length < 1) return;
    const file = event.target.files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const data = fileReader.result
      setNewImage(data);
      setTempImage(data);
    }
    fileReader.readAsDataURL(file);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setErrors({});
    setGeneralError();
    try {
      const { data } = await updateUser(authState.id, { username: newUsername, image: newImage });
      dispatch({
        type: "user-update-success",
        data: { username: data.username, image: data.image },
      });
      setEditMode(false);
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          setErrors(axiosError.response.data.validationErrors);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        label={t("username")}
        defaultValue={authState.username}
        onChange={onChangeUsername}
        error={errors.username}
      />
      <Input
        label="Profile Image"
        type="file"
        onChange={onSelectImage}
      />
      {generalError && <Alert styleType="danger">{generalError}</Alert>}
      <Button apiProgress={apiProgress} type="submit">
        Save
      </Button>
      <div className="d-inline m-1"></div>
      <Button styleType="outline-secondary" onClick={onClickCancel} type="button">
        Cancel
      </Button>
    </form>
  );
}
