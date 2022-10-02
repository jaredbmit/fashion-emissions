/*
* HackMIT 2022 Fashion Carbon Calculator
* @authors: Sami Amer, Jared Boyer
*
* Scrapes the current page for item price data
* Compiles relevant site data to assemble full properties of the order
* Sends cart message to background.js
*/

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
            assembleMessage(newValue);
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

function assembleMessage(cart) {

    console.log("Assemble Message")
    console.log(cart)

}