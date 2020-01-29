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
            redirect : false,
            invalidUser: false,
            changeStatus: false
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
        })
    }
    sendUser = async (e) => {
        e.preventDefault()
        const user = await loginUser(this.state.email, this.state.password)
        if (user){
            this.changeState()
            this.setState({changeStatus: true})
        } else (
            this.setState({invalidUser: true})
        )
        // .then(result => this.setState({}))
        
    }
    changeState = () => {
        this.setState({
            redirect: !this.state.redirect
        })
    }
    renderRedirect = () => {
        if (this.state.redirect && JSON.parse(Cookies.get('user')).role_id === 2) {
           this.setState({
               redirect: false
           })
          return <Redirect to='/profile' />
        }else if (this.state.redirect && JSON.parse(Cookies.get('user')).role_id === 1) {
             this.setState({
                redirect: false
            })
           return <Redirect to='/admin' />
        }
    }
   
    render() {
        if(this.state.changeStatus){
            const changeStatus = this.props.changeUserState;
            changeStatus()
        }
        
        return (
            
            <form id={"login"} className="text-center" style={{display: this.props.isOpenForm && 
            (window.location.href !== "http://localhost:3000/profile" && window.location.href !== "http://localhost:3000/admin") ? 'flex' : 'none'} } >
               <div className={"right-side"}>
                   <div className={"padding-form"}>
                        {this.renderRedirect()}
                       <h4>Log in to your account</h4>
                       <p>Access all your saved properties, searches, notes and more.</p>
                       <input type="text" name="email" placeholder={"Email Address"} value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                       <input type="text" name="password" placeholder={"Password"} value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                       {this.state.invalidUser && <h1>Invalid email or password</h1>}
                       <div className={"mt-3 mb-4 ml-auto mr-auto"}>
                           <button onClick={(e) => {this.sendUser(e)}} id={"simple-login"}>Log In</button>
                       </div>
                       <span id={"close-me"} onClick={this.props.changeFormStatus}>x</span>
                   </div>
                   <div className={"padding-form"}>
                       <img src={"./images/house_login_web.jpg"} alt=""/>
                   </div>
               </div>
            </form>
        )
    }
}

export default LoginForm;
