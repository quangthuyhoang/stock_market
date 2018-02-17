import { React } from 'react';
import ReactDOM from 'react-dom';
import Company from './Company';

it("renders without crashing", function() {
    const div = document.createElement("div");
    ReactDOM.render(<Company />, div)
});




