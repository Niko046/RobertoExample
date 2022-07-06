import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import App from '../pages/App';
import Lidero from '../pages/Lidero';

function Routes() {
return(
<BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/principal" component={App}/>
        <Route exact path="/lider" component={Lidero}/>

      </Switch>
    </BrowserRouter>
);

}

export default Routes;