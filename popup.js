chrome.storage.sync.get(["shipping", "upstream", "waste"], function(result) {
    document.getElementById("shipping_label").innerText = "Shipping: " + String(result.shipping).slice(0,5);
    document.getElementById("cost_label").innerText = "Upstream: " + String(result.upstream).slice(0,5);
    document.getElementById("waste_label").innerText = "Waste: " + String(result.waste).slice(0,5);

    total = Number(result.upstream) + Number(result.shipping) + Number(result.waste);
    // document.getElementById("shipping_bar").setAttribute("style", `--size: calc(${result.shipping} / ${total} ); --color: orange`);
    document.getElementById("cost_bar").setAttribute("style", `--size: calc(${total} / ${total} ); --color: orangered`);
    document.getElementById("avg_cost_bar").setAttribute("style",`--size: calc(${15} / ${total} ); --color: olivedrab`)
    // document.getElementById("waste_bar").setAttribute("style", `--size: calc(${result.waste} / ${total} ); --color: lightcoral`);
    document.getElementById("cost_ship").setAttribute("style",`--size: calc(${result.shipping} / ${total} ); --color: orangered`)
    document.getElementById("cost_prod").setAttribute("style",`--size: calc(${result.upstream} / ${total} ); --color: orange`)
    document.getElementById("cost_waste").setAttribute("style",`--size: calc(${result.waste} / ${total} ); --color: lightcoral`)
});
