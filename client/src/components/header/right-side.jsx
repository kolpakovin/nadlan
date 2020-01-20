import React from "react";
import IphoneInner from "./iphone-inner";
import LoginForm from "./login-form";
import SignUp from './signup';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";




class RightSide extends React.Component {
    constructor() {
        super();
        this.state = {
            activeMenu: false,
            isOpenForm: false,
            isOpenSignUp: false,
            user: null
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
        console.log('user from state1',this.state.user)
        setTimeout(() => this.setState({
            user: JSON.parse(Cookies.get('user'))
        }), 500);

        // if (this.state.isOpenForm && JSON.parse(Cookies.get('user'))) {
        //     this.setState({
        //         user: JSON.parse(Cookies.get('user'))
        //     })
        // }
        console.log('user from state',this.state.user)
    }
    cleanCookie = () => {
        this.setState({
            user: null
        })
        Cookies.remove('user')
    }
    render() {
        return (
            <div className={'h-100'}>
                <ul id={"right-ul"}>
                    <li onMouseEnter={() => this.setState({ activeMenu: true })}
                        onMouseLeave={() => this.setState({ activeMenu: false })} className={"navigation-li"}
                        id={"iphone-icon"}><i className="fas fa-mobile li-title">
                            {this.state.activeMenu && <IphoneInner activeMenu={this.state.activeMenu} />}
                        </i></li>
                    {this.state.user ?

                        <li onClick={() => this.redirectToUser()} className={"navigation-li"}> <Link to={`/profile/`}><h4 className={"li-title"}>
                            {this.state.user.first_name} </h4></Link></li>

                        : <li onClick={this.changeFormStatus} className={"navigation-li"}><h4 className={"li-title"}>
                            Log In
    
                    </h4></li>}
                    {this.state.user ? <li onClick={() => this.cleanCookie()} className={"navigation-li"}>
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
