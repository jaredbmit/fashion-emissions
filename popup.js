chrome.storage.sync.get(["shipping", "upstream", "waste"], function(result) {
    document.getElementById("shipping_label").innerText = "Shipping: " + String(result.shipping).slice(0,5);
    document.getElementById("cost_label").innerText = "Upstream: " + String(result.upstream).slice(0,5);
    document.getElementById("waste_label").innerText = "Waste: " + String(result.waste).slice(0,5);

    total = Number(result.upstream) + Number(result.shipping) + Number(result.waste);
    document.getElementById("shipping_bar").setAttribute("style", `--size: calc(${result.shipping} / ${total} ); --color: orange`);
    document.getElementById("cost_bar").setAttribute("style", `--size: calc(${result.upstream} / ${total} ); --color: orangered`);
    document.getElementById("waste_bar").setAttribute("style", `--size: calc(${result.waste} / ${total} ); --color: lightcoral`);
});

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
// type: "bar",
// data: {labels:["This Item", "Average Item"], datasets:[{backgroundColor:["black","green"],data:[10,15]}]},
// options: {}
// });
// var ctx = document.getElementById("chart").getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });
// myChart