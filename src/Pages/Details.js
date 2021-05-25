import React , { useState , useEffect }from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Details = (props) => {

    const [ priceChartData , setPriceChartData ] = useState({});
    const [ marketCapChartData , setMarketCapChartData ] = useState({});
    const [ chartType , setChartType ] = useState(true);
    const [ buttonType , setButtonType ] = useState(45);
    const [ timeInterval , setTimeInterval ] = useState(45)

    const Name = props.match.params.id;
    const Image = props.location.state.crypto.image;


    const getDate = (uni) => {
        var dateObj = new Date(uni);
        var currentDate = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var hours = dateObj.getHours();
        var mintues = dateObj.getMinutes();
        if(currentDate.getDate() === dateObj.getDate()){
            return hours + ':' + mintues;
        }
        const newdate = year + "/" + month + "/" + day;
        return newdate
    }

    // const PriceChart = () => {
    //     let coinPriceValueTime = [];
    //     let coinPriceValue = [];
    //     let coinMarketCapTime = [];
    //     let coinMarketCap = [];

    //     axios 
    //         .get(`https://api.coingecko.com/api/v3/coins/${Name}/market_chart?vs_currency=inr&days=${timeInterval}&interval=1`) 
    //         .then((response) => {
    //             console.log(response);
    //             for(const info of response.data.prices){
    //                 coinPriceValueTime.push(getDate(info[0]));
    //                 coinPriceValue.push(info[1])
    //             }

    //             for( const info of response.data.market_caps){
    //                 coinMarketCapTime.push(getDate(info[0]));
    //                 coinMarketCap.push(info[1]);
    //             }
 
    //                 setPriceChartData({
    //                 labels :  coinPriceValueTime,
    //                 datasets: [
    //                     {
    //                     label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
    //                     data: coinPriceValue, 
    //                     fill: false,
    //                     borderColor: '#2196f3', // Add custom color border (Line)
    //                     backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
    //                     borderWidth: 0.5
    //                     }
    //                 ]
    //                 })  
 
 

    //             setMarketCapChartData({
    //                labels : coinMarketCapTime,
    //                 datasets: [
    //                     {
    //                     label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
    //                     data: coinMarketCap, 
    //                     fill: false,
    //                     borderColor: '#2196f3', // Add custom color border (Line)
    //                     backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
    //                     borderWidth: 1 
    //                     }
    //                 ] 
    //             })

    //         })
             

            
    //     }
    
    

    useEffect(() => {
        // PriceChart();
        let coinPriceValueTime = [];
        let coinPriceValue = [];
        let coinMarketCapTime = [];
        let coinMarketCap = [];

        axios 
            .get(`https://api.coingecko.com/api/v3/coins/${Name}/market_chart?vs_currency=inr&days=${timeInterval}&interval=1`) 
            .then((response) => {
                console.log(response);
                for(const info of response.data.prices){
                    coinPriceValueTime.push(getDate(info[0]));
                    coinPriceValue.push(info[1])
                }

                for( const info of response.data.market_caps){
                    coinMarketCapTime.push(getDate(info[0]));
                    coinMarketCap.push(info[1]);
                }
 
                    setPriceChartData({
                    labels :  coinPriceValueTime,
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
 
 

                setMarketCapChartData({
                   labels : coinMarketCapTime,
                    datasets: [
                        {
                        label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
                        data: coinMarketCap, 
                        fill: false,
                        borderColor: '#2196f3', // Add custom color border (Line)
                        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                        borderWidth: 1 
                        }
                    ] 
                })

            })
             

    },[timeInterval , Name])

    const buttonClick = (num) => {
        setButtonType(num);
        setTimeInterval(num);
        console.log(timeInterval);
    }

    const changeChartType = (val) => {
        if(val === 'Price' || val === ''){
            setChartType(true);
        }else{
            setChartType(false);
        }
    }

    return(
        <div>
            <div className = 'heading'>
                <div className = 'logo' >
                    <Link to = '/' style = {{textDecoration : 'none'}} >
                    <i className="fas fa-search-dollar"></i>
                      <span style = {{ textDecoration : 'none' }} >
                        CryptoTracker   
                      </span> 
                    </Link>
                </div> 
            </div> 
            <div className = 'coin-section'>
                <img src = {Image} alt = { Name + 'logo' } className = 'coin-logo' />
                <span className = 'coin-heading'>
                    {Name.charAt(0).toUpperCase() + Name.slice(1)}
                </span>
            </div> 
            <div className = 'chart-container'>
                <button type = 'button' className = {`button ${chartType ? "active" : ""}`} onClick = {() => changeChartType('Price')} >Price</button> {'  '}
                <button type = 'button' className = {`button ${!chartType ? "active" : ""}` } onClick = {() => changeChartType('MarketCap')}  >Market Cap</button>
            <div  className = 'chart-heading'>
                { chartType ? 'Price' : 'Marktet_Cap' }
                <br/>
                <button type="button" className={ `button ${buttonType === 5 ? "active" : ""}`} onClick = {() => buttonClick(5)}>5</button>{'   '}
                <button type="button" className={ `button ${buttonType === 10 ? "active" : ""}`} onClick = {() => buttonClick(10)}>10</button>{'   '}
                <button type="button" className={ `button ${buttonType === 20 ? "active" : ""}`} onClick = {() => buttonClick(20)}>20</button>{'   '}
                <button type="button" className={ `button ${buttonType === 50 ? "active" : ""}`} onClick = {() => buttonClick(50)}>50</button>{'   '}
                <button type="button" className={ `button ${buttonType === 90 ? "active" : ""}`} onClick = {() => buttonClick(90)}>90</button>{'   '}
                <button type="button" className={ `button ${buttonType === 365 ? "active" : ""}`} onClick = {() => buttonClick(365)}>365</button>{'   '}
                <button type="button" className={ `button ${buttonType === 11430 ? "active" : ""}`} onClick = {() => buttonClick(11430)}>MAX</button>{'   '}
                <br /> 
                <span className = 'invterval-heading'>Data up to  </span>
                {
                    buttonType === 45 && <span className = 'invterval-heading'> {buttonType} </span>
                }
                {
                    buttonType === 5 && <span className = 'invterval-heading'> {buttonType} </span>
                }
                {
                    buttonType === 10 && <span className = 'invterval-heading'> {buttonType} </span>
                }
                {
                    buttonType === 20 && <span className = 'invterval-heading'> {buttonType} </span>
                }
                {
                    buttonType === 50 && <span className = 'invterval-heading'> {buttonType} </span>
                }
                {
                    buttonType === 90 && <span className = 'invterval-heading'> {buttonType} </span>
                }
                {
                    buttonType === 365 && <span className = 'invterval-heading'> {buttonType} </span>
                } 
                {
                    buttonType === 11430 && <span className = 'invterval-heading'> {buttonType} </span>
                } 
                <span className = 'invterval-heading'>of days ago</span>
            </div>
            <Line data = {chartType ? priceChartData : marketCapChartData}
             options={{
            responsive: true, 
            scales: { 
              y : {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    callback: function(label, index, labels) {
                        return '₹'+label;
                    } 
                  },
                  gridLines: {
                    display: false
                  },
                  title : {
                      display: true,
                    text: 'Price',
                    color: '#2196f3',
                     font: { 
                        size: 20,
                        style: 'bold',
                        lineHeight: 1.2,
                    }
                  }  
                }
              ,
              x : {
                  gridLines: {
                    display: false
                  },
                  title : {
                      display: true,
                    text: `Time`,
                    color: '#2196f3',
                     font: { 
                        size: 20,
                        style: 'bold',
                        lineHeight: 1.2,
                    }
                  } 
                }
              
            }
          }}
            /> 
            </div>
        </div>
    )
}

export default Details;