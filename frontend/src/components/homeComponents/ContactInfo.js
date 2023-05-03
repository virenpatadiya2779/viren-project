import React from "react";

const ContactInfo = () => {
  return (
    <div className='contactInfo container'>
      <div className='row'>
        <div className='col-12 col-md-4 contact-Box'>
          <div className='box-info'>
            <div className='info-image'>
              <i className='fas fa-phone-alt'></i>
            </div>
            <h5>Call Us 24x7</h5>
            <p>0102030405</p>
          </div>
        </div>
        <div className='col-12 col-md-4 contact-Box'>
          <div className='box-info'>
            <div className='info-image'>
              <i className='fas fa-map-marker-alt'></i>
            </div>
            <h5>Headquarter</h5>
            <p>
              Sola road , Ahmedabad , Gujarat  , India .
            </p>
          </div>
        </div>
        <div className='col-12 col-md-4 contact-Box'>
          <div className='box-info'>
            <div className='info-image'>
              <i className='fas fa-fax'></i>
            </div>
            <h5>Reviews</h5>
            <p>4 +</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
