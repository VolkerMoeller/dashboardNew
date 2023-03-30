let sevenDayChart;

function showGraph() {
    const ctx = document.getElementById('myChart');

    const type = 'line';

    const data = {
        labels: graphLabels,
        datasets: [{
            label: 'Bitoin Aktienkurs',
            data: graphValues,
            borderWidth: 1
        }]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    if (sevenDayChart) {
        destroyChartByConst(sevenDayChart);
    }

    sevenDayChart = new Chart(ctx, {
        type: type,
        data: data,
        options: options
    });
}