import React from 'react';
import { Link } from 'react-router-dom';

const Details = ({ match : { params : {id} } }) => {

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
            {id}
        </div>
    )
}

export default Details;