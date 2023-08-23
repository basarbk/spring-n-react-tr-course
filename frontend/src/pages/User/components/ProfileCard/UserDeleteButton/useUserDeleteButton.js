import { useAuthDispatch, useAuthState } from "@/shared/state/context"
import { deleteUser } from "./api"
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUserDeleteButton(){
    const [apiProgress, setApiProgress] = useState(false);
    const { id } = useAuthState();
    const dispatch = useAuthDispatch()
    const navigate = useNavigate();

    const onClick = useCallback(async () => {
        const result = confirm("Are you sure?")
        if(result) {
            setApiProgress(true);
            try {
                await deleteUser(id)
                dispatch({type: 'logout-success'});
                navigate("/")
            } catch {
    
            } finally {
                setApiProgress(false);
            }
        }
    }, [id])

    return {
        apiProgress, onClick
    }
}