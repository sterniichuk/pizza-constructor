import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ToppingInfo} from "../data/ToppingInfo";
import StaticSelector, {PropsS} from "../components/main/StaticSelector";

describe('StaticSelector', () => {
    const defaultOption: ToppingInfo = {
        max: 3,
        price: 1010,
        name: 'Default Topping',
        isAvailable: jest.fn().mockReturnValue(true)
    };
    const list: ToppingInfo[] = [
        {price: 1010, name: 'Topping 1', max: 2, isAvailable: jest.fn().mockReturnValue(true)},
        {price: 1010, name: 'Topping 2', max: 3, isAvailable: jest.fn().mockReturnValue(true)},
        {price: 1010, name: 'Topping 3', max: 1, isAvailable: jest.fn().mockReturnValue(true)},
    ];

    const callbackMock: (name: ToppingInfo) => void = jest.fn();

    const defaultProps: PropsS = {
        list: list,
        defaultOption: defaultOption,
        callback: callbackMock,
    };

    it('renders the list of options', () => {
        render(<StaticSelector {...defaultProps} />);
        expect(screen.getByText('Topping 1')).toBeInTheDocument();
        expect(screen.getByText('Topping 2')).toBeInTheDocument();
        expect(screen.getByText('Topping 3')).toBeInTheDocument();
    });

    it('selects an option on click', () => {
        const clickList: ToppingInfo[] = [
            {price: 1010, name: 'Topping 1', max: 2, isAvailable: jest.fn().mockReturnValue(true)},
            {price: 1010, name: 'Topping 2', max: 1, isAvailable: jest.fn().mockReturnValue(true)},
            {price: 1010, name: 'Topping 3', max: 3, isAvailable: jest.fn().mockReturnValue(true)},
        ];
        render(<StaticSelector {...defaultProps} list={clickList}/>);
        const topping2 = screen.getByText('Topping 2');
        fireEvent.click(topping2);
        expect(callbackMock).toHaveBeenCalled();
        expect(callbackMock).toHaveBeenCalledWith(clickList[1])
    });

    it('does not select an option if it is not available', () => {
        const unavailableTopping: ToppingInfo = {
            price: 1010, name: 'Unavailable Topping',
            max: 1,
            isAvailable: jest.fn().mockReturnValue(false)
        };
        const updatedList = [...list, unavailableTopping];
        render(<StaticSelector {...defaultProps} list={updatedList}/>);
        const unavailableToppingElement = screen.getByText('Unavailable Topping');
        fireEvent.click(unavailableToppingElement);
        expect(callbackMock).not.toHaveBeenCalled();
    });
});
