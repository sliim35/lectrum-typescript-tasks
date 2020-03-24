// Core
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { createMatchSelector } from 'connected-react-router';
import { book } from '../../routes/book';

// Instruments
import Styles from './styles.module.css';

// Types
import { AppState } from '../../init/rootReducer';

type ParamsTypes = {
    starship: string;
};

export const Starship: FC = () => {
    const starships = useSelector((state: AppState) => state.feed.starships);
    const matchSelector = createMatchSelector<any, ParamsTypes>(book.starship);
    const state = useSelector((state: AppState) => state);
    const match = matchSelector(state);

    if (!match) {
        return null;
    }

    const starshipName = match.params.starship;

    if (!starships.length) {
        return null;
    }

    const starship = starships.find((starship) => {
        return starship.name.replace(/ /g, '-').toLowerCase() === starshipName;
    });

    if (!starship) {
        return null;
    }

    const { name, starship_class, manufacturer, crew } = starship;

    return (
        <section className={Styles.starship}>
            <h1>Starship</h1>
            <div className={Styles.description}>
                <div>
                    <span>Имя:</span>
                    <span>&nbsp;{name}</span>
                </div>
                <div>
                    <span>Класс:</span>
                    <span>&nbsp;{starship_class}</span>
                </div>
                <div>
                    <span>Производитель:</span>
                    <span>&nbsp;{manufacturer}</span>
                </div>
                <div>
                    <span>Команда:</span>
                    <span>&nbsp;{crew}</span>
                </div>
            </div>
        </section>
    );
};
