/*
* HackMIT 2022 Fashion Carbon Calculator
* @authors: Sami Amer, Jared Boyer
*
* Scrapes the current page for item price data
* Compiles relevant site data to assemble full properties of the order
* Sends cart message to background.js
*/

import {getCarbonAirFreight, getCarbonClothes, getCarbonRoadFreight, getCarbonSeaFreight, getCarbonWaste} from './query.mjs'
//import parameters from './parameters.json' assert {type: 'json'};
var parameters = {
    "GLOBAL": {
        "weight4price": 0.01,
        "boxweight": 0.25,
        "weight_units": "kg",
        "currency_units": "usd"
    },
    "SHEIN": {
        "distance": 11646,
        "mode": "air",
        "keyword_element": "gbCartSsrData",
        "keyword_price": '"totalPrice":{"amount":"'
    }
}

console.log("Start")

// Get notification when we're in a cart webpage
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if (msg.type === "tab") {
            chrome.storage.sync.set({"site": msg.site});
            scrapeCart(sender.tab.id);
        } 
    }
);

// ---- Helper functions ---- //

function scrapeCart(id) {

    console.log("Scrape cart")

    // Get keyword from storage sync data
    chrome.storage.sync.get(["site"], function(result) {
        console.log('Value currently is ' + result.site);
        var keyword_element = parameters[result.site]["keyword_element"];
        var keyword_price = parameters[result.site]["keyword_price"];

        chrome.scripting.executeScript({
            target: {tabId: id},
            func: scrapeSourceCode,
            args: [keyword_element, keyword_price],
        },
        (price) => {
            var carbon = calculateCarbon(Number(price[0]["result"]), result.site);
        });

    });
}

function scrapeSourceCode(keyword_element, keyword_price) {

    var price;
    var script_elements = document.getElementsByTagName("script");
    for (script of script_elements) {
        if (script.outerHTML.search(keyword_element) != -1) {
            price_start_idx = script.outerHTML.search(keyword_price) + keyword_price.length;
            cart = script.outerHTML.slice(price_start_idx, price_start_idx + 15);
            price_stop_idx = price_start_idx + script.outerHTML.slice(price_start_idx, price_start_idx+7).indexOf('"');
            price = script.outerHTML.slice(price_start_idx, price_stop_idx);
        }
    }
    return price;
}

function UpstreamData(data) {
    var out = data.json().then(function(res) {
        out = res.co2e;
        console.log("Upstream: ", out);
        chrome.storage.sync.set({"upstream": out});
    }, 
    (error)=>{error});
    return out
}

function ShippingData(data) {
    var out = data.json().then(function(res) {
        out = res.co2e;
        console.log("Shipping: ", out);
        chrome.storage.sync.set({"shipping": out});
    }, 
    (error)=>{error});
    return out
}

function WasteData(data) {
    var out = data.json().then(function(res) {
        out = res.co2e;
        console.log("Waste: ", out);
        chrome.storage.sync.set({"waste": out});
    }, 
    (error)=>{error});
    return out
}

// Put together full stack of data to be queried
function calculateCarbon(price, site) {

    var currency = parameters["GLOBAL"]["currency_units"];
    var distance = parameters[site]["distance"];
    var weight = estimateWeight(price);

    let co_clothes = getCarbonClothes(price,currency).then(function(result){co_clothes=result,UpstreamData(co_clothes, "upstream")},(error)=>{error});
    let co_garbage = getCarbonWaste(weight).then(function(result){co_garbage=result;WasteData(co_garbage, "waste")}, (error) => {error});
    if (parameters[site]["mode"] === "sea") {
        let co_seafreight = getCarbonSeaFreight(weight, distance).then(function(result){co_seafreight=result;ShippingData(co_seafreight, "shipping")},(error)=>{error});
    } else if (parameters[site]["mode"] === "air")  {
        let co_airfreight = getCarbonAirFreight(weight, distance).then(function(result){co_airfreight=result;ShippingData(co_airfreight, "shipping")}, (error) => {error});
    } else if (parameters[site]["mode"] === "land") {
        let co_roadfreight = getCarbonRoadFreight(weight, distance).then(function(result){co_roadfreight=result;ShippingData(co_roadfreight, "shipping")}, (error) => {error});
    }
}

function estimateWeight(cost) {
    // 0.4 kg / $40 for an average pair of jeans
    // --> 1 kg for every $100 purchased
    // + 0.27 kg for average shipping box
    return cost * parameters["GLOBAL"]["weight4price"] + parameters["GLOBAL"]["boxweight"]
}