/*
* HackMIT 2022 Fashion Carbon Calculator
* @authors: Sami Amer, Jared Boyer
*
* Scrapes the current page for item price data
* Compiles relevant site data to assemble full properties of the order
* Sends cart message to background.js
*/

import {getCarbonAirFreight, getCarbonClothes, getCarbonRoadFreight, getCarbonSeaFreight} from './query.mjs'
console.log("Start")

// Get notification when we're in a cart webpage
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if (msg.type === "tab") {
            chrome.storage.sync.set({"site": msg.site, "display": 1});
            scrapeCart(sender.tab.id);
        } 
    }
);

// When stored cart data changes -- after page scraping
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === "cart") {
            assembleParams(newValue);
        }
    }
});

// ---- Helper functions ---- //

function scrapeCart(id) {

    console.log("Scrape cart")

    // Get keyword from storage sync data
    var keyword = "asd";

    function getSourceCode(keyword) {
        var htmlCode = document.documentElement.outerHTML;
        return htmlCode.search("cartlists:");
    }

    chrome.scripting.executeScript({
        target: {tabId: id},
        func: getSourceCode,
        args: [keyword],
    },
    (cart_items) => {
        chrome.storage.sync.set({"cart": cart_items});
    });
}

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