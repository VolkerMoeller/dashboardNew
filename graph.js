// Der Graph wird mit dem Aufruf einer Funktion definiert!
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