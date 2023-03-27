// Der Graph wird mit dem Aufruf einer Funktion definiert!
function showGraphUser() {

    const ctx = document.getElementById('myChartUser');

    const type = 'line';

    const data = {
        labels: graphLabelsUser,
        datasets: [{
            label: 'Bitoin Aktienkurs',
            data: graphValuesUser,
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    new Chart(ctx, {
        type: type,
        data: data,
        options: options
    });

}