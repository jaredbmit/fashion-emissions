const axios = require('axios').default;
const AUTH_KEY = `Bearer ${process.env.AUTH_KEY}`;

getCarbon = async (price,currency) => {
    // const location = window.location.hostname;
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

getResponse = async (payload,auth) => {
    var data;
    return axios({
        method: 'post',
        url: 'https://beta3.api.climatiq.io/estimate',
        data: JSON.stringify(payload),
        headers: {Authorization: auth} })
        

}

calcCo2 = (data) => {
    console.log(data)
}
let data;
let resp = getCarbon(120,'eur');
// resp.then(function(result){data = result.data;console.log(data)});
resp.then(function(result){data = result; calcCo2(data.data)});