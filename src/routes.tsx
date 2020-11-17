import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import SheltersMap from './pages/SheltersMap'
import ShelterForm from './pages/ShelterForm'
import ShelterDetail from './pages/ShelterDetail'
import Login from './pages/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/login" component={ Login } /> 
        <Route path="/shelters-map" component={ SheltersMap } /> 
        <Route path="/shelter/detail/:id" component={ ShelterDetail } /> 
        <Route path="/shelter/create" component={ ShelterForm } /> 
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;