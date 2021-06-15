import React from 'react';

const Button = ({ num , timeInterval , buttonClick }) => {
    
    const checkIfActive = (timeInterval) => {
        if(timeInterval === num){
            return 'active';
        }else{
            return '';
        }
    };
    
    
    return(
        <button
        type = 'button'
        className = {`button ${checkIfActive(timeInterval)}`}
        onClick = {() => buttonClick(num)}
        >
            {num === 11430 ? 'Max' : num}    
        </button>
    )
}

export default Button;