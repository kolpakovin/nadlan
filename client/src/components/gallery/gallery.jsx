import React from "react";
import Grig from "./grid";
import {getApartments, getAllCitiesWithApartments} from "../app-data/apartments-server";



class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            city_id: 0,
            number_of_rooms: 0,
            number_of_beds: 0,
            min_price: 0,
            max_price: 9999999,
            apartments: [],
            cities: [],
            first_number: 1,
            second_number: 2,
            third_number: 3,
            apartments_length: null
        }
    }

    async componentDidMount() {
        const apartments = await getApartments({rooms: this.state.number_of_rooms, beds: this.state.number_of_beds, minprice: this.state.min_price, maxprice: this.state.maxprice, city_id: this.state.city_id});
        this.setState({
            apartments,
            loading: false,
        });
        await getAllCitiesWithApartments(this.setCities)
        if (!this.state.apartments_length) {
            const apartments = await getApartments(0, 0, -1, 99999999999, 0, 9999);
            const apartments_length = apartments.length
            this.setState({ apartments_length })
        }
    }
    handleClick = async (e, pageNum) => {
        e.preventDefault();
        const {number_of_rooms, number_of_beds, min_price, max_price, city_id} = this.state
        console.log("pageNum: ", pageNum)
        const apartments = await getApartments(number_of_rooms, number_of_beds, min_price, max_price, city_id, 12, pageNum)
        this.setState({apartments})
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }
    handleMoveRight = (e) => {
        e.preventDefault();
        if (this.state.third_number * 12 < this.state.apartments_length) {
            const { first_number, second_number, third_number } = this.state;
            this.setState({
                first_number: first_number + 1,
                second_number: second_number + 1,
                third_number: third_number + 1
            });
        }
    }
    handleMoveLeft = (e) => {
        e.preventDefault();
        if (this.state.first_number !== 1) {
            const { first_number, second_number, third_number } = this.state;
            this.setState({
                first_number: first_number - 1,
                second_number: second_number - 1,
                third_number: third_number - 1
            });
        }
    }
    setCities = (cities) => {
        console.log(cities)
        this.setState({ cities: cities.data})
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
        this.setState({isTrue3: false,
            isTrue2: false, isTrue1: false})
        console.log({rooms: this.state.number_of_rooms, beds: this.state.number_of_beds, minprice: this.state.min_price, maxprice: this.state.max_price});
        const apartments = await getApartments(this.state.number_of_rooms, this.state.number_of_beds, this.state.min_price, this.state.max_price, this.state.city_id);
        this.showApartments(apartments);
    }
    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
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
                <button  onClick={this.toggleSubMenu2} className={"btn btn-secondary dropdown-toggle ml-2"} >Baths</button>

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
                    <div><span className={"dollar"}>$</span><input type="text" className={"form-control"} name={"min_price"} placeholder={"Min Price"} onChange={this.handleInputChange}/></div>
                    <span className={"price-divider "}>-</span>
                    <div><span className={"dollar"}>$</span><input type="text" className={"form-control"} name={"max_price"} placeholder={"Max Price"} onChange={this.handleInputChange}/></div>
                </div>
            </div>}
        </div>
        
        const cities = [];
        for (let city in this.state.cities){
            cities.push(this.state.cities[city]);
        }
        return (
            <div>
                <div id={"filters"} className={"mb-2 mt-2"}>
                <div class="form-group col-md-4">
                                <select name="city_id" onClick={(e) => this.handleChange(e)} id="inputState" class="form-control">
                                    <option value="0" selected>City...</option>
                                    {cities.map((city, i) => {
                                        return (
                                            <option key={i} value={city.id}>{city.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                    {rooms_fltr}
                    {beds_fltr}
                    {price_fltr}
                    <div className="ml-2">
                        <button className="btn btn-secondary btn-outline-black" onClick={this.searchApartments}>SEARCH</button>
                    </div>
                </div>
                <h2 style={{fontSize: "20px"}}><b className={"ml-2 mt-3"}>New York, NY Real Estate & Homes for Sale</b></h2>
                <h4 className={"ml-2 mt-2"}>{this.state.apartments.length}</h4>
                <div className={"gallery row "}>
                    {this.state.apartments.map((item, i) => <Grig {...item} key={i}/>)}
                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center mb-2">
                        <li class="page-item">
                            <a class="page-link" onClick={e => this.handleMoveLeft(e)} href="#">Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" value={this.state.first_number} onClick={e => this.handleClick(e, this.state.first_number)}  href="#">{this.state.first_number}</a></li>
                        <li class="page-item"><a class="page-link" value={this.state.second_number} onClick={e => this.handleClick(e, this.state.second_number)}  href="#">{this.state.second_number}</a></li>
                        <li class="page-item"><a class="page-link" value={this.state.third_number} onClick={e => this.handleClick(e, this.state.third_number)}  href="#">{this.state.third_number}</a></li>
                        <li class="page-item">
                            <a class="page-link" onClick={e => this.handleMoveRight(e)} href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Gallery;
