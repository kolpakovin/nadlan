import React from "react";
import "./header.css";
import RightSide from "./right-side";

class Header extends React.Component {
    render() {
        return (
            <header id={"app-header"} className={"d-flex"}>
                <div id={"left-side"}><a href="/"><img src="/images/evgenyrealestate.png" alt=""/></a>
                </div>
                <div id={"right-side"}><RightSide/></div>
            </header>
        )
    }
}

export default Header;
