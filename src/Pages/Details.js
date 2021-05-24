import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Details = (props) => {

    console.log(props);
    const Name = props.match.params.id;
    const Image = props.location.state.crypto.image;
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
        </div>
    )
}

export default Details;