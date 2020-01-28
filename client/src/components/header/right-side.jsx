import React from "react";
import IphoneInner from "./iphone-inner";
import LoginForm from "./login-form";
import SignUp from './signup';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';



 

class RightSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenu: false,
            isOpenForm: false,
            isOpenSignUp: false,
            user: null
        }
    }
    async componentDidMount() {
        if (Cookies.get('user') && this.state.user === null) {
            this.setState({
                user: JSON.parse(Cookies.get('user')),
                isOpenForm: false,
                isOpenSignUp: false
            });
        }
    }
    changeFormStatus = () => {
        this.setState({
            isOpenForm: !this.state.isOpenForm
        })
    }
    changeSignUpStatus = () => {
        this.setState({
            isOpenSignUp: !this.state.isOpenSignUp
        })
    }
    changeUserState = () => {
        if(Cookies.get('user')){
            setTimeout(() => this.setState({
                user: JSON.parse(Cookies.get('user'))
            }), 500);
        }
        console.log('user from state',this.state.user)
    }
    cleanCookie = () => {
        this.setState({
            user: null,
            isOpenForm: false
        })
        Cookies.remove('user')
    }
    render() {
        return (
            <div className={'h-100'}>
                <ul id={"right-ul"}>
                    {this.state.user ?

                        <li className={"navigation-li"}> <Link to={this.state.user.role_id === 1 ? '/admin' : '/profile'}><h4 className={"li-title"} data-tip data-for='user'>
                            {this.state.user.first_name} </h4></Link>  <ReactTooltip id='user' place="bottom" type="info" effect="float">Get To My Profile</ReactTooltip></li>

                        : <li onClick={this.changeFormStatus} className={"navigation-li"}><h4 className={"li-title"}>
                            Log In
    
                    </h4></li>}
                    {this.state.user ?  <li onClick={() => this.cleanCookie()} className={"navigation-li"}>
                    <Link to={`/`}><h4 className={"li-title"}>
                        Log Out
                    </h4></Link></li>

                        : <li onClick={this.changeSignUpStatus} className={"navigation-li"}><h4 className={"li-title"}>
                            Sign Up
                    </h4></li>}
                </ul>
                <LoginForm isOpenForm={this.state.isOpenForm} changeFormStatus={this.changeFormStatus} changeUserState={this.changeUserState} />
                <SignUp isOpenSignUp={this.state.isOpenSignUp} changeSignUpStatus={this.changeSignUpStatus} />

            </div>
        )
    }
}

export default RightSide;
