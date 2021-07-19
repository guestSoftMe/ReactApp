import React, {Component} from "react";


export class MapState extends Component{
    state={
        date: new Date().toLocaleString()
    }
    componentDidMount(){
        setInterval(() => {
                this.setState({
                    date: new Date().toLocaleString()
                })
            }
            , 1000)
    }
    render() {
        return(
            <div>{this.state.date}</div>
        )
    }
}