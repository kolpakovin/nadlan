import React, { Component } from 'react';
import Cookies from 'js-cookie';
import validate, { field } from '../app-data/validator';
import InputErrors from '../app-data/input-errors';
import { getApartmentsByUserId, addApartment, getCities, updateApartment, getApartment, deleteApartmentById } from '../app-data/apartments-server';
import Grig from "../gallery/grid";
const GifPlayer = require('react-gif-player');



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: [],
            available: "available",
            cities: [],
            apartment: null,
            editApartmentIsOpen: false,
            add_apartment: false,
            my_apartments: true,
            posted: false,
            address: field({ name: 'address', isRequired: true, minLength: 4 }),
            price: field({ name: 'price', isRequired: true }),
            number_of_room: field({ name: 'Number of rooms', isRequired: true }),
            number_of_bath: field({ name: 'Number of bath', isRequired: true }),
            image: field({ name: 'image', isRequired: true }),
            sale_status: field({ name: 'sale_status', isRequired: true }),
            property_type: field({ name: 'sale_status', isRequired: true }),
            sqft: field({ name: 'sqft', isRequired: true, minLength: 2 }),
            description: field({ name: 'description', isRequired: true, minLength: 5 }),
            city_id: field({ name: 'city_id', isRequired: true, minLength: 2 }),
            images: field({ name: 'images', isRequired: true })
        };  this.inputChange = this.inputChange.bind(this);
            this.myDivToFocus = React.createRef()
    }
    async componentDidMount() {
        if (Cookies.get('user')) {
            const apartments = await getApartmentsByUserId(JSON.parse(Cookies.get('user')).id);
            this.setState({
                apartments
            });
        } await getCities(this.setCities)
    }
    inputChange({ target: { name, value, files } }) {
        const errors = validate(name, value, this.state[name].validations);
        if (files) {
            this.setState({
                [name]: {
                    ...this.state[name],
                    files,
                    errors
                }
            });
        } else {
            this.setState({
                [name]: {
                    ...this.state[name],
                    value,
                    errors
                }
            });
        }
    }
    cleanCookie = () => {
        Cookies.remove('user');
    }
    addApartment = (e) => {
        e.preventDefault()
        const { main_image, city_id, address, price, rooms, baths, sqft, sale_status, available, property_type, images } = this.state
        const formData = new FormData();
        const apartmentsToSend = []
        apartmentsToSend.push(main_image);
        apartmentsToSend.push(...images);
        apartmentsToSend.forEach(image => {
            formData.append('images', image)
        });
        const singleApartment = {
            user_id: JSON.parse(Cookies.get('user')).id,
            city_id,
            address,
            price,
            rooms,
            baths,
            sqft,
            sale_status,
            available,
            property_type,
            status: "pending"
        }
        for (let prop in singleApartment) {
            formData.append(prop, singleApartment[prop])
        }
        addApartment(formData);
        // addImages(apartmentid.id, this.state.images)
    }
    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    onFileChange = (e) => {
        this.setState({
            main_image: e.target.files[0]
        })
    }
    onImagesChange = (e) => {
        this.setState({ images: e.target.files })
    }
    setCities = (cities) => {
        this.setState({ cities: cities.data })
    }
    onPencilClick = async (e, apartmentId) => {
        e.preventDefault()
        await getApartment(apartmentId, this.consolefunction)
        if(this.myDivToFocus.current){
            this.myDivToFocus.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "nearest"
            })
        }
    }
    consolefunction = (data) => {
        const apartment = data.apartment[0]
        const address = { ...this.state.address, value: apartment.address };

        // this.state.address.value = apartment.address
        this.state.price.value = apartment.price
        this.state.number_of_room.value = apartment.number_of_room
        this.state.number_of_bath.value = apartment.number_of_bath
        this.state.sale_status.value = apartment.sale_status
        this.state.property_type.value = apartment.property_type
        this.state.sqft.value = apartment.sqft
        this.state.description.value = apartment.description
        this.state.city_id.value = apartment.city_id
        this.setState({
            apartment,
            editApartmentIsOpen: true, 
            address
        })
    }
    onSubmit = (e, type) => {
        e.preventDefault();
        const form_data = new FormData();
        let isOK = true;

        for (let prop in this.state) {
            let errors;
            const field = this.state[prop];
            if (prop instanceof Object) {
                errors = validate(prop, field.value, field.validations);
            } else {
                continue;
            }
            if (errors.length) {
                isOK = false;
                this.setState({
                    [prop]: {
                        ...this.state[prop],
                        errors
                    }
                });
            }
        }
        isOK = true;
        if (isOK) {
            const user_id = JSON.parse(Cookies.get('user')).id
            for (let prop in this.state) {
                if (this.state[prop] instanceof Object) {
                    if (prop === 'image') {
                        form_data.append('images', this.state.image.files[0])
                    }
                    if (prop === 'images') {
                        for (let i = 0; i < this.state.images.files.length; i++) {
                            form_data.append(prop, this.state.images.files[i])
                        }
                    }
                    else {
                        form_data.append(prop, this.state[prop].value)
                    }
                } else {
                    continue;
                }
            }
            if (Cookies.get('user')) {
                form_data.append("user_id", user_id)
            }
            form_data.append("availability", "available");
            form_data.append("status", "pending")
            if (type === "newApartment") {
                addApartment(form_data)
                this.setState({posted: true})
            } else if (type === "updateApartment") {
                form_data.append("apartmentId", this.state.apartment.id)
                updateApartment(this.state.apartment.id, form_data)
            }

        }
    }
    deleteApartment = (e, apartmentId) => {
        e.preventDefault()
        if(window.confirm('Are you sure you wish to delete this apartment?')){
            deleteApartmentById(apartmentId)
        }
    }
    handleMenu = (e, type) => {
        e.preventDefault()
        if(type === "my_apartments"){
            this.setState({
                editApartmentIsOpen: false,
                add_apartment: false,
                my_apartments: true,
            })
        } else if (type === "add_apartment"){
            this.setState({
                editApartmentIsOpen: false,
                add_apartment: true,
                my_apartments: false,
            })
        }
    }
    render() {
        const cities = [];
        for (let city in this.state.cities) {
            cities.push(this.state.cities[city]);
        }
        return (
            <div>
                <div style={{width: '23%'}} className="m-4 d-flex text-center align-items-center">
                    <h1 id="greeting">{`Hello ${JSON.parse(Cookies.get('user')).first_name} ${JSON.parse(Cookies.get('user')).last_name}. Enjoy evgenyrealestate`}</h1>
                    <GifPlayer gif="http://localhost:4000/images/hi.gif" id='hi' still="http://localhost:4000/images/hi.gif" />

                </div>
                <div className='row' id='user_row'>
                    <div className="bg-light border-right col-lg-2 col-md-12" id="sidebar-wrapper">
                        <div className="sidebar-heading list-group-item-action ">User Menu </div>
                        <div className="list-group list-group-flush">
                            <a href="/#" className="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'my_apartments')}>My Apartments</a>
                            <a href="/#" className="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'add_apartment')}>Add Apartment</a>
                            <a href="/apartments" className="list-group-item list-group-item-action bg-light">All Apartments</a>
                            <a href="/" className="list-group-item list-group-item-action bg-light">Homepage</a>
                        </div>
                    </div>
                    { this.state.add_apartment
                                &&
                        <div className='user-form col-10 '>
                            <form className="form-userpage">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputState">City</label>
                                        <select name={'city_id'} onChange={this.inputChange} id="inputState" className="form-control">
                                            <option selected>City...</option>
                                            {cities.map((city, i) => {
                                                return (
                                                    <option key={i} value={city.id}>{city.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="inputPassword4">Address</label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="Address" name="address" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.address.errors}></InputErrors>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label for="inputZip">Rooms</label>
                                        <input type="text" className="form-control" id="inputZip" name="number_of_room" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.number_of_room.errors}></InputErrors>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label for="inputZip">Baths</label>
                                        <input type="text" className="form-control" id="inputZip1" name="number_of_bath" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.number_of_bath.errors}></InputErrors>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label for="inputZip">Sqft</label>
                                        <input type="text" className="form-control" id="inputZip3" name="sqft" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.sqft.errors}></InputErrors>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label for="inputZip">Price</label>
                                        <input type="text" class="form-control" id="inputZip4" name="price" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.price.errors}></InputErrors>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label for="inputState1">Sale Status</label>
                                        <select name="sale_status" onChange={this.inputChange} id="inputState1" className="form-control">
                                            <option selected>Sale Status...</option>
                                            <option value="sale" >For Sale</option>
                                            <option value="rent" >For Rent</option>
                                            <option value="both" >Both</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label for="inputState2">Property Type</label>
                                        <select name="property_type" onChange={this.inputChange} id="inputState2" className="form-control">
                                            <option selected>Property Type...</option>
                                            <option value="condo">Condo</option>
                                            <option value="house">House</option>
                                            <option value="ranch">Ranch</option>
                                            <option value="land">Land</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-1 ml-4">
                                        <label for="exampleFormControlFile1">Apartment's main image</label>
                                        <input type="file" name="image" className="image form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile1" onChange={this.inputChange} />
                                        <InputErrors errors={this.state.image.errors}></InputErrors>
                                    </div>
                                    <div className="form-group mt-1 ml-4">
                                        <label for="exampleFormControlFile1">Apartment's images</label>
                                        <input type="file" name="images" className="images form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile2" onChange={this.inputChange} multiple />
                                        <InputErrors errors={this.state.images.errors}></InputErrors>
                                    </div>
                                </div>
                                <div className="form-group offset-lg-1 col-md-10">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' onChange={this.inputChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-secondary btn-primary" onClick={(e) => this.onSubmit(e, "newApartment")}>Post apartment</button>
                                { this.state.posted &&
                                    <label className={"ml-4"}>Admin will review your apartment as soon as possible. Thank you for your patience.</label>}            
                            </form>
                        </div>}
                    {
                        this.state.my_apartments
                                &&
                        <div className={"container col-10"}>
                            <div className={" row"}>
                                {
                                    this.state.apartments.map((item, i) => <Grig {...item} deleteApartment={this.deleteApartment} onPencilClick={this.onPencilClick} key={i} />)
                                }
                            </div>
                        </div>
                    }
                </div>

                {
                    this.state.editApartmentIsOpen
                    &&
                    <div className='user-form col-10' ref={this.myDivToFocus}>
                        <form className="form-userpage">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputState3">City</label>
                                    <select name={'city_id'} onChange={this.inputChange} id="inputState3" className="form-control">
                                        <option defaultValue>City...</option>
                                        {cities.map((city, i) => {
                                            return (
                                                <option key={i} value={city.id}>{city.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Address</label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="Address" value={this.state.address.value} name="address" onChange={this.inputChange} />
                                    <InputErrors errors={this.state.address.errors}></InputErrors>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Rooms</label>
                                    <input type="text" className="form-control" id="inputZip" name="number_of_room" value={this.state.number_of_room.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.number_of_room.errors}></InputErrors>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Baths</label>
                                    <input type="text" className="form-control" id="inputZip1" name="number_of_bath" value={this.state.number_of_bath.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.number_of_bath.errors}></InputErrors>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Sqft</label>
                                    <input type="text" className="form-control" id="inputZip3" name="sqft" value={this.state.sqft.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.sqft.errors}></InputErrors>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Price</label>
                                    <input type="text" className="form-control" id="inputZip4" name="price" value={this.state.price.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.price.errors}></InputErrors>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState4">Sale Status</label>
                                    <select name="sale_status" onChange={this.inputChange} id="inputState4" className="form-control">
                                        <option defaultValue>Sale Status...</option>
                                        <option value="sale" >For Sale</option>
                                        <option value="rent" >For Rent</option>
                                        <option value="both" >Both</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState5">Property Type</label>
                                    <select name="property_type" onChange={this.inputChange} id="inputState5" className="form-control">
                                        <option defaultValue>Property Type...</option>
                                        <option value="condo">Condo</option>
                                        <option value="house">House</option>
                                        <option value="ranch">Ranch</option>
                                        <option value="land">Land</option>
                                    </select>
                                </div>
                                <div className="form-group mt-1 ml-4">
                                    <label htmlFor="exampleFormControlFile1">Apartment's main image</label>
                                    <input type="file" name="image" className="image form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile1" onChange={this.inputChange} />
                                    <InputErrors errors={this.state.image.errors}></InputErrors>
                                </div>
                                <div className="form-group mt-1 ml-4">
                                    <label htmlFor="exampleFormControlFile1">Apartment's images</label>
                                    <input type="file" name="images" className="images form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile2" onChange={this.inputChange} multiple />
                                    <InputErrors errors={this.state.images.errors}></InputErrors>
                                </div>
                            </div>
                            <div className="form-group offset-lg-1 col-md-10">
                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' value={this.state.description.value} onChange={this.inputChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-secondary btn-primary" onClick={(e) => this.onSubmit(e, "updateApartment")}>Update apartment</button>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default User;