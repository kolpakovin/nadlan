import React, { Component } from 'react';
import Grig from "../gallery/grid";
import { getApartments, getUsers, confirmApartment, deleteApartmentByUserId, deleteApartmentById } from "../app-data/apartments-server";
import { Table } from 'react-bootstrap';



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
                apartments: await getApartments(0, 0, -1, 99999999999, 0, 20, 1, 'approved')
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
        console.log("apar", apartmentId)
        if(window.confirm('Are you sure you wish to delete this apartment?')){
            deleteApartmentById(apartmentId)
        }
    }
    render() {
        return (
            <div className="row mt-2 mr-0 ml-0">
                <div class="bg-light border-right col-lg-2 col-md-12" id="sidebar-wrapper">
                    <div class="sidebar-heading list-group-item-action ">Admin Menu </div>
                    <div class="list-group list-group-flush">
                        <a href="#" class="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'apartments_to_confirm')}>Apartments To Confirm</a>
                        <a href="#" class="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'users')}>All Users</a>
                        <a href="/" class="list-group-item list-group-item-action bg-light" onClick={e => this.handleMenu(e, 'all_apartments')}>All Apartments</a>
                        <a href="#" class="list-group-item list-group-item-action bg-light">Log Out</a>
                    </div>
                </div>
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
                                                    <img className="delete-user" onClick={(e) => this.deleteUserById(e, user.id)} src="http://localhost:4000/images/delete-user-icon.png" />
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