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
        if (this.state.isOpenForm && JSON.parse(Cookies.get('user'))) {
            this.setState({
                user: JSON.parse(Cookies.get('user'))
            })
        }
    }
    redirectToUser = () => {
        console.log('redirect')
        return <Redirect to='/profile' />
    }
    redirectToHomePage = () => {
        console.log('redirect to homepage ')
        return <Redirect to='/' />
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
                    {this.state.user ? <li onClick={this.changeSignUpStatus} className={"navigation-li"}><h4 className={"li-title"}>
                        Log Out
                    </h4></li>

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
