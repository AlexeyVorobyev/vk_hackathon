import {useEffect} from "react";
import bridge from "@vkontakte/vk-bridge";
import {useActions} from "../redux/hooks/useActions";

export const useGetUserInfo = () => {

    const {setUserData} = useActions()

    useEffect(() => {
        bridge.send('VKWebAppGetUserInfo')
            .then((response) => {
                console.log(response)
                setUserData(response);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);
}