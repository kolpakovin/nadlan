import React from "react";
import Grig from "./grid";
import {getApartments} from "../app-data/apartments-server";



class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            city: "",
            number_of_rooms: 0,
            number_of_beds: 0,
            min_price: 0,
            max_price: 0,
            apartments: []
        }
    }

    async componentDidMount() {
        const apartments = await getApartments({rooms: this.state.number_of_rooms, beds: this.state.number_of_beds, minprice: this.state.min_price, maxprice: this.state.maxprice});
        this.setState({
            apartments,
            loading: false,
        });
    }

    showApartments = (apartments) => {
        console.log('apartments', apartments);
        this.setState({
            apartments,
            loading: false,
        })
    }
    
    toggleSubMenu1 = () => {
        this.setState({isTrue1: !this.state.isTrue1,
                            isTrue2: false, isTrue3: false          })
    }
    toggleSubMenu2 = () => {
        this.setState({isTrue2: !this.state.isTrue2,
                             isTrue3: false, isTrue1: false       })
    }
    toggleSubMenu3 = () => {
        this.setState({isTrue3: !this.state.isTrue3,
                            isTrue2: false, isTrue1: false})
    }
    handleInputChange = (e) => {
         const {name,value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleRadioChangeRooms = (e) => {
        const {name,value} = e.target;
        console.log('value: ',value)
        this.setState({
            number_of_rooms: value
        })
    }
    handleRadioChangeBeds = (e) => {
        const {name,value} = e.target;

        console.log('value: ',value)
        this.setState({
            number_of_beds: value
        })
    }

    searchApartments = async e => {
        console.log({rooms: this.state.number_of_rooms, beds: this.state.number_of_beds, minprice: this.state.min_price, maxprice: this.state.maxprice});
        const apartments = await getApartments(this.state.number_of_rooms, this.state.number_of_beds, this.state.min_price, this.state.maxprice);
        this.showApartments(apartments);
    }

    render() {
        const isTrue1 = this.state.isTrue1;
        const isTrue2 = this.state.isTrue2;
        const isTrue3 = this.state.isTrue3;

        const rooms_fltr = <div>
            <div>
                <button  onClick={this.toggleSubMenu1} className={"btn btn-secondary dropdown-toggle ml-2"} >Rooms</button>

                {isTrue1 &&
                <div className={"dropdown-fltr position-absolute fltr"}>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={1} type="radio" onChange={this.handleRadioChangeRooms}/>1+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={2} type="radio" onChange={this.handleRadioChangeRooms}/>2+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={3} type="radio" onChange={this.handleRadioChangeRooms}/>3+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={4} type="radio" onChange={this.handleRadioChangeRooms}/>4+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={5} type="radio" onChange={this.handleRadioChangeRooms}/>5+</label>

                </div>}


            </div>
        </div>;
        const beds_fltr = <div>
            <div>
                <button  onClick={this.toggleSubMenu2} className={"btn btn-secondary dropdown-toggle ml-2"} >Beds</button>

                {isTrue2 &&
                <div className={"dropdown-fltr position-absolute fltr"}>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={1} type="radio" onChange={this.handleRadioChangeBeds}/>1+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={2} type="radio" onChange={this.handleRadioChangeBeds}/>2+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={3} type="radio" onChange={this.handleRadioChangeBeds}/>3+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={4} type="radio" onChange={this.handleRadioChangeBeds}/>4+</label>
                    <label className={"label-of-submenu"}><input className={"d-none"} name={"room"} value={5} type="radio" onChange={this.handleRadioChangeBeds}/>5+</label>

                </div>}


            </div>
        </div>;
        const price_fltr = <div>
            <button  onClick={this.toggleSubMenu3} className={"btn btn-secondary dropdown-toggle ml-2"} >Price</button>
            {isTrue3 &&
                <div className={"dropdown-fltr position-absolute fltr"}>
                <span className={"submenu-title"}>Price range</span>
                <div className={"d-flex price-fltr"}>
                    <div><span className={"dollar"}>$</span><input type="text" className={"form-control"} name={"min_price"} placeholder={"No Min"} onChange={this.handleInputChange}/></div>
                    <span className={"price-divider "}>-</span>
                    <div><span className={"dollar"}>$</span><input type="text" className={"form-control"} name={"max_price"} placeholder={"No Max"} onChange={this.handleInputChange}/></div>
                </div>
            </div>}
        </div>
        
        return (
            <div>
                <div id={"filters"} className={"mb-2"}>
                    <input id={"name-input"} className={"form-control"} type="text" name="city" onChange={this.handleInputChange}/>
                    {rooms_fltr}
                    {beds_fltr}
                    {price_fltr}
                    <button className="btn btn-outline-black" onClick={this.searchApartments}>SEARCH</button>
                </div>
                <h2 style={{fontSize: "20px"}}><b className={"ml-2 mt-3"}>New York, NY Real Estate & Homes for Sale</b></h2>
                <h4 className={"ml-2 mt-2"}>{this.state.apartments.length}</h4>
                <div className={"gallery row "}>
                    {this.state.apartments.map((item, i) => <Grig {...item} key={i}/>)}
                </div>
            </div>
        )
    }
}

export default Gallery;
