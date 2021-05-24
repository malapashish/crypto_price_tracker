import React, { useEffect ,  useState } from 'react';
import axios from 'axios';
import { Route , Switch } from 'react-router-dom'

import Home from './Pages/Home';
import Details from './Pages/Details';

const App = () => {

    const [ inputCrypto , setInputCrypto ] = useState('');

    const [ cryptoList , setCryptoList ] = useState([]);

    const inputHandler = (e) => {
        setInputCrypto(e.target.value);
    }


    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then((response) => {
                setCryptoList(response.data);
                console.log(response.data);
            })
            .catch((e) => console.error(e))
    },[])

    const filterCrypto = cryptoList.filter((crypto) => crypto.name.toLowerCase().includes(inputCrypto.toLowerCase()) )

    return(
        // <Home  inputHandler = {inputHandler} inputCrypto = {inputCrypto} filterCrypto = {filterCrypto} />
        <Switch>
            <Route exact path = '/' render = {() => <Home  inputHandler = {inputHandler} inputCrypto = {inputCrypto} filterCrypto = {filterCrypto} />} />
            <Route path = '/details/:id' component = {Details} />
        </Switch>
    )
}

export default App;