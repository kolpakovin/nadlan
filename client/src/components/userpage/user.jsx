import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import {getApartmentsById} from '../app-data/apartments-server'


export const userpage = true;

class User extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         user: null
    //     }
    // }
    // componentDidMount(){
    //     this.state({
    //         user: 
    //     })
    // }
    cleanCookie = () => {
        console.log('clean cookie')
        Cookies.remove('user');
        return <Redirect to='/apartments' />
    }
    render() {
        // const mycookie = JSON.parse(Cookies.get('user'));
        // const {user} = this.state;
        // console.log('user', user)
        return (
            <div>    
                <div className="m-4">
                    <h1>{`Hello ${JSON.parse(Cookies.get('user')).first_name} ${JSON.parse(Cookies.get('user')).last_name}. Let's build a new page ;)`}</h1>    
                </div>
                <div id={'user-form'}>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputEmail4">City</label>
                            <input type="text" class="form-control" id="inputCity" placeholder="City"/>
                            </div>
                            <div class="form-group col-md-6">
                            <label for="inputPassword4">Address</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="Address"/>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputCity">Description</label>
                            <input type="text" class="form-control" id="inputCity" />
                            </div>
                            <div class="form-group col-md-4">
                            <label for="inputState">State</label>
                            <select id="inputState" class="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                            </div>
                            <div class="form-group col-md-2">
                            <label for="inputZip">Zip</label>
                            <input type="text" class="form-control" id="inputZip" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Apartment's image</label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Check me out
                            </label>
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