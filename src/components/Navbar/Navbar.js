import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark  bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={"/contact/list"}>
        <i className="fa fa-phone-flip text-success "></i>
         <span className='text-primary fw-bolder mx-2'>C0322G1</span>
{/* mx-2 tạo khoảng cách 2px từ phía 2 bên */}
        <span className=''>CONTACT</span>
        </Link>
        
      </div>
    </nav>
  )
}

export default Navbar;