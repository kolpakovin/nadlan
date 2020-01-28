import React from 'react';

import {Link} from 'react-router-dom';

class TopContent extends React.Component{
    render() {
        return(
            <div>
                <section id={"top-section"} className={"text-center"} >
                        <h2 className={"text-size-60 mb-4"}><b>The Home of Home Search</b></h2>
                        <h3 className={"mb-4 text-size-23"}>With the most complete source of homes for sale & real estate near you</h3>
                        <div className="inputhomepage">
                            <Link className="button" to="/apartments">
                                GET TO ALL APARTMENTS
                            </Link>
                        </div>
                </section>

            </div>
        )
    }
}

export default TopContent;
