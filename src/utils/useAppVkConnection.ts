import {useEffect} from "react";
import bridge from "@vkontakte/vk-bridge";

export const useAppVkConnection = () => {

    useEffect(() => {
        bridge.send('VKWebAppInit')
            .then((data) => {
                if (data.result) {
                    console.log('App successfully powered')
                } else {
                    console.log('Some mistake occured')
                }
            })
            .catch((error) => {
                console.log(error,'dad');
            });
    },[])

}