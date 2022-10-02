console.log("Hello")

// Receive scraped data from cart
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if (msg.type === "cart") {
            assembleParams(msg.data);
            //sender.tab;
        }
    }
);

// Put together full stack of data to be queried
function assembleParams(data) {
    console.log("Data received")
}