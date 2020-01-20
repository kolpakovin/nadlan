import React from "react";
import "./apartment.css"

class SingleAppLoader extends React.Component{
    render() {
        return(
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

export default SingleAppLoader
