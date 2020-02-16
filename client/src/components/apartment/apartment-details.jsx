import React from 'react';
import GoogleMaps from "./google-maps";

class ApartmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContact: false
        }
    }
    showContact = (e) => {
        e.preventDefault();
        this.setState({ showContact: true });
    }
    render() {
        const { apartment, user } = this.props;
        return (
            <div className={'container-fluid details'}>
                <h2 className={'pt-3 pb-3'} style={{ fontWeight: 'bold' }}>$ {apartment.price} </h2>
                <div className={'row mr-5'}>
                    <div className={'col-md-6 col-sm-12'}>
                        <span>
                            <b>{apartment.number_of_bath}</b> bath <i className="fas fa-bath" />
                        </span>
                        <span>
                            <b>{apartment.number_of_room}</b> rooms <i className="fas fa-door-open" />
                        </span>
                        {apartment.sqft && <span><b>{apartment.sqft}</b> sqft </span>}
                        <span>
                            {apartment.address}
                        </span>
                        <span style={{ color: 'grey', textDecoration: 'underline' }}>{apartment.real_city_name}</span>
                        <span id="contact">
                            { this.state.showContact ? `Contact: ${user.first_name} Phone: ${user.phone}` : <a href="javascript:void(0)" onClick={(e) => this.showContact(e)}>Person To Contact</a>}
                        </span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <GoogleMaps getCityName={apartment.real_city_name} />
                </div>
            </div>
        )
    }
}

export default ApartmentDetails;