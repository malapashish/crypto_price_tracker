import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { saveAs } from "file-saver";

import { chartOptions } from "../config/chartConfiguration";
import Button from "../components/Button";

const buttonArray = [5, 10, 20, 50, 90, 365, 11430];

const Details = (props) => {
  const [priceChartData, setPriceChartData] = useState({});
  const [marketCapChartData, setMarketCapChartData] = useState({});
  const [timeInterval, setTimeInterval] = useState(45);
  const [chartType, setChartType] = useState(true);
  const [toggleChart, setToggleChart] = useState(true);

  const Name = props.match.params.id;
  const Image = props.location.state.crypto.image;

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp);
    return `${d.getDate()}/${d.getMonth()}/${d.getUTCFullYear()}`;
  }

  useEffect(() => {
    let coinPriceValueTime = [];
    let coinPriceValue = [];
    let coinMarketCapTime = [];
    let coinMarketCap = [];

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${Name}/market_chart?vs_currency=inr&days=${timeInterval}&interval=1m`
      )
      .then((response) => {
          console.log(response);
        for (let info of response.data.prices) {
          coinPriceValueTime.push(convertTimestamp(info[0]));
          coinPriceValue.push(info[1]);
        }

        for (let info of response.data.market_caps) {
          coinMarketCapTime.push(convertTimestamp(info[0]));
          coinMarketCap.push(info[1]);
        }

        if (chartType) {
          setPriceChartData({
            labels: coinPriceValueTime,
            datasets: [
              {
                label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
                data: coinPriceValue,
                fill: false,
                borderColor: "#2196f3", // Add custom color border (Line)
                backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
                borderWidth: 0.5,
              },
            ],
          });
        } else {
          setMarketCapChartData({
            labels: coinMarketCapTime,
            datasets: [
              {
                label: `${Name.charAt(0).toUpperCase() + Name.slice(1)}`,
                data: coinMarketCap,
                fill: false,
                borderColor: "#2196f3", // Add custom color border (Line)
                backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
                borderWidth: 0.5,
              },
            ],
          });
        }
      });
  }, [timeInterval, Name, chartType]);

  const buttonClick = (num) => {
    setTimeInterval(num);
  };

  const changeChartType = (val) => {
    if (val === "Price" || val === "") {
      setChartType(true);
    } else {
      setChartType(false);
    }
  };

  const downloadChart = () => {
    const chart = document.getElementById("chart");
    chart.toBlob(function (blob) {
      saveAs(blob, `${Name}chart.png`);
    });
  };

  return (
    <div>
      <div className="heading">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <i className="fas fa-search-dollar"></i>
            <span style={{ textDecoration: "none" }}>CryptoTracker</span>
          </Link>
        </div>
      </div>
      <div className="coin-section">
        <img src={Image} alt={Name + "logo"} className="coin-logo" />
        <span className="coin-heading">
          {Name.charAt(0).toUpperCase() + Name.slice(1)}
        </span>
      </div>
      <div className="chart-container">
        <div className="chart-heading">
          <button
            type="button"
            className={`button ${chartType ? "active" : ""}`}
            onClick={() => changeChartType("Price")}
          >
            Price
          </button>{" "}
          {"  "}
          <button
            type="button"
            className={`button ${!chartType ? "active" : ""}`}
            onClick={() => changeChartType("MarketCap")}
          >
            Market Cap
          </button>
          <br />
          {buttonArray.map((num) => (
            <Button
              num={num}
              timeInterval={timeInterval}
              buttonClick={buttonClick}
            />
          ))}
          <br />
          <span className="invterval-heading">
            Data up to{" "}
            <span className="invterval-heading"> {timeInterval} </span> of days
            ago
          </span>
        </div>
        {toggleChart ? (
          <div className="chart">
            <Line
              data={chartType ? priceChartData : marketCapChartData}
              options={chartOptions}
            />
            <button
              className={`button fullscreen-button`}
              onClick={() => setToggleChart(!toggleChart)}
            >
              Full Screen
            </button>
          </div>
        ) : (
          <div className="full-size">
            <button
              onClick={() => setToggleChart(!toggleChart)}
              className="compress-button"
            >
              <i className="fas fa-compress-arrows-alt compress-arrow"></i>
            </button>
            <Line
              id="chart"
              data={chartType ? priceChartData : marketCapChartData}
              options={chartOptions}
            />
            <button onClick={downloadChart} className="download-button">
              <i className="fas fa-file-download download-icon"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
