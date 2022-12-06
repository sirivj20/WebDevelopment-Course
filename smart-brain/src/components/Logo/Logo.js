import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './Logo.png'


const Logo = () => {
    return(
           
        <Tilt >
            <div className='tiltComponent'>
                <img className="image" src= {brain} alt="logo" ></img>
            </div>
        </Tilt>
      
    );
    
}

 export default Logo;