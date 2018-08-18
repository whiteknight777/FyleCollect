export const planetChartData = {
    type: 'line',
    data: {
        labels: ['Bureau 1', 'Bureau 2', 'Bureau 3', 'Bureau 4', 'Bureau 5', 'Bureau 6', 'Bureau 7', 'Bureau 8'],
        datasets: [{ // one line graph
                label: 'Candidat 1',
                data: [0, 0, 1, 2, 67, 62, 27, 14],
                backgroundColor: [
                    'rgba(54,73,93,.5)', // Blue
                ],
                borderColor: [
                    '#36495d',
                ],
                borderWidth: 3
            },
            { // another line graph
                label: 'Candidat 2',
                data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
                backgroundColor: [
                    'rgba(71, 183,132,.5)', // Green
                ],
                borderColor: [
                    '#47b784',
                ],
                borderWidth: 3
            }, { // another line graph
                label: 'Candidat 3',
                data: [2.8, 10.1, 5.7, 20.7, 16.8, 109.4, 20.7, 49.2],
                backgroundColor: [
                    'rgba(255, 82, 82, 0.54)', // Green
                ],
                borderColor: [
                    '#77b784',
                ],
                borderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 26,
                }
            }]
        }
    }
}

export default planetChartData;