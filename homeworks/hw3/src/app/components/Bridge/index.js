// Core
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

// Instruments
import Styles from './styles.module.css';
import observatory from './observatory.jpg';
import { book } from '../../routes/book';

export const Bridge = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const _proceed = () => dispatch(push(book.panel));

    return (
        <section className = { Styles.bridge }>
            <h1>
                Добро пожаловать на борт, {profile.firstName}
                &nbsp;
                {profile.lastName}!
            </h1>
            <img src = { observatory } alt="observatory" />
            <button onClick = { _proceed }>Контрольная панель</button>
        </section>
    );
}
