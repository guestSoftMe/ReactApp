import React from 'react';
import ReactDOM from 'react-dom';
import {Hooks} from "./reduse/reduserHooks";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Hooks/>, div);
});