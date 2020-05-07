import React from "react";

class ProgressCircle extends React.Component{
    constructor(props){
        super(props);
        this.canvas = React.createRef();
        this.time = 0;
    }
    
    draw () {
        const ctx = this.canvas.current.getContext("2d");
        const {percent} = this.props;
        ctx.save();
        //ctx.clearRect(0,0,size,size);
        ctx.rotate(Math.PI/2);
        ctx.beginPath();
        var gradient = ctx.createLinearGradient(0, 0, 170, 0);
            gradient.addColorStop("0", "lightblue");
            gradient.addColorStop("1.0", "blue");
            // Fill with gradient
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        ctx.arc(50,50,45,0,(Math.PI*percent/50),false);
        ctx.stroke();
    }
    update = () => {
        this.time += 0.02;
        this.draw();
    }
    componentDidMount(){
        this.draw();
        window.requestAnimationFrame(this.update);
    }
    componentDidUpdate(){
        this.draw();
        window.requestAnimationFrame(this.update);
    }
    render() {
        return (
            <canvas 
                ref={this.canvas} 
                height={this.props.size} 
                width={this.props.size} 
            />
        );
    }
    
}

export default ProgressCircle;