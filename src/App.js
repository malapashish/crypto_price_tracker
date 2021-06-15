import React from 'react'; 
import { Route , Switch } from 'react-router-dom'

import Home from './Pages/Home';
import Details from './Pages/Details';

const App = () => {
    return(
        <Switch>
            <Route exact path = '/' component = {Home} />
            <Route path = '/details/:id' component = {Details} />
        </Switch>
    )
}

export default App;