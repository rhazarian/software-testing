/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Article from './Article'

describe('Component tests', () => {
    it('renders article title and text', () => {
        const title = "Test Article";
        const text = "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

        render(<Article article={{
            id: 0,
            title: title,
            text: text,
            important: false
        }}/>);
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();
        const textElement = screen.getByText(text);
        expect(textElement).toBeInTheDocument();
    });
});
