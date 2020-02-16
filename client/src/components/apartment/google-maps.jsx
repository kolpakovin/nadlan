import React from "react";


class GoogleMaps extends React.Component {
   render() {
      const{getCityName}=this.props
      return (
         <div className={'col-md-6 col-sm-12'}>
            <div id={"map-container-google-2"} className={"z-depth-1-half map-container apartment-map"}>
               <iframe src={`https://maps.google.com/maps?q=${getCityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                       style={{border:"0"}} title={'googleMaps'}/>
            </div>
         </div>
      );
   }
}

export default GoogleMaps;