import React from "react";
import {navigation} from "../app-data/header-data";
import MainBar from "./main-bar";
import "./header.css";
import RightSide from "./right-side";

class Header extends React.Component {
    render() {
        return (
            <header id={"app-header"} className={"d-flex"}>
                {/* <div className={"burger-icon"}>
                    <div className={"burger-menu"}></div>
                    <div className={"burger-menu"}></div>
                    <div className={"burger-menu"}></div>
                </div> */}
                <div id={"left-side"}><a href="/"><img src="./images/evgenyrealestate.png" alt=""/></a>

                    {/* <div className={"navigation"}>

                        <MainBar/>
                    </div> */}
                </div>
                <div id={"right-side"}><RightSide/></div>
            </header>
        )
    }
}

export default Header;
