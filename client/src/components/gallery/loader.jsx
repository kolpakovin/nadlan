import React from "react";
import Grig from "./grid";

class Loader extends React.Component {
    render() {
        const buildLoaderItems = () => {
            return (<div className={"col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-2"}>
                <div className={"city-content card"}>
                    <img src={"../images/house_pic.jpg"} alt=""/>
                    <div className={"fake-content"}></div>
                </div>
            </div>)};


        return(
            <div>
                <div className={"fake-input"}></div>
                <div className={"row"}>
                    {buildLoaderItems()}{buildLoaderItems()}{buildLoaderItems()}{buildLoaderItems()}
                    {buildLoaderItems()}{buildLoaderItems()}{buildLoaderItems()}{buildLoaderItems()}
                    {buildLoaderItems()}{buildLoaderItems()}{buildLoaderItems()}{buildLoaderItems()}

                </div>
            </div>
        )
    }
    }

    export default Loader;
