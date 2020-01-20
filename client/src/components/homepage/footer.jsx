import React from "react";

class Footer extends React.Component{
    render() {
        return(
            <div id={"footer"}>
                <div className={"container"}>
                    <div>
                        <ul className={"d-flex padding-md list-style-none"}>
                            <li className={"li-icon mr-2"}><a href="https://www.facebook.com/"><div className={"div-icon"} id={"facebook"}><i className="fab fa-facebook-f"></i></div></a></li>
                            <li className={"li-icon mr-2"}><a href="https://www.twitter.com/"><div className={"div-icon"} id={"twitter"}><i className="fab fa-twitter"></i></div></a></li>
                            <li className={"li-icon mr-2"}><a href="https://il.linkedin.com/"><div className={"div-icon"} id={"linkedin"}><i className="fab fa-linkedin-in"></i></div></a></li>
                            <li className={"li-icon mr-2"}><a href="https://www.instagram.com/"><div className={"div-icon"} id={"instagram"}><i className="fab fa-instagram"></i></div></a></li>
                            <li className={"li-icon mr-2"}><a href="https://www.pinterest.com/"><div className={"div-icon"} id={"pinterest"}><i className="fab fa-pinterest"></i></div></a></li>
                            <li className={"li-icon mr-2"}><a href="https://www.youtube.com/"><div className={"div-icon"} id={"youtube"}><i className="fab fa-youtube"></i></div></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
