var ctx = document.getElementById('stats').getContext('2d')


export function createRadarChart(stats){

    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
              'HP',
              'Attack',
              'Defense',
              ['Special', 'Attack'],
              ['Special', 'Defense'],
              'Speed'
            ],
            datasets: [{
            //   label: 'My First Dataset',
              data: stats,
              fill: true,
            //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //   borderColor: 'rgb(255, 99, 132)',
            //   pointBackgroundColor: 'rgb(255, 99, 132)',
            //   pointBorderColor: '#fff',
            //   pointHoverBackgroundColor: '#fff',
            //   pointHoverBorderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 138, 101, 0.2)',
              borderColor: 'rgb(255, 138, 101)',
              pointBackgroundColor: 'rgb(255, 138, 101)',
              pointBorderColor: 'rgb(255, 138, 101)',
              pointHoverBackgroundColor: 'rgb(255, 138, 101)',
              pointHoverBorderColor: 'rgb(255, 138, 101)',
            }]
          },
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 1
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'white'
                    },
                    pointLabels: {
                        color: 'white',
                        font: {
                            family: 'Space Mono',
                            size: 12
                        }
                    },
                    grid: {
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        backdropColor: 'black',
                        maxTicksLimit: 6,
                        font: {
                            family: 'Roboto',
                            size: 10
                        }
                    },

                }
              }
        }
      });

    return chart
}