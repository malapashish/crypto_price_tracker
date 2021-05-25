import React , { useState , useEffect }from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Details = (props) => {

    const [ priceChartData , setPriceChartData ] = useState({});
    const [ marketCapChartData , setMarketCapChartData ] = useState({});
 
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

    const PriceChart = () => {
        let coinPriceValueTime = [];
        let coinPriceValue = [];
        let coinMarketCapTime = [];
        let coinMarketCap = [];

        axios 
            .get(`https://api.coingecko.com/api/v3/coins/${Name}/market_chart?vs_currency=inr&days=5&interval=10`) 
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
                labels : coinPriceValueTime,
                datasets: [
                    {
                    label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
                    data: coinPriceValue, 
                    fill: false,
                    borderColor: '#2196f3', // Add custom color border (Line)
                    backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                    borderWidth: 1 
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
             

            
        }
    
    const handleButtonClick = (val) => {
        console.log(val);
    }

    useEffect(() => {
        PriceChart();
    },[])


    return(
        <div>
            <div className = 'heading'>
                <div className = 'logo' >
                    <Link to = '/' style = {{textDecoration : 'none'}} >
                    <i className="fas fa-search-dollar"></i>
                      CryptoTracker
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
            <span  className = 'chart-heading'>
                Price 
            </span>
            <Line data = {priceChartData} height = {30} width = {150} /> 
            </div>
        </div>
    )
}

export default Details;