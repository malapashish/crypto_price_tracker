import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
 

const Details = (props) => {

    const [priceChartData, setPriceChartData] = useState({});
    const [marketCapChartData, setMarketCapChartData] = useState({});
    const [timeInterval, setTimeInterval] = useState(45);
    const [chartType, setChartType] = useState(true);
    const [ toggleChart , setToggleChart ] = useState(true);

    const Name = props.match.params.id;
    const Image = props.location.state.crypto.image;

    function convertTimestamp(timestamp) {
        var d = new Date(timestamp);
        return `${d.getDate()}/${d.getMonth()}/${d.getUTCFullYear()}`;
    }

    useEffect(() => {
        // PriceChart();
        let coinPriceValueTime = [];
        let coinPriceValue = [];
        let coinMarketCapTime = [];
        let coinMarketCap = [];


        axios
            .get(`https://api.coingecko.com/api/v3/coins/${Name}/market_chart?vs_currency=usd&days=${timeInterval}&interval=1m`)
            .then((response) => {
                for (const info of response.data.prices) {
                    coinPriceValueTime.push(convertTimestamp(info[0]));
                    coinPriceValue.push(info[1])
                }

                for (const info of response.data.market_caps) {
                    coinMarketCapTime.push(convertTimestamp(info[0]));
                    coinMarketCap.push(info[1]);
                }

                setTimeout(() => {
                    setPriceChartData({
                        labels: coinPriceValueTime,
                        datasets: [
                            {
                                label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
                                data: coinPriceValue,
                                fill: false,
                                borderColor: '#2196f3', // Add custom color border (Line)
                                backgroundColor: '#2196f3', // Add custom color background (Points and Fill) 
                                borderWidth: 0.5
                            }
                        ]
                    })
                }, 10)


                setMarketCapChartData({
                    labels: coinMarketCapTime,
                    datasets: [
                        {
                            label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
                            data: coinMarketCap,
                            fill: false,
                            borderColor: '#2196f3', // Add custom color border (Line)
                            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                            borderWidth: 0.5
                        }
                    ]
                })

            })


    }, [timeInterval, Name])

    const buttonClick = (num) => {
        setTimeInterval(num); 
    }

    const changeChartType = (val) => {
        if (val === 'Price' || val === '') {
            setChartType(true);
        } else {
            setChartType(false);
        }
    }

    const chartOptions = {
        responsive: true,
        title: { text: "THICCNESS SCALE", display: true },
        scales: {
            y: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    callback : function(label , index , labels) {
                        if(label > 999 && label < 1000000){
                        return `₹${(label/1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million 
                        }else if(label > 1000000){
                            return `₹${(label/1000000).toFixed(1)}M`; // convert to M for number from > 1 million 
                        }else if(label < 900){
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

    return (
        <div>
            <div className='heading'>
                <div className='logo' >
                    <Link to='/' style={{ textDecoration: 'none' }} >
                        <i className="fas fa-search-dollar"></i>
                        <span style={{ textDecoration: 'none' }} >
                            CryptoTracker
                      </span>
                    </Link>
                </div>
            </div>
            <div className='coin-section'>
                <img src={Image} alt={Name + 'logo'} className='coin-logo' />
                <span className='coin-heading'>
                    {Name.charAt(0).toUpperCase() + Name.slice(1)}
                </span>
            </div>
            <div className='chart-container'>
                <div className='chart-heading'>
                    <button type='button' className={`button ${chartType ? "active" : ""}`} onClick={() => changeChartType('Price')} >Price</button> {'  '}
                    <button type='button' className={`button ${!chartType ? "active" : ""}`} onClick={() => changeChartType('MarketCap')}  >Market Cap</button>
                    <br />
                    <button type="button" className={`button ${timeInterval === 5 ? "active" : ""}`} onClick={() => buttonClick(5)}>5</button>{'   '}
                    <button type="button" className={`button ${timeInterval === 10 ? "active" : ""}`} onClick={() => buttonClick(10)}>10</button>{'   '}
                    <button type="button" className={`button ${timeInterval === 20 ? "active" : ""}`} onClick={() => buttonClick(20)}>20</button>{'   '}
                    <button type="button" className={`button ${timeInterval === 50 ? "active" : ""}`} onClick={() => buttonClick(50)}>50</button>{'   '}
                    <button type="button" className={`button ${timeInterval === 90 ? "active" : ""}`} onClick={() => buttonClick(90)}>90</button>{'   '}
                    <button type="button" className={`button ${timeInterval === 365 ? "active" : ""}`} onClick={() => buttonClick(365)}>365</button>{'   '}
                    <button type="button" className={`button ${timeInterval === 11430 ? "active" : ""}`} onClick={() => buttonClick(11430)}>MAX</button>{'   '}
                    <br />
                    <span className='invterval-heading'>Data up to  </span>
                    {
                        timeInterval === 45 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    {
                        timeInterval === 5 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    {
                        timeInterval === 10 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    {
                        timeInterval === 20 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    {
                        timeInterval === 50 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    {
                        timeInterval === 90 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    {
                        timeInterval === 365 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    {
                        timeInterval === 11430 && <span className='invterval-heading'> {timeInterval} </span>
                    }
                    <span className='invterval-heading'>of days ago</span>
                </div> 
                {
                    toggleChart 
                    ?<div className='chart'>
                        <Line
                        data={chartType ? priceChartData : marketCapChartData}
                        options={chartOptions}
                        />
                        {/* <button onClick = {() => setToggleChart(!toggleChart)} className = 'expand-button' > 
                            <i class="fas fa-expand-arrows-alt expand-arrow"></i>
                        </button> */}
                        <button className={`button fullscreen-button`} onClick={() => setToggleChart(!toggleChart)}> 
                            Full Screen
                        </button>
                    </div> 
                    :<div className = 'full-size'>
                        <button onClick = {() => setToggleChart(!toggleChart)} className = 'compress-button'>
                            <i className="fas fa-compress-arrows-alt compress-arrow"></i>
                        </button>
                        <Line
                        data={chartType ? priceChartData : marketCapChartData}
                        options={chartOptions}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default Details;