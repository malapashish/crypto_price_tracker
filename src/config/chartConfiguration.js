export const chartOptions = {
        responsive: true,
        title: { text: "Market Trends Chart", display: true },
        scales: {
            y: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    callback : function(label , index , labels) {
                         if(label > 999 && label < 1000000){
                        return `₹${(label/1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million 
                        }else if(label > 1000000 && label < 1000000000){
                            return `₹${(label/1000000).toFixed(1)}M`; // convert to M for number from > 1 million 
                        }else if(label > 1000000000){
                            return `₹${(label/1000000000).toFixed(1)}B` // convert to B for number from > 1 billion
                        }
                        else if(label < 900){
                            return `₹${label}`; // if value < 1000, nothing to do
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Price',
                    color: '#2196f3',
                    font: {
                        size: 20, 
                        lineHeight: 1.2,
                    }
                }
                , grid: {
                    color: '#fff',
                    lineWidth: 0.2
                }
            },
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 15,
                    beginAtZero: true, 
                },
                title: {
                    display: true,
                    text: `Time`,
                    color: '#2196f3',
                    font: {
                        size: 20, 
                        lineHeight: 1.2,
                    }
                }
                , grid: {
                    color: '#fff',
                    lineWidth: 0.2
                },
                min : 10
            },
        }
    }
