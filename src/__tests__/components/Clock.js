import React from "react";
import Clock from "../../components/Clock";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

var root = null;
var clockRenderer = null;

describe("<Clock />", () => {
    describe("when given minutes and seconds (DOM)",()=>{
        beforeEach(() => {
            root = document.createElement("div");
            ReactDOM.render(
             <Clock minutes={10} seconds={20} />, root
            )
        });
        it('renders with class clock', () => {
           expect(root.childNodes[0].className).toMatch(/clock/)
        });
    
        it('renders as h2', () => {
            expect(root.childNodes[0].nodeName).toEqual("H2")
         });

        it('renders time correctly', () => {
            expect(<Clock minutes={10} seconds={20}/>).toEqual(<Clock className="" hours={0} miliseconds={0} minutes={10} 
            seconds={20} />)
        });
    
    })
    describe("when given minutes and seconds (test renderer)",()=>{
        beforeEach(() => {
            clockRenderer = renderer.create(
                <Clock minutes={10} seconds={20} />
            );
        });
        it('renders correctly', () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();
        });
        it('renders with className clock', () => {
            expect(clockRenderer.toJSON().props).toMatchObject({"className": expect.stringMatching(/clock/)})
        });
    
        it('renders as h2', () => {
            expect(clockRenderer.toJSON().type).toEqual("h2")
            
         });

        it('renders time corectly', () => {
            expect(clockRenderer.toJSON().children).toEqual(expect.arrayContaining(["10","20"]))
        });
    
    })
   
});