import {render, fireEvent, cleanup} from "@testing-library/react";
import React from "react";
import EditableTimebox from "../../components/EditableTimebox";

describe('<EditableTimebox />', () => {
    afterEach(cleanup);
    it("shows confirm button", () => {
        const { getByText } = render(<EditableTimebox/>)
        expect(() => {
            getByText('Zatwierdź zmiany')
        }).not.toThrow()
        
    });
    it("allows for editting timebox", () => {
        const { debug, getByText } = render(<EditableTimebox/>)
        fireEvent.click(getByText('Zatwierdź zmiany'))
        fireEvent.click(getByText('Edytuj'))
        expect(() => {
            getByText(/zmiany/)
        }).not.toThrow()
        
    });
});