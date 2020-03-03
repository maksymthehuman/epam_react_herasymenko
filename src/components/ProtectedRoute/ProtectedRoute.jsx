import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Routes } from '../../constants';

const ProtectedRouteRoot = ({ isLoggedIn, ...props }) => (
  isLoggedIn ? <Route {...props} /> : <Redirect to={Routes.LOGIN} />
);

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export const ProtectedRoute = withConnect(ProtectedRouteRoot);

ProtectedRouteRoot.propTypes = {
  isLoggedIn: PropTypes.bool,
}
