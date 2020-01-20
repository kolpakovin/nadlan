import React from "react";


class Inner extends React.Component {
    render() {

        return (<ul className={"sub-nav-menu row "} >
            {

                this.props.innerMenu.map((innerNavItem) => {
                    return (<div> {innerNavItem.map((listItem, i) => {
                        return (
                            <li className={"mb-1"} key={i}>
                                <a href={listItem.href ? listItem.href : "javascript:void(0)"}>
                                 {listItem.title}
                                </a>
                            </li>
                        )
                    })}
                    </div>)
                })}
        </ul>)
    }
}

export default Inner;
