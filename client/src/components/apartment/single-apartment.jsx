import React from "react";
import "./apartment.css";
import { getApartment, getUser } from "../app-data/apartments-server";
import SingleAppLoader from "./single-app-loader";
import ApartmentDetails from "./apartment-details";


class Apartment extends React.Component {
    constructor(props) {
        super(props);

        const apartmentId = this.props.match.params.id;

        this.state = {
            apartment: [],
            loading: true,
            apartmentsArray: [],
            apartmentId: apartmentId,
            user: null,
            sideMenu: false,
            showContact: false,
            images: ["http://localhost:4000/images/apartment-loader.jpg", "http://localhost:4000/images/apartment-loader.jpg", "http://localhost:4000/images/apartment-loader.jpg", "http://localhost:4000/images/apartment-loader.jpg"]
        }
    }

    componentDidMount = async () => {
        getApartment(this.props.match.params.id, this.showApartments)

    }
    showApartments = (data) => {
        this.setState({
            apartment: data.apartment[0],
            loading: false
        }, () => this.showImages())
    }
    showImages = async () => {
        const user = await getUser(this.state.apartment.user_id)
        this.setState({ user: user[0] })
        if (!this.state.apartment.images) {
            this.setState({
                images: [this.state.apartment.main_image, this.state.apartment.main_image, this.state.apartment.main_image, this.state.apartment.main_image]
            })
        } else {
            if (this.state.apartment.images.split(',').length < 3) {
                let images = this.state.apartment.images.split(',')
                images.forEach(image => images.push(image))
                this.setState({ images })
            } else {
                this.setState({
                    images: this.state.apartment.images.split(',')
                })
            }
        }
    };
    showSideMenu = () => {
        this.setState({
            sideMenu: !this.state.sideMenu
        })
    }
    showContact = (e) => {
        e.preventDefault();
        this.setState({ showContact: true });
    }
    render() {
        const { apartment, images, loading, user } = this.state;
        return (
            <div>
                {/* <Header toggleModal={toggleModal} user={this.props.user} toggleUserMenu={toggleUserMenu} activeUserMenu={activeUserMenu} logOutUser={logOutUser} /> */}
                {loading ? <SingleAppLoader/> :
                    <div id="single-app">
                        <div className={'container-fluid'}>
                            <h4>{apartment.description} <i className="fas fa-medal" /></h4>
                        </div>

                        <div className={'row images m-0'} >
                            <div className={'col-sm-12 col-md-6 p-0 overflow-hidden'} style={{ height: '50vh' }}>
                                <img height={'100%!important'} src={`http://localhost:4000/${images[0]}`} alt={""} />
                            </div>
                            <div className={'col-sm-12 col-md-6 p-0'}>
                                <div className={'row m-0'}>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:4000/${images[1]}`} alt={""} /></div>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:4000/${images[2]}`} alt={""} /></div>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:4000/${images[3]}`} alt={""} /></div>
                                    <div className={'col-6 p-0 overflow-hidden'} style={{ height: '25vh' }}><img height={'100%'} width={'100%'} src={`http://localhost:4000/${images[4]}`} alt={""} /></div>
                                </div>
                            </div>
                        </div>
                        <ApartmentDetails apartment={{ ...apartment }} user={{ ...user}}/>
                    </div>
                }
            </div>
        )
    }
}

export default Apartment;
