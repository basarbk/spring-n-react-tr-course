import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { useAuthDispatch, useAuthState } from "@/shared/state/context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateUser } from "./api";
import { Alert } from "@/shared/components/Alert";
import { ProfileImage } from "@/shared/components/ProfileImage";

export function ProfileCard({ user }) {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();
  const [newUsername, setNewUsername] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
    setErrors({})
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username)
  }

  const onClickSave = async () => {
    setApiProgress(true);
    setErrors({})
    setGeneralError();
    try {
      await updateUser(user.id, { username: newUsername });
      dispatch({type: 'user-update-success', data: { username: newUsername}})
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

  const isEditButtonVisible = !editMode && authState.id === user.id;

  const visibleUsername = authState.id === user.id ? authState.username : user.username;

  return (
    <div className="card">
      <div className="card-header text-center">
        <ProfileImage width={200} />
      </div>
      <div className="card-body text-center">
        {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
        {isEditButtonVisible && (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
        {editMode && (
          <>
            <Input
              label={t("username")}
              defaultValue={visibleUsername}
              onChange={onChangeUsername}
              error={errors.username}
            />
            {generalError && <Alert styleType="danger">{generalError}</Alert>}
            <Button apiProgress={apiProgress} onClick={onClickSave}>
              Save
            </Button>
            <div className="d-inline m-1"></div>
            <Button
              styleType="outline-secondary"
              onClick={onClickCancel}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
