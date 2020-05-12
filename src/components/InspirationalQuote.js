import React from "react";



class InspirationalQuote extends React.Component{
    
    state ={
        text:null,
        author:null
    }

    componentDidMount(){
        import("inspirational-quotes").then(
            (Quote) => this.setState({quote:  Quote.getQuote()})
        ).catch(
            console.log("coś poszło nie tak")
        )
        
    }
    
    render(){
        
        return(
            <>
            {this.state.quote ? 
            <figure>
                <blockquote>
                    {this.state.quote.text}
                </blockquote>
                <figcaption>
                    <cite>{this.state.quote.author}</cite>
                </figcaption>
            </figure>
            :
            "..." }
            </>
            )
    }
    
}

export default InspirationalQuote;