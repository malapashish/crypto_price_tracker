import React , { useState , useEffect }from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Details = (props) => {

    const [ charData , setCharData ] = useState({});
    const [ charOptions , setCharOptions ] = useState({});
    const [ timeData , setTimeData ] = useState([]);
    const [ PriceData , setPriceData ] = useState([]);
 
    const Name = props.match.params.id;
    const Image = props.location.state.crypto.image;


    const getDate = (uni) => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        const newdate = year + "/" + month + "/" + day;
        return newdate
    }

    const chart = () => {
        let coinTime = [];
        let coinPrice = [];

        axios
            .get(`https://api.coingecko.com/api/v3/coins/${Name}/market_chart/range?vs_currency=inr&from=1619268023&to=1621860023`)
            .then((response) => {
                console.log(response);
                for(const info of response.data.prices){
                    coinTime.push(getDate(info[0]));
                    coinPrice.push(info[1])
                }
                setCharData({
                labels : coinTime,
                datasets: [
                    {
                    label: "level of thiccness",
                    data: coinPrice, 
                    fill: false,
                    borderColor: '#2196f3', // Add custom color border (Line)
                    backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                    borderWidth: 1 
                    }
                ]
            })
            })
            
            setCharOptions({
                scales: {
              xAxes: [{gridLines: { color: "#2196f3" }}],
              yAxes: [{gridLines: { color: "#131c2b" }}]
              }
            })

        }

    

    useEffect(() => {
        chart();
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
            <Line data = {charData} 
              options= {charOptions}
            />
        </div>
    )
}

export default Details;