console.log("Hello")
import {getCarbonAirFreight, getCarbonClothes, getCarbonRoadFreight, getCarbonSeaFreight} from './query.mjs'
// Receive scraped data from cart
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if (msg.type === "cart") {
            assembleParams(msg.data);
            //sender.tab;
        }
    }
);

function returnData(data) {
  var out = data.json().then(function(res){out = res.co2e;console.log(out)}, (error)=>{error})
  return out
}
// Put together full stack of data to be queried
function assembleParams(data) {
    console.log("Data received")
    var price = 100 
    var currency = 'usd' 
    var distance = 5000 
    var weight = 19

    let co_clothes = getCarbonClothes(price,currency).then(function(result){co_clothes=result,returnData(co_clothes)},(error)=>{error});
    let co_seafreight = getCarbonSeaFreight(weight, distance).then(function(result){co_seafreight=result;returnData(co_seafreight)},(error)=>{error});
    let co_airfreight = getCarbonAirFreight(weight, distance).then(function(result){co_airfreight=result;returnData(co_airfreight)}, (error) => {error})
    let co_roadfreight = getCarbonRoadFreight(weight, distance).then(function(result){co_roadfreight=result;returnData(co_roadfreight)}, (error) => {error})
}