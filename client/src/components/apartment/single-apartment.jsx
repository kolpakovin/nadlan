import React from "react";
import "./apartment.css";
import {Carousel} from "react-bootstrap";
import {getApartments, getApartment} from "../app-data/apartments-server";
import SingleAppLoader from "./single-app-loader";


class Apartment extends React.Component {
    constructor(props) {
        super(props);

        const apartmentId = this.props.match.params.id;
        // const apartmentImage = this.props.match.params.main_image;

        this.state = {
            apartment: [],
            loading: true,
            apartmentsArray: [],
            apartmentId: apartmentId,
            sideMenu: false,
            images: ["http://localhost:4000/images/apartment-loader.jpg","http://localhost:4000/images/apartment-loader.jpg","http://localhost:4000/images/apartment-loader.jpg", "http://localhost:4000/images/apartment-loader.jpg"]
        }
    }

    componentDidMount() {
        getApartment(this.props.match.params.id,this.showApartments)
        
    }
    showApartments = (data) => {
        console.log(data.apartment[0], 'bbbbb')
        this.setState({    
            apartment: data.apartment[0],
            loading: false
        },  () => this.showImages())
    }
    showImages = () => {
        if(!this.state.apartment.images){
            this.setState({
                images: [this.state.apartment.main_image, this.state.apartment.main_image, this.state.apartment.main_image,this.state.apartment.main_image]
            })
        } else {
            if(this.state.apartment.images.split(',').length < 3){
                let images = this.state.apartment.images.split(',')
                images.forEach(image => images.push(image))
                console.log(images)
                this.setState({images})
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
    
    render() {
        const {apartment, loading} = this.state;
        console.log(this.props.match.params.id, 'asdsa')
        
        return (
            loading ? <SingleAppLoader/> :
            <div>

                
                <div className={"position-relative"}>
                    <i id={"side-menu-button"} onClick={this.showSideMenu} className="fas fa-address-card"></i>
                </div>
                {
                    this.state.images !== []
                            &&

                <Carousel className="mt-3">

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={this.state.images[0].includes("http") ? this.state.images[0] : "http://localhost:4000/"+this.state.images[0]}
                            alt="First slide"
                        />
                        <div>

                        </div>
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={this.state.images[1].includes("http") ? this.state.images[1] :"http://localhost:4000/"+this.state.images[1]}
                            alt="Third slide"
                        />

                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={this.state.images[2].includes("http") ? this.state.images[2] :"http://localhost:4000/"+this.state.images[2]}
                            alt="Third slide"
                        />

                        <Carousel.Caption>

                        </Carousel.Caption>

                    </Carousel.Item>


                </Carousel>
                }

                <div className={"d-flex position-relative description"}>
                    <p className={"upload-time-1 position-absolute"}>{apartment.description}</p>
                    <p className={"ml-2 rent-status-1 position-absolute"}>{"For " + apartment.sale_status}</p>

                </div>
                <div className={"apartment-details"}>
                    <p><b style={{fontSize: "22px"}}>${Math.floor(apartment.price)}</b></p>
                    <span>{(apartment.number_of_bath === 1) ? (apartment.number_of_bath + " baths") : (apartment.number_of_bath + " baths")}</span>
                    <span
                        className={"ml-4"}>{(apartment.number_of_room === 1) ? (apartment.number_of_room + " room") : (apartment.number_of_room + " rooms")}</span>
                    <span className={"ml-4"}>{apartment.sqft && (apartment.sqft + " sqft")}</span>

                    <p>Address: {(apartment.address)}</p>
                    <p>City: {(apartment.real_city_name)}</p>

                </div>


                        <div className={"google-map"}>
                            <iframe src={`https://maps.google.com/maps?q=${apartment.real_city_name.replace(" ", "")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    style={{border:"0"}}/>
                        </div>
                {/*<i className="fas fa-angle-right" style={{fontSize: "44px"}}></i>*/}



                <div id={"div-form"} className={this.state.sideMenu ? "active" : undefined}>
                    <div className={"text-center"} id={"phone-form"}>
                        <form action="">
                            More about this property
                            <div className={"d-table  mb-2 div-input"}><span className="input-group-addon">
                                <i className="far fa-user"/></span>
                                <input id={"user-name-input"} type="text" placeholder={"Your Name"}/></div>
                            <div className={"d-table  mb-2 div-input"}><span className="input-group-addon"><i
                                className="fas fa-envelope"/></span>
                                <input id={"user-name-input"} type="text" placeholder={"Email"}/></div>
                            <div className={"d-table  mb-2 div-input"}><span className="input-group-addon"><i
                                className="fas fa-phone-alt"/></span>
                                <input id={"user-name-input"} type="text" placeholder={"Phone"}/></div>
                            <div><textarea defaultValue={"I'm interested in"}  id="text-input-area" cols="20" rows="2"></textarea>
                            </div>
                            <div>
                                <button id={"form-button"} type="button">Email Agent</button>
                            </div>
                            <div className={"text-justify mt-2"} style={{fontSize: "13px"}}><span>By proceeding, you consent to receive calls and texts at the number you provided,
                                including marketing by autodialer and prerecorded and artificial voice, and email,
                                from realtor.com and others about your inquiry and other home-related matters,
                                but not as a condition of any purchase</span></div>

                        </form>

                    </div>
                </div>


            </div>
        )
    }
}

export default Apartment;
