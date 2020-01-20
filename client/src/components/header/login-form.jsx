import React from "react";
import "./header.css";
import { Redirect } from 'react-router'
import {loginUser} from '../app-data/apartments-server'
import Cookies from 'js-cookie'

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '',
            redirect : false 
            // form_style: true
        }
    }
    // componentDidMount() {
    //    let cookieUser = Cookies.get('name')
    //     this.setState({
    //         cookieUser    
    //     }) 
    // }
    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, console.log(name , this.state[name]))
    }
    sendUser = (e) => {
        e.preventDefault()
        console.log(this.state.email ,this.state.password);
        // this.setState({
        //     form_style: false
        // })
        loginUser(this.state.email, this.state.password, this.changeState)
        // .then(result => this.setState({}))
        
    }
    changeState = () => {
        this.setState({
            redirect: !this.state.redirect
        })
    }
    renderRedirect = () => {
        if (this.state.redirect && JSON.parse(Cookies.get('user')).role_id == 2) {
           console.log('state ', this.state.form_style);
           this.setState({
               redirect: false
           })
          return <Redirect to='/profile' />
        }else if (this.state.redirect && JSON.parse(Cookies.get('user')).role_id == 1) {
            console.log('JSON', JSON.parse(Cookies.get('user')))
            console.log('state ', this.state.form_style);
             console.log('I was here 2');
             this.setState({
                redirect: false
            })
           return <Redirect to='/admin' />
        }
    }
   
    render() {
        const changeStatus = this.props.changeUserState;
        return (
            
            <form id={"login"} style={{display: this.props.isOpenForm && 
            (window.location.href !== "http://localhost:3000/profile" && window.location.href !== "http://localhost:3000/admin") ? 'flex' : 'none'} } >
               <div className={"left-side"}>
                   <div className={"padding-form"}>
                        {this.renderRedirect()}
                       <h4>Log in to your account</h4>
                       <p>Access all your saved properties, searches, notes and more.</p>
                       <input type="text" name="email" placeholder={"Email Address"} value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                       <input type="text" name="password" placeholder={"Password"} value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                       <div className={"d-flex justify-content-end"}>
                           <a href="" id={"forgot-password"}>Forgot Password?</a>
                       </div>
                       <div className={"d-flex mt-3 mb-4"}>
                           <button onClick={(e) => {this.sendUser(e); changeStatus()}} id={"simple-login"}>Log In</button>
                           <a href="" id={"no-account"} className={"ml-3"}>No account? Sign Up</a>
                       </div>
                       <button className={"login-form-button facebook-button"}>Log In with Facebook</button>
                       <button className={"login-form-button google-button"}><img src="./images/google-logo.jpg" alt=""/>Log In with Google</button>
                   </div>
               </div>
               <div className={"right-side"}>
                   <div className={"padding-form"}>
                       <span id={"close-me"} onClick={this.props.changeFormStatus}>x</span>
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

export default LoginForm;
