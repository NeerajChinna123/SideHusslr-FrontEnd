import { useSession } from "next-auth/react";
import { useEffect , ReactNode, Dispatch, SetStateAction } from "react";

interface propsData {
    setInterval :  Dispatch<SetStateAction<number>>
}

const RefreshTokenHandler = (props:propsData) => {
    const { data: session } = useSession();

    useEffect(() => {
        if(!!session) {
            // We did set the token to be ready to refresh after 23 hours, here we set interval of 23 hours 30 minutes.

            // this is to invoke the refresh token method, if the access token gets expired at 2 pm we need to refresh it before expiration.
            // so we decided to refresh it before 1 hour at 1 pm, in the jwt call back. so to check the time we are going to set a refetch interval which basically updates 
            // the state of the interval that will cause a rerender of the app and the condition gets checked, which will lead to the execution of the refreshAccessToken method.
           //@ts-ignore
           const timeRemaining = Math.round((((session.accessTokenExpiry - 30 * 60 * 1000) - Date.now()) / 1000));
            props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
        }
    }, [session]);

    return null;
}

export default RefreshTokenHandler;