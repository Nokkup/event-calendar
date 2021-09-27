import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Event from "../pages/Event";
import Login from "../pages/Login";
import Registration from '../pages/Registration';

const AppRouter = () => {
    const { isAuth } = useSelector(state => state.auth);

    return (
        isAuth
            ?
            <Switch>
                <Route
                    path={"/"}
                    exact={true}
                    component={Event}
                />
                <Redirect to={"/"} />
            </Switch>
            :
            <Switch>
                <Route
                    path={"/registration"}
                    exact={true}
                    component={Registration}
                />
                <Route
                    path={"/login"}
                    exact={true}
                    component={Login}
                />
                <Redirect to={"/login"} />
            </Switch>
    )
}

export default AppRouter;