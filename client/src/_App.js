import React from 'react';
import './App.css';
import Header from "./components/header/header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {apartmentsArray} from "./components/app-data/apartments-array";
import Gallery from "./components/gallery/gallery";


class App extends React.Component{

    render() {

        return(
            <Router>
            <div id={"app "}>
                <Header/>
                 <Switch>
                    <Route path={"/apartments"}>
                        <h4 className={"ml-2"}>Apartments</h4>
                        <Gallery items={apartmentsArray} type={"apartments"}  />
                    </Route>
                 </Switch>
            </div>
            </Router>

        )
    }
}

export default App;
