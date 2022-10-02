chrome.storage.sync.get(["shipping", "upstream", "waste"], function(result) {
    avg_ship = 7.5;
    avg_cost = 23.4;
    avg_waste = 0.01;

    document.getElementById("shipping_label").innerText = "Shipping: " + String(result.shipping).slice(0,5);
    document.getElementById("cost_label").innerText = "Upstream: " + String(result.upstream).slice(0,5);
    document.getElementById("waste_label").innerText = "Waste: " + String(result.waste).slice(0,5);
    document.getElementById("avg_shipping_label").innerText = "Shipping: " + String(avg_ship);
    document.getElementById("avg_cost_label").innerText = "Upstream: " + String(avg_cost);
    document.getElementById("avg_waste_label").innerText = "Waste: " + String(avg_waste);

    total = Number(result.upstream) + Number(result.shipping) + Number(result.waste);
    document.getElementById("shipping_bar").setAttribute("style", `--size: calc(${result.shipping} / ${total} ); --color: orange`);
    document.getElementById("cost_bar").setAttribute("style", `--size: calc(${result.upstream} / ${total} ); --color: orangered`);
    document.getElementById("waste_bar").setAttribute("style", `--size: calc(${result.waste} / ${total} ); --color: lightcoral`);
    document.getElementById("avg_shipping_bar").setAttribute("style", `--size: calc(${7.5} / ${total} ); --color: green`);
    document.getElementById("avg_cost_bar").setAttribute("style", `--size: calc(${23.4} / ${total} ); --color: olivedrab`);
    document.getElementById("avg_waste_bar").setAttribute("style", `--size: calc(${0.01} / ${total} ); --color: palegreen`);
});