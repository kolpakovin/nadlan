import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { getApartmentsByUserId } from '../app-data/apartments-server';
import Grig from "../gallery/grid";



export const userpage = true;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: []
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
        return <Redirect to='/apartments' />
    }
    render() {
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
                                <input type="text" class="form-control" id="inputCity" placeholder="City" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Address" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="inputZip">Rooms</label>
                                <input type="text" class="form-control" id="inputZip" />
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip">Baths</label>
                                <input type="text" class="form-control" id="inputZip1" />
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip">Sqft</label>
                                <input type="text" class="form-control" id="inputZip3" />
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip">Price</label>
                                <input type="text" class="form-control" id="inputZip4" />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState">Sale Status</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Choose Sale Status...</option>
                                    <option>For Sale</option>
                                    <option>For Rent</option>
                                    <option>Boths</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="inputState">Property Type</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Property Type...</option>
                                    <option>Condo</option>
                                    <option>House</option>
                                    <option>Ranch</option>
                                    <option>Land</option>
                                </select>
                            </div>
                            <div class="form-group mt-1 ml-4">
                                <label for="exampleFormControlFile1">Apartment's image</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                            </div>
                        </div>
                        
                        
                        <button type="submit" class="btn btn-primary">Post apartment</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default User;