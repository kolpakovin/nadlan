import React from "react";
import TopContent from "./top-homepage-content";
import "./homepage.css"
import MainContent from "./main-content";


class Homepage extends React.Component{
    render() {
        return(

            <div>
                <TopContent/>
                <MainContent />
            </div>
        )
    }
}

export default Homepage;
