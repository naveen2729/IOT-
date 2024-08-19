const tempGaugeCtx = document.getElementById('tempGauge').getContext('2d');
const humidityGaugeCtx = document.getElementById('humidityGauge').getContext('2d');
const graphCtx = document.getElementById('tempHumidityGraph').getContext('2d');

let tempGauge = new Chart(tempGaugeCtx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#FF6384', '#DDDDDD'],
            borderWidth: 1
        }]
    },
    options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 70,
        responsive: true
    }
});

let humidityGauge = new Chart(humidityGaugeCtx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#36A2EB', '#DDDDDD'],
            borderWidth: 1
        }]
    },
    options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 70,
        responsive: true
    }
});

let tempHumidityGraph = new Chart(graphCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: '#FF6384',
            fill: false,
        }, {
            label: 'Humidity (%)',
            data: [],
            borderColor: '#36A2EB',
            fill: false,
        }]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    }
});

function updateGauges(temp, humidity) {
    tempGauge.data.datasets[0].data[0] = temp;
    tempGauge.update();

    humidityGauge.data.datasets[0].data[0] = humidity;
    humidityGauge.update();
}

function updateGraph(temp, humidity) {
    const now = new Date().toLocaleTimeString();
    tempHumidityGraph.data.labels.push(now);
    tempHumidityGraph.data.datasets[0].data.push(temp);
    tempHumidityGraph.data.datasets[1].data.push(humidity);
    tempHumidityGraph.update();
}

async function fetchData() {
    const tempResponse = await fetch('/temperature');
    const temp = await tempResponse.text();

    const humidityResponse = await fetch('/humidity');
    const humidity = await humidityResponse.text();

    updateGauges(temp, humidity);
    updateGraph(temp, humidity);
}

setInterval(fetchData, 2000);
