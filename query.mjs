// const axios = require('axios').default;
const AUTH_KEY = `Bearer 3EGW2VXS54487SN2JAMVY05CN8GT` 

// getCarbon = async (price,currency) => {
//     var payload = {
//         "emission_factor":{
//             "activity_id": "consumer_goods-type_clothing"
//         },
//         "parameters": {
//             "money": price,
//             "money_unit": currency
//         }
//     }
    
//     let resp = await getResponse(payload, AUTH_KEY);
//     return resp 
// }

var getResponse = async (payload,auth) => {
    // axios({
    //     method: 'post',
    //     url: 'https://beta3.api.climatiq.io/estimate',
    //     data: JSON.stringify(payload),
    //     headers: {Authorization: auth},
    //     adapter: fetchAdapter })
    
    return fetch('https://beta3.api.climatiq.io/estimate', {
        method: 'post',
        body: JSON.stringify(payload),
        headers: new Headers({
            'Authorization': auth})
        })
    
}

var calcCo2 = (data) => {
    console.log(data)
}

export async function getCarbonClothes(price, currency){

    var payload = {
        "emission_factor":{
            "activity_id": "consumer_goods-type_clothing"
        },
        "parameters": {
            "money": price,
            "money_unit": currency
        }
    }
    
    let resp = await getResponse(payload, AUTH_KEY);
    return resp 
}

export async function getCarbonSeaFreight(weight,distance){

    var payload = {
        "emission_factor":{
            "activity_id": "sea_freight-vessel_type_bulk_carrier-route_type_na-vessel_length_na-tonnage_gt_100000dwt_lt_199999dwt-fuel_source_na"
        },
        "parameters": {
            "weight": weight,
            "weight_unit": "kg",
            "distance": distance,
            "distance_unit": "km"
        }
    }

    let resp = await getResponse(payload, AUTH_KEY)
    return resp
}

export async function getCarbonAirFreight(weight,distance){

    var payload = {
        "emission_factor":{
            "activity_id": "freight_flight-route_type_domestic-distance_gt_1000km_lt_3500km-weight_gt_100t-rf_included"
        },
        "parameters": {
            "weight": weight,
            "weight_unit": "kg",
            "distance": distance,
            "distance_unit": "km"
        }
    }

    let resp = await getResponse(payload, AUTH_KEY)
    return resp
}


export async function getCarbonRoadFreight(weight,distance){

    var payload = {
        "emission_factor":{
            "activity_id": "freight_vehicle-vehicle_type-hgv_refrig-fuel_source_diesel-vehicle_weight_na-percentage_load_100"
        },
        "parameters": {
            "weight": weight,
            "weight_unit": "kg",
            "distance": distance,
            "distance_unit": "km"
        }
    }

    let resp = await getResponse(payload, AUTH_KEY)
    return resp
}
// let data;
// let resp = getCarbonClothes(120,'eur');
// // resp.then(function(result){data = result.data;console.log(data)});
// resp.then(function(result){data = result; calcCo2(data.data)});
// let resp_1 = getCarbonSeaFreight(1,4000);
// resp_1.then(function(result){data = result; calcCo2(data.data)});