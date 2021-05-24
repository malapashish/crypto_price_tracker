import React from 'react';
import { Link } from 'react-router-dom';

import CryptoCard from '../components/CryptoCard';

const Home = ({inputCrypto , inputHandler , filterCrypto}) => {

    return(
        <div>
            <div className = 'heading'>
                <div className = 'logo' >
                    <i className="fas fa-search-dollar"></i>
                      CryptoTracker
                </div>
                <form>
                    <input className = 'inputField' type = 'text' placeholder = 'Search' value = {inputCrypto} onChange = {inputHandler} />
                </form>
            </div>
            <div className = 'cryptoContainer'>
                {
                    filterCrypto.map((crypto) =>
                        <Link to = {'/details/' + crypto.id} key = {crypto.id} style = {{ textDecoration : 'none' }} >
                            <CryptoCard 
                            key = {crypto.id}
                            name = {crypto.name}
                            price = {crypto.current_price}
                            symbol = {crypto.symbol}
                            marketCap = {crypto.market_cap}
                            volume = {crypto.total_volume}
                            image = {crypto.image}
                            priceChange = {crypto.price_change_percentage_24h}
                            />
                        </Link> 

                    )
                }
            </div>
        </div>
    )

}

export default Home;