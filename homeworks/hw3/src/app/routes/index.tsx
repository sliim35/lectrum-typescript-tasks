// Core
import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import {
    Nav,
    Bridge,
    Panel,
    Starship,
    Profile,
    Registration,
} from '../components';
import { book } from './book';

export const Routes: FC = () => {
    return (
        <>
            <Route component={Nav} path="/" />
            <Switch>
                <Route exact component={Bridge} path={book.root} />
                <Route exact component={Panel} path={book.panel} />
                <Route exact component={Starship as FC} path={book.starship} />
                <Route exact component={Profile} path={book.profile} />
                <Route
                    exact
                    component={Registration}
                    path={book.registration}
                />
                <Redirect to={book.root} />
            </Switch>
        </>
    );
};
