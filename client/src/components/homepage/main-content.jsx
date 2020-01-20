import React from "react";
import "./homepage.css"
import "./happy-guys.jpg"
import Grig from "../gallery/grid";
import {getApartments} from "../app-data/apartments-server";


class MainContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apartments: []
        }
    }

    async componentDidMount(){
        const apartments = await getApartments(0, 0, -1, 99999999999, 4);
        this.setState({
            apartments
        });
    }
    render() {
        return (
            <div>
                <div className={"container mt-4"}>
                    <div className={" row"}>
                        {
                            this.state.apartments.map((item, i) => <Grig {...item} type={"apartments"} key={i}/>)
                        }
                    </div>
                </div>
                <div className="whatsapp"><h2>What's happening in London, KY</h2></div>
                <div className="statistic row">
                    <div className="info col-md-3 col-sm-6"><p className="numbers">461</p><p>Homes for sale</p></div>
                    <div className="info col-md-3 col-sm-6"><p className="numbers">2</p><p>Open houses</p></div>
                    <div className="info col-md-3 col-sm-6"><p className="numbers">252</p><p>Recently sold</p></div>
                    <div className="info col-md-3 col-sm-6"><p className="numbers">32</p><p>Price reduced</p></div>
                </div>
                
                

                
            </div>
        )
    }
}

export default MainContent;
