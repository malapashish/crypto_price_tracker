import React from 'react'; 

import './card.css';

const CryptoCard = ({name , price , symbol , marketCap , volume , image , priceChange}) => {
    return(
        <div className = 'cryptoCard' >
            <img src = {image} alt = 'Crypto Logo' className = 'cryptoLogo' />
            <div className = 'cryptoNameWrap'>
                <h1 className = 'cryptoName'>
                    {name}
                </h1>
                <p className = 'cryptoSign'>
                    {symbol}
                </p>
            </div>
            <p className = 'cryptoPrice'>
                ₹{price.toLocaleString()}
            </p>
            <p className = 'cryptoMarketCap'>
                Market Cap : ₹{marketCap.toLocaleString()}
            </p>
            <p className = 'cryptoVolume'>
                Volume : {volume.toLocaleString()}
            </p>
            {priceChange < 0 ? (
                <div className = 'downPriceContainer'>
                    {/* <i className = "fas fa-angle-down fa-2x"></i> */}
                    <i className="fas fa-chevron-down down-arrow"></i>
                    <p className = 'changedPrice'>{priceChange.toFixed(2)}%</p>
                </div>
            ):(
                <div className = 'upPriceContainer'>
                    <i className="fas fa-chevron-up up-arrow"></i>
                    <p className = 'changedPrice'>{priceChange.toFixed(2)}%</p>
                </div>
            )}
        </div>
    )
}

export default CryptoCard;