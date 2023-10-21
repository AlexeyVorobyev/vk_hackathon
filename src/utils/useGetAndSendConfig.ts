import bridge from "@vkontakte/vk-bridge";
import {useAuthLoginMutation} from "../redux/api/auth.api";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {useActions} from "../redux/hooks/useActions";
import {useEffect} from "react";

export const useGetAndSendConfig = () => {

    const user = useSelector((state:RootState) => state.user)
    const {setLogin} = useActions()
    const [authLogin] = useAuthLoginMutation()

    useEffect(() => {
        bridge.send('VKWebAppGetLaunchParams')
            .then((data) => {
                if (!data.vk_app_id) console.log('some error',data)
                setLogin(true)
                console.log(data)
                authLogin(data)
                    .then((response) => {
                        console.log(response)
                        setLogin(true)
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            })
            .catch((error) => {
                // Ошибка
                console.log(error);
            });
    },[])
}