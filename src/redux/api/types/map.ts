import {LngLatLike} from "mmr-gl";

export interface IConstructRoutePayload {
    locations:{
        lat:number,
        lon:number
    }[]
    costing: string,
    costing_options:
        {
            auto:
                {
                    use_border_crossing: 0
                }
        },
    units: string,
    id: string
}