import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Routes } from '../../constants';

export const ProtectedRoute = ({ isLoggedIn, ...props }) => (
  isLoggedIn ? <Route {...props} /> : <Redirect to={Routes.LOGIN} />
);

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withConnect(ProtectedRoute);
