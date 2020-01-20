import React from "react";
import "./header.css";
import { Redirect } from 'react-router'
import {registerUser} from '../app-data/apartments-server';

const crypto = require('crypto');


class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '', 
            password: '',
            phone: '',
            status: 'active'
        }
    };
    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, console.log(name , this.state[name]))
    }
    signUpUser = (e) => {
        e.preventDefault();
        const {first_name, last_name, email, password, phone, status} = this.state
        registerUser({first_name, last_name, email, password, phone, status});
    }
    render() {
        
        return (
            <form id={"login"} style={{display: this.props.isOpenSignUp ? 'flex' : 'none'} } >
               <div className={"left-side"}>
                   <div className={"padding-form"}>
                       <h4>Sign up new account</h4>
                       <p>Access all your saved properties, searches, notes and more.</p>
                       <input type="text" name="first_name"  placeholder="First Name" value={this.state.first_name} onChange={(e) => this.handleChange(e)}/>
                       <input type="text" name="last_name"  placeholder="Last Name" value={this.state.last_name} onChange={(e) => this.handleChange(e)}/>
                       <input type="text" name="email"  placeholder="Email Address" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                       <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                       <input type="text" name="phone"  placeholder="Phone Number" value={this.state.phone} onChange={(e) => this.handleChange(e)}/>
                       <div className={"d-flex justify-content-end"}>
                           <a href="" id={"forgot-password"}>Forgot Password?</a>
                       </div>
                       <div className={"d-flex mt-3 mb-4"}>
                           <button onClick={(e) => this.signUpUser(e)} id={"simple-login"}>Sign Up</button>
                           <a href="" id={"no-account"} className={"ml-3"}>No account? Sign Up</a>
                       </div>
                       <button className={"login-form-button facebook-button"}>Log In with Facebook</button>
                       <button className={"login-form-button google-button"}><img src="./images/google-logo.jpg" alt=""/>Log In with Google</button>
                   </div>
               </div>
               <div className={"right-side"}>
                   <div className={"padding-form"}>
                       <span id={"close-me"} onClick={this.props.changeSignUpStatus}>x</span>
                       <h4>Real estate professional?</h4>
                       <p>Manage your profile, leads, <br/> listings and more.</p>
                       <button>Pro Log In</button>
                       <div><a href="">No professional account? Sign Up here</a></div>
                       <img src={"./images/house_login_web.jpg"} alt=""/>
                   </div>
               </div>
            </form>
        )
    }
}

export default SignUp;
