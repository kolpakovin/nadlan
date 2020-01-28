import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import validate, { field } from '../app-data/validator';
import InputErrors from '../app-data/input-errors';
import { getApartmentsByUserId, addApartment, getCities, updateApartment, getApartment, deleteApartmentById } from '../app-data/apartments-server';
import Grig from "../gallery/grid";



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: [],
            // city_id: null,
            // address: null,
            // price: null,
            // rooms: null,
            // baths: null,
            // sqft: null,
            // sale_status: null,
            available: "available",
            // property_type: null,
            // main_image: null,
            // images: [],
            cities: [],
            apartment: null,
            editApartmentIsOpen: false,
            add_apartment: false,
            my_apartments: true,
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
        console.log('clean cookie')
        Cookies.remove('user');
    }
    addApartment = (e) => {
        e.preventDefault()
        const { main_image, user_id, city_id, address, price, rooms, baths, sqft, sale_status, available, property_type, images } = this.state
        const formData = new FormData();
        const apartmentsToSend = []
        apartmentsToSend.push(main_image);
        apartmentsToSend.push(...images);
        apartmentsToSend.forEach(image => {
            console.log("I WAS HERE BABY", image)
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
        console.log("singleApartment: ", singleApartment)
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
        }, console.log(name, this.state[name]))
    }
    onFileChange = (e) => {
        console.log(e)
        console.log(e.target.files[0])
        this.setState({
            main_image: e.target.files[0]
        })
    }
    onImagesChange = (e) => {
        this.setState({ images: e.target.files })
    }
    setCities = (cities) => {
        console.log(cities)
        this.setState({ cities: cities.data })
    }
    onPencilClick = async (e, apartmentId) => {
        e.preventDefault()
        console.log("Pencil")
        console.log(apartmentId)
        await getApartment(apartmentId, this.consolefunction)
        if(this.myDivToFocus.current){
            this.myDivToFocus.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "nearest"
            })
        }
    }
    consolefunction = (data) => {
        console.log("data: ", data.apartment[0])
        const apartment = data.apartment[0]
        console.log("this.state.address.value", this.state.address.value)
        console.log("this.state.address", this.state.address)
        this.state.address.value = apartment.address
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
            editApartmentIsOpen: true
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
            const result = {};
            for (let prop in this.state) {
                if (this.state[prop] instanceof Object) {
                    if (prop === 'image') {
                        console.log("image")
                        form_data.append('images', this.state.image.files[0])
                    }
                    if (prop === 'images') {
                        console.log("images")
                        console.log("doc", this.state.images.files)
                        for (let i = 0; i < this.state.images.files.length; i++) {
                            console.log("bla")
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
            } else if (type === "updateApartment") {
                form_data.append("apartmentId", this.state.apartment.id)
                updateApartment(this.state.apartment.id, form_data)
            }

        }
    }
    deleteApartment = (e, apartmentId) => {
        e.preventDefault()
        console.log("apar", apartmentId)
        if(window.confirm('Are you sure you wish to delete this apartment?')){
            deleteApartmentById(apartmentId)
        }
        
    }
    handleMenu = (e, type) => {
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
        console.log(cities)
        return (
            <div>
                <div className="m-4">
                    <h1 id="greeting">{`Hello ${JSON.parse(Cookies.get('user')).first_name} ${JSON.parse(Cookies.get('user')).last_name}. Let's build a new page ;)`}</h1>
                </div>
                <div className='row' id='user_row'>
                    <div class="bg-light border-right col-lg-2 col-md-12" id="sidebar-wrapper">
                        <div class="sidebar-heading list-group-item-action ">User Menu </div>
                        <div class="list-group list-group-flush">
                            <a href="#" class="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'my_apartments')}>My Apartments</a>
                            <a href="#" class="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'add_apartment')}>Add Apartment</a>
                            <a href="/apartments" class="list-group-item list-group-item-action bg-light">All Apartments</a>
                            <a href="/" class="list-group-item list-group-item-action bg-light">Homepage</a>
                            <a href="#" class="list-group-item list-group-item-action bg-light">Log Out</a>
                        </div>
                    </div>
                    { this.state.add_apartment
                                &&
                        <div className='user-form col-10 '>
                            <form class="form-userpage">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputState">City</label>
                                        <select name={'city_id'} onChange={this.inputChange} id="inputState" class="form-control">
                                            <option selected>City...</option>
                                            {cities.map((city, i) => {
                                                return (
                                                    <option key={i} value={city.id}>{city.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Address</label>
                                        <input type="text" class="form-control" id="inputAddress" placeholder="Address" name="address" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.address.errors}></InputErrors>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">Rooms</label>
                                        <input type="text" class="form-control" id="inputZip" name="number_of_room" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.number_of_room.errors}></InputErrors>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">Baths</label>
                                        <input type="text" class="form-control" id="inputZip1" name="number_of_bath" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.number_of_bath.errors}></InputErrors>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">Sqft</label>
                                        <input type="text" class="form-control" id="inputZip3" name="sqft" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.sqft.errors}></InputErrors>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">Price</label>
                                        <input type="text" class="form-control" id="inputZip4" name="price" onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.price.errors}></InputErrors>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputState">Sale Status</label>
                                        <select name="sale_status" onChange={this.inputChange} id="inputState" class="form-control">
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
                                        <select name="property_type" onChange={this.inputChange} id="inputState1" class="form-control">
                                            <option selected>Property Type...</option>
                                            <option value="condo">Condo</option>
                                            <option value="house">House</option>
                                            <option value="ranch">Ranch</option>
                                            <option value="land">Land</option>
                                        </select>
                                    </div>
                                    <div class="form-group mt-1 ml-4">
                                        <label for="exampleFormControlFile1">Apartment's main image</label>
                                        <input type="file" name="image" class="image form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile1" onChange={this.inputChange} />
                                        <InputErrors errors={this.state.image.errors}></InputErrors>
                                    </div>
                                    <div class="form-group mt-1 ml-4">
                                        <label for="exampleFormControlFile1">Apartment's images</label>
                                        <input type="file" name="images" class="images form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile2" onChange={this.inputChange} multiple />
                                        <InputErrors errors={this.state.images.errors}></InputErrors>
                                    </div>
                                </div>
                                <div className="form-group offset-lg-1 col-md-10">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' onChange={this.inputChange}></textarea>
                                </div>
                                <button type="submit" class="btn btn-secondary btn-primary" onClick={(e) => this.onSubmit(e, "newApartment")}>Post apartment</button>
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
                        <form class="form-userpage">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputState">City</label>
                                    <select name={'city_id'} onChange={this.inputChange} id="inputState" class="form-control">
                                        <option selected>City...</option>
                                        {cities.map((city, i) => {
                                            return (
                                                <option key={i} value={city.id}>{city.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Address</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Address" value={this.state.address.value} name="address" onChange={this.inputChange} />
                                    <InputErrors errors={this.state.address.errors}></InputErrors>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Rooms</label>
                                    <input type="text" class="form-control" id="inputZip" name="number_of_room" value={this.state.number_of_room.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.number_of_room.errors}></InputErrors>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Baths</label>
                                    <input type="text" class="form-control" id="inputZip1" name="number_of_bath" value={this.state.number_of_bath.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.number_of_bath.errors}></InputErrors>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Sqft</label>
                                    <input type="text" class="form-control" id="inputZip3" name="sqft" value={this.state.sqft.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.sqft.errors}></InputErrors>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Price</label>
                                    <input type="text" class="form-control" id="inputZip4" name="price" value={this.state.price.value} onChange={this.inputChange} />
                                    <InputErrors errors={this.state.price.errors}></InputErrors>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputState">Sale Status</label>
                                    <select name="sale_status" onChange={this.inputChange} id="inputState" class="form-control">
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
                                    <select name="property_type" onChange={this.inputChange} id="inputState1" class="form-control">
                                        <option selected>Property Type...</option>
                                        <option value="condo">Condo</option>
                                        <option value="house">House</option>
                                        <option value="ranch">Ranch</option>
                                        <option value="land">Land</option>
                                    </select>
                                </div>
                                <div class="form-group mt-1 ml-4">
                                    <label for="exampleFormControlFile1">Apartment's main image</label>
                                    <input type="file" name="image" class="image form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile1" onChange={this.inputChange} />
                                    <InputErrors errors={this.state.image.errors}></InputErrors>
                                </div>
                                <div class="form-group mt-1 ml-4">
                                    <label for="exampleFormControlFile1">Apartment's images</label>
                                    <input type="file" name="images" class="images form-control-file" accept="image/png, image/jpeg" id="exampleFormControlFile2" onChange={this.inputChange} multiple />
                                    <InputErrors errors={this.state.images.errors}></InputErrors>
                                </div>
                            </div>
                            <div className="form-group offset-lg-1 col-md-10">
                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' value={this.state.description.value} onChange={this.inputChange}></textarea>
                            </div>
                            <button type="submit" class="btn btn-secondary btn-primary" onClick={(e) => this.onSubmit(e, "updateApartment")}>Update apartment</button>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default User;