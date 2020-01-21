import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { getApartmentsByUserId, addApartment } from '../app-data/apartments-server';
import Grig from "../gallery/grid";


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: [],
            city_id: null,
            address: null,
            price: null,
            rooms: null,
            baths: null,
            sqft: null,
            sale_status: null,
            available: "available",
            property_type: null,
            main_image: null
        }
    }
    // componentDidMount(){
    //     this.state({
    //         user: 
    //     })
    // }
    async componentDidMount() {
        if (Cookies.get('user')) {
            const apartments = await getApartmentsByUserId(JSON.parse(Cookies.get('user')).id);
            this.setState({
                apartments
            });
        }
    }
    cleanCookie = () => {
        console.log('clean cookie')
        Cookies.remove('user');
    }
    addApartment = (e) => {
        e.preventDefault()
        const {main_image, user_id, city_id, address, price, rooms, baths, sqft, sale_status, available, property_type} = this.state
        const formData = new FormData();
        const singleApartment = {
            user_id : JSON.parse(Cookies.get('user')).id,
            city_id,
            address,
            price,
            rooms,
            baths,
            sqft,
            sale_status,
            available, 
            property_type, 
            main_image,
            status: "pending"
        }
        console.log("singleApartment: ", singleApartment)
        for (let prop in singleApartment) {
            if (prop === 'main_image'){
                formData.append(prop, document.querySelector(".main_image").files[0])
            } else {
                formData.append(prop, singleApartment[prop])
            }
        }
        addApartment(formData)
    }
    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, console.log(name , this.state[name]))
    }
    onFileChange = (e) => {
        console.log(e)
        console.log(e.target.files[0])
        this.setState({
            main_image: e.target.files[0]
        })        
    }
    render() {
        console.log('blabla', this.props.sale_status)
        return (
            <div>
                <div className="m-4">
                    <h1>{`Hello ${JSON.parse(Cookies.get('user')).first_name} ${JSON.parse(Cookies.get('user')).last_name}. Let's build a new page ;)`}</h1>
                </div>
                <div className={"container mt-4"}>
                    <div className={" row"}>
                        {
                            this.state.apartments.map((item, i) => <Grig {...item} key={i} />)
                        }
                    </div>
                </div>
                <div id={'user-form'}>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">City</label>
                                <input type="text" class="form-control" id="inputCity" placeholder="City" name="city_id" value={this.state.city_id} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Address" name="address" value={this.state.address} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="inputZip">Rooms</label>
                                <input type="text" class="form-control" id="inputZip" name="rooms" value={this.state.rooms} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip">Baths</label>
                                <input type="text" class="form-control" id="inputZip1" name="baths" value={this.state.baths} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip">Sqft</label>
                                <input type="text" class="form-control" id="inputZip3" name="sqft" value={this.state.sqft} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip">Price</label>
                                <input type="text" class="form-control" id="inputZip4" name="price" value={this.state.price}  onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState">Sale Status</label>
                                <select name="sale_status" onClick={(e) => this.handleChange(e)} id="inputState" class="form-control">
                                    <option selected>Sale Status...</option>
                                    <option value="sale" >For Sale</option>
                                    <option value="rent" >For Rent</option>
                                    <option value="both" >Both</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="inputState">Property Type</label>
                                <select name="property_type" onClick={(e) => this.handleChange(e)} id="inputState" class="form-control">
                                    <option selected>Property Type...</option>
                                    <option value="condo">Condo</option>
                                    <option value="house">House</option>
                                    <option value="ranch">Ranch</option>
                                    <option value="land">Land</option>
                                </select>
                            </div>
                            <div class="form-group mt-1 ml-4">
                                <label for="exampleFormControlFile1">Apartment's image</label>
                                <input type="file" class="main_image form-control-file" id="exampleFormControlFile1" onChange={(e) => this.onFileChange(e)}/>
                            </div>
                        </div>
                        
                        
                        <button type="submit" class="btn btn-primary" onClick={(e) => this.addApartment(e)}>Post apartment</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default User;