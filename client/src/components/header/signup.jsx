import React from "react";
import "./header.css";
import { Redirect } from 'react-router'
import {registerUser, checkEmail} from '../app-data/apartments-server';
import validate, { field } from '../app-data/validator';
import InputErrors from '../app-data/input-errors';


class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            status: 'active',
            containerClassName: '',
            email: field({ name: 'email', isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }),
            password: field({ name: 'password', isRequired: true, minLength: 5 }),
            phone: field({ name: 'phone', isRequired: true, minLength: 10 }),
            first_name: field({ name: 'first_name', isRequired: true, minLength: 2 }),
            last_name: field({ name: 'last_name', isRequired: true, minLength: 2 }),
            invalidEmail: false

        }; this.handleChange = this.handleChange.bind(this);
    };
    handleChange = ({ target: { name, value } }) => {
        const errors = validate(name, value, this.state[name].validations);
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                errors
            }
        });
    }
    signUpUser = async (e) => {
        e.preventDefault();
        const {status} = this.state
        const email = await checkEmail(this.state.email.value)
        console.log("email", email.data)
        if(!email.length){
            await registerUser({first_name: this.state.first_name.value, last_name: this.state.last_name.value, email:this.state.email.value, password: this.state.password.value, phone: this.state.phone.value, status});
        } else {
            this.setState({invalidEmail: true})
        }
    }
    render() {
        
        return (
            <form id={"signup"} style={{display: this.props.isOpenSignUp ? 'flex' : 'none'} } >
               <div className={"right-side"}>
                   <div className={"padding-form"}>
                       <h4>Sign up new account</h4>
                       <p>Access all your saved properties, searches, notes and more.</p>
                       <input type="text" name="first_name"  placeholder="First Name" onBlur={(e) => this.handleChange(e)} required />
                       <InputErrors errors={this.state.first_name.errors}></InputErrors>
                       <input type="text" name="last_name"  placeholder="Last Name" onBlur={(e) => this.handleChange(e)} required />
                       <InputErrors errors={this.state.last_name.errors}></InputErrors>
                       <input type="text" name="email"  placeholder="Email Address" onBlur={(e) => this.handleChange(e)} required />
                       <InputErrors errors={this.state.email.errors}></InputErrors>
                       {this.state.invalidEmail && <label htmlFor="">This email is already in use </label>   }
                       <input type="text" name="password" placeholder="Password" onBlur={(e) => this.handleChange(e)} required />
                       <InputErrors errors={this.state.password.errors}></InputErrors>
                       <input type="text" name="phone"  placeholder="Phone Number" onBlur={(e) => this.handleChange(e)} required />
                       <InputErrors errors={this.state.phone.errors}></InputErrors>
                       <div className={"mt-3 mb-4  text-center"}>
                           <button onClick={(e) => this.signUpUser(e)} id={"simple-login"}>Sign Up</button>
                       </div>
                       <span id={"close-me"} onClick={this.props.changeSignUpStatus}>x</span>
                       <img src={"./images/house_login_web.jpg"} alt=""/>
                   </div>
               </div>
            </form>
        )
    }
}

export default SignUp;
