import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CryptoCard from "../components/CryptoCard";

const Home = () => {
  const [inputCrypto, setInputCrypto] = useState("");

  const [cryptoList, setCryptoList] = useState([]);

  const filterCrypto = cryptoList.filter((crypto) =>
    crypto.name.toLowerCase().includes(inputCrypto.toLowerCase())
  );

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setCryptoList(response.data);
        console.log(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const inputHandler = (e) => {
    setInputCrypto(e.target.value);
  };

  return (
    <div>
      <div className="heading">
        <div className="logo">
          <i className="fas fa-search-dollar"></i>
          CryptoTracker
        </div>
        <form>
          <input
            className="inputField"
            type="text"
            placeholder="Search"
            value={inputCrypto}
            onChange={inputHandler}
          />
        </form>
      </div>
      <div className="cryptoContainer">
        {filterCrypto.map((crypto) => (
          <Link
            to={{
              pathname: "/details/" + crypto.id,
              state: {
                crypto: crypto,
              },
            }}
            key={crypto.id}
            style={{ textDecoration: "none" }}
          >
            <CryptoCard
              key={crypto.id}
              name={crypto.name}
              price={crypto.current_price}
              symbol={crypto.symbol}
              marketCap={crypto.market_cap}
              volume={crypto.total_volume}
              image={crypto.image}
              priceChange={crypto.price_change_percentage_24h}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
