import { Button } from "@/shared/components/Button";
import { useUserDeleteButton } from "./useUserDeleteButton";

export function UserDeleteButton(){
    const {apiProgress, onClick} = useUserDeleteButton();

    return <Button styleType="danger" apiProgress={apiProgress} onClick={onClick}>Delete</Button>
}