import React from "react";
import "./footer.css"
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='justify-content-center d-flex data'>
        <div className='_1info' style={{ flex: '6' }}>
          <h1 className='h'>About us</h1>
          <p className='pra'>
            An e-commerce website is one that allows people to buy and sell
            physical goods, services, and digital products over the internet
            rather than at a brick-and-mortar location. Through an e-commerce
            website, a business can process orders, accept payments, manage
            shipping and logistics, and provide customer service.
          </p>
        </div>
        <div className='_2contact' style={{ flex: '3' }}>
          <h1 className='h'>Contact Us</h1>
          <ul className="edit-v">
            <li>
                +91 0102030405
            </li>
            <li>
                demo1@gmail.com
            </li>
          </ul>
          <div className='justify-content-center d-flex'>
            <Link to=''>
              <i
                className=' col fab fa-facebook-f'
                style={{ padding: '30px', color: 'black' }}
              ></i>
            </Link>
            <Link to=''>
              <i
                className=' col fab fa-instagram'
                style={{ padding: '30px', color: 'black' }}
              ></i>
            </Link>
            <Link to=''>
              <i
                className=' col fab fa-linkedin-in'
                style={{ padding: '30px', color: 'black' }}
              ></i>
            </Link>
            <Link to=''>
              <i
                className=' col fab fa-youtube'
                style={{ padding: '30px', color: 'black' }}
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
