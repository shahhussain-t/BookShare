import React from 'react';
import contactImage from '../images/contact.jpg';
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi";
import { IoAtOutline } from "react-icons/io5";


function Contact() {
  
  return (
    <>
      <div className="container">
        <div className="contactContainer">
          <div className="imgTopBox"></div>  
          <div className="imgContainer">
            <div className="v-line"></div>            
            <div className="h-line">
            <div className="contactLeftDiv" style={{ padding: '5px 0px 0px 3px' }}>
              <img src={contactImage} alt="" />
            </div>
            </div>
            
          </div>
          
          <div className="contactRightDiv">
            <IoAtOutline /> John.doe@gmail.com<br />
            <HiOutlinePhone /> +91-8278889123<br />
            <IoHomeOutline /> RZ 26/14A, Tughlakabad Extension, Kalkaji, South Delhi, Delhi - 110019<br /><br />
            <div className="h-grey-line"></div><br />
            <div className="contactName" > John Doe</div><br />
            <div className="contactNameBg"> @john_doe</div><br />
            <div className="contactEdit"><button className="contactBtn text-white font-bold py-1 px-4">Edit</button></div>
          </div>
        </div>
        

      </div>
      
    </>
  )
}

export default Contact
