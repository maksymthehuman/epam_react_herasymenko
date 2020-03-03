import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from '../../constants';

import { ProtectedRoute } from '../../components/ProtectedRoute';

import { HomePage } from '../homePage';
import { MovieInfo } from '../movieInfo';
import { ActorInfo } from '../actorInfo';
import { MovieEdit } from '../movieEdit';
import { Login } from '../authorization/login';
import { Register } from '../authorization/register';

export const AppRoutes = () => (
  <Switch>
    <ProtectedRoute path={Routes.HOMEPAGE} component={HomePage} />
    <ProtectedRoute path={`${Routes.MOVIEINFO}/:id`} component={MovieInfo} />
    <ProtectedRoute path={`${Routes.ACTORINFO}/:id`} component={ActorInfo} />
    <ProtectedRoute path={`${Routes.MOVIEEDIT}/:id`} component={MovieEdit} />
    <Route path={Routes.LOGIN} component={Login} />
    <Route path={Routes.REGISTER} component={Register} />
    <Redirect to={Routes.HOMEPAGE} />
  </Switch>
);
