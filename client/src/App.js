import React from 'react';
import './App.css';
import Header from "./components/header/header";
import Gallery from "./components/gallery/gallery";
import {getApartments} from "./components/app-data/apartments-server";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Apartment from "./components/apartment/single-apartment";
import Footer from "./components/homepage/footer";
import Loader from "./components/gallery/loader";
import User from "./components/userpage/user";
import Admin from "./components/userpage/admin";




class App extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return(
            <Router>
                <div id={"app"}>
                    <Header/>
                    <Switch>

                        <Route path={"/apartments"}>
                            <Gallery />
                            {/* {this.state.loading ? <Loader/> : <Gallery  type={"apartments"} />} */}
                        </Route>
                        <Route path={"/apartment/:id"} component={Apartment}/>
                        <Route path={"/profile"} >
                            <User/>
                        </Route>
                        <Route path={"/admin"}>
                            <Admin/>
                        </Route>
                        <Route path={"/"}>
                            {/*{this.state.loading ? <Loader/> : <Homepage items={this.state.apartmentsArray}/>}*/}
                            <Homepage />
                        </Route>
                        
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;
