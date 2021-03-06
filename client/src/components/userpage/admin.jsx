import React, { Component } from 'react';
import Grig from "../gallery/grid";
import { getApartments, getUsers, confirmApartment, deleteApartmentByUserId, deleteApartmentById } from "../app-data/apartments-server";
import { Table } from 'react-bootstrap';
import Cookies from 'js-cookie';
const GifPlayer = require('react-gif-player');




class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments_length: null,
            apartments: [],
            apartments_to_confirm: true,
            users: [],
            my_users: false
        }
    }
    async componentDidMount() {
        this.setState({
            apartments: await getApartments(0, 0, -1, 99999999999, 0, 20, 1, 'pending'),
            users: await getUsers()
        });
    }
    handleMenu = async (e, type) => {
        e.preventDefault();
        if (type === "apartments_to_confirm") {
            this.setState({
                apartments: await getApartments(0, 0, -1, 99999999999, 0, 20, 1, 'pending'),
                my_users: false,
                apartments_to_confirm: true, 
                all_apartments: false
            })
        } else if (type === "users") {
            this.setState({
                my_users: true,
                apartments_to_confirm: false,
                all_apartments: false
            })
        } else if (type === "all_apartments") {
            this.setState({
                apartments: await getApartments(0, 0, -1, 99999999999, 0, 99, 1, 'approved')
            }, this.setState({
                my_users: false,
                apartments_to_confirm: false,
                all_apartments: true
            }))
        }
    }
    confirmApartment = (e, apartmentId) => {
        e.preventDefault()
        if (window.confirm('Are you sure you wish to delete this apartment?')) {
            confirmApartment(apartmentId)
        }
    }
    deleteUserById = async (e, id) => {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this user?')) {
            await deleteApartmentByUserId(id)
            this.setState({
                apartments: await getApartments(0, 0, -1, 99999999999, 0, 21, 1, 'pending'),
                users: await getUsers()
            });
        }
    }
    deleteApartment = (e, apartmentId) => {
        e.preventDefault()
        if(window.confirm('Are you sure you wish to delete this apartment?')){
            deleteApartmentById(apartmentId)
        }
    }
    render() {
        return (
            
            <div className="row mt-2 mr-0 ml-0">
                { JSON.parse(Cookies.get('user')).role_id === 1 ?
                    <div className="bg-light border-right col-lg-2 col-md-12" id="sidebar-wrapper">
                    <div className="sidebar-heading list-group-item-action ">Admin Menu </div>
                    <div className="list-group list-group-flush">
                        <a href="/#" className="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'apartments_to_confirm')}>Apartments To Confirm</a>
                        <a href="/#" className="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'users')}>All Users</a>
                        <a href="/" className="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'all_apartments')}>All Apartments</a>
                    </div> 
                </div> : <div className="text-center w-75 mr-auto ml-auto"><GifPlayer style={{height: "400px"}} gif="http://localhost:4000/images/403.gif"  still="http://localhost:4000/images/403.gif" /></div>    }
                {
                    this.state.apartments_to_confirm
                            &&
                    <div className={"container col-10"}>
                        <div className={" row"}>
                            {
                                this.state.apartments.map((item, i) => <Grig {...item} deleteApartment={this.deleteApartment} confirmApartment={this.confirmApartment} key={i} />)
                            }
                        </div>
                    </div>
                }
                {
                    this.state.all_apartments
                            &&
                    <div className={"container col-10"}>
                        <div className={" row"}>
                            { 
                                this.state.apartments.map((item, i) => <Grig {...item} deleteApartment={this.deleteApartment} key={i} />)
                            }
                        </div>
                    </div>
                }
                {
                    this.state.my_users
                            &&
                    <div className={"container col-10"}>
                        <div className={" row"}>
                            {
                                <Table striped bordered hover className="w-75 mr-auto ml-auto">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.users.map((user, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{user.id}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <img className="delete-user" onClick={(e) => this.deleteUserById(e, user.id)} src="http://localhost:4000/images/delete-user-icon.png" alt="delete"/>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>

                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Admin;