import React from "react";
import {Link} from "react-router-dom";

class Grid extends React.Component {
    render() {
        const {type, label, number_of_bath,address, country, number_of_room,for_rent, for_sale, sqft, price, image, main_image, name} = this.props;

        const num_bath_or_description = number_of_bath && "baths: " + number_of_bath ;
        const apartment_price = price && "$" + Math.floor(price);
        const num_of_rooms = number_of_room && "rooms: " + number_of_room;
        const heart_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" aria-labelledby="Save Listing"
                                width="40" height="40" tabIndex="-1" className="jsx-2877931502 ">

            <path fill="rgba(0,0,0,0.4)" stroke="#fff" strokeWidth="3"
                  d="M20 8.3c4.9-8 18.5-5.9 18.5 5l-.1 1.9c-.8 4.6-4 9.3-8.9 14a66.6 66.6 0 0 1-8.7 7l-.7.6-.8-.5a27.6 27.6 0 0 1-2.8-1.7c-2-1.4-4-3-6-4.7-5.6-5-9-10.3-9-15.8A10 10 0 0 1 20 8.3z"
                  className="jsx-2877931502"></path>
        </svg>;

        return (
            <div className={"city-grid box col-xl-3 col-lg-4 col-md-6 col-sm-12"}
                 id={type === "cities" ? "city" + this.props.id : "apartment" + this.props.id}>
                <Link to={`/apartment/${this.props.id}`}>
                    <div className={"city-content card"}>
                        <img src={type === "cities" ? "" + image : "" + main_image} alt=""/>
                        {<div className={"d-flex"}>
                            <p className={type === "cities" ? "city-description" : "num_of_baths ml-2"}>{num_bath_or_description}</p>
                            <p className={"rooms ml-2"}>{num_of_rooms}</p>
                            <p className={"ml-2"}>{sqft && (sqft +  " sqft")}</p>
                        </div>}
                        {<p className={"apartment-price"}>{apartment_price}</p>}
                        {<p className={"upload-time"}>{this.props.description}</p>}{/*{Math.floor(Math.random() * Math.floor(10))}*/}
                        {<p className={for_rent ? "rent-status" : "rent-status rent-status-b"}>{for_rent ? "for rent" : "for sale"}</p>}
                        {<p className={"country"}>{country && country}</p>}
                        {<div  className={"d-flex ml-2"}>
                            {<p className={'city-name'}>{`city: ${name}` }</p>}
                            {<p className={"apartment-address"}>{`address: ${address}`}</p>}    
                        </div>}
                        {<span className={"heart"}> {heart_icon} </span>}
                    </div>

                </Link>
            </div>
        )
    }
}

export default Grid;
