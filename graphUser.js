let userChart;

function showGraphUser() {

    const ctx = document.getElementById('myChartUser');

    const type = 'line';

    const data = {
        labels: graphLabelsUser,
        datasets: [{ // index 0 - eckige Klammer
            label: 'Bitoin Aktienkurs',
            data: graphValuesUser,
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

    if (userChart) { destroyChartByConst(userChart); }

    userChart = new Chart(ctx, {
        type: type,
        data: data,
        options: options
    });

}