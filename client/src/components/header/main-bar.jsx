import React from "react";
import Inner from "./inner";
import {navigation} from "../app-data/header-data";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


// Set initial activeMenu state (inside the constructor)
// Create function that change the state
// Call that function and send index to it


class MainBar extends React.Component {
    constructor() {
        super();
        this.state = {
            activeMenu: null
        }
    }

    changeActiveMenu = (index, activeMenu) => {
        this.setState({
            activeMenu: activeMenu === index ? -1 : index
        })
    }

    render() {
        const {activeMenu} = this.state;
        return (
            <ul className={"d-flex align-middle full-height"}>
                {navigation.map((mainNavItem, m) => {
                    return (
                        <li onMouseEnter={() => this.changeActiveMenu(m, activeMenu)}
                            onMouseLeave={() => this.changeActiveMenu(-1, activeMenu)} className={"navigation-li"}
                            key={m}>
                            <Link
                                to={mainNavItem.label.toLowerCase() === "buy" ? "/cities" : "/" + mainNavItem.label.toLowerCase()}>
                                <h4 className={"li-title"}>
                                    {mainNavItem.label}
                                </h4>
                            </Link>
                            {activeMenu === m && <Inner innerMenu={mainNavItem.innerMenu}/>}
                        </li>
                    )
                })
                }
            </ul>)
    }
}

export default MainBar;
