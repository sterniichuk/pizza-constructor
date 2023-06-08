import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemCounter, {PropsI} from "../components/main/ItemCounter";
import { ToppingInfo} from "../data/ToppingInfo";

describe('ItemCounter', () => {
    const addToppingMock = jest.fn();
    const deleteToppingMock = jest.fn();
    const defaultToppingInfo: ToppingInfo = new ToppingInfo({
        name: "string",
        price: 2121,
        max: 3,
    })
    const defaultProps: PropsI = {
        max: 3,
        min: 0,
        initial: 0,
        addTopping: addToppingMock,
        deleteTopping: deleteToppingMock,
        topping: defaultToppingInfo,
    };

    it('renders the counter with initial value', () => {
        render(<ItemCounter {...defaultProps} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('increments the counter when plus sign is clicked', () => {
        render(<ItemCounter {...defaultProps} />);
        const plusSign = screen.getByAltText('plus');
        fireEvent.click(plusSign);
        expect(addToppingMock).toHaveBeenCalled();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('decrements the counter when minus sign is clicked', () => {
        render(<ItemCounter {...defaultProps} initial={1}/>);
        const minusSign = screen.getByAltText('minus');
        fireEvent.click(minusSign);
        expect(deleteToppingMock).toHaveBeenCalled();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('does not increment the counter beyond the max value', () => {
        render(<ItemCounter {...defaultProps} initial={3}/>);
        const plusSign = screen.getByAltText('plus');
        fireEvent.click(plusSign);
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('does not decrement the counter below the min value', () => {
        render(<ItemCounter {...defaultProps} />);
        const minusSign = screen.getByAltText('minus');
        fireEvent.click(minusSign);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('does not increment or decrement when topping is not available', () => {
        const unavailableTopping = {...defaultToppingInfo, max: 0, isAvailable: jest.fn().mockReturnValue(false)};
        render(<ItemCounter {...defaultProps} topping={unavailableTopping}/>);
        const plusSign = screen.getByAltText('plus');
        const minusSign = screen.getByAltText('minus');
        fireEvent.click(plusSign);
        fireEvent.click(minusSign);
        expect(addToppingMock).not.toHaveBeenCalled();
        expect(deleteToppingMock).not.toHaveBeenCalled();
        expect(screen.getByText('0')).toBeInTheDocument();
    });
});
