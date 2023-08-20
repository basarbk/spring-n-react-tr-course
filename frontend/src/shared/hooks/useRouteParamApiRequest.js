import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useRouteParamApiRequest(param, httpFunction){

    const params = useParams();

    const pathParam = params[param];

    const [apiProgress, setApiProgress] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState();
  
    useEffect(() => {
      async function sendRequest() {
        setApiProgress(true);
        try {
          const response = await httpFunction(pathParam);
          setData(response.data);
        } catch (axiosError) {
          setError(axiosError.response.data.message);
        } finally {
          setApiProgress(false);
        }
      }
  
      sendRequest();
    }, [pathParam]);

    return { apiProgress, data, error };

}