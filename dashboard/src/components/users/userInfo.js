import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { 
  getUserById,
  changeUserToAdmin,
} from "../../Redux/Actions/userActions";
import {useParams, useHistory} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { removeUser } from '../../Redux/Actions/userActions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const img_d="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgrVHficIg-Bp9ZAjSbY7oDKn_oC3Ni7K_qy6B4rnS0Ou7BYlq-chHZoEgtNpnFMzNcM&usqp=CAU"

const UserInfo = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const {id} = useParams();

  const userData = useSelector((state) => state.userDetail);
  const { loading, error, users } = userData;

  const userAdmin = useSelector((state) => state.userAdmin);
  const { loading: loadingAdmin , success: successAdmin } = userAdmin;

  const userRemove = useSelector((state) => state.userRemove);
  const { loading: loadingRemove, success: successRemove } = userRemove;
   
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id, successAdmin]);

  const setAdminHandler= (id)=>{
    dispatch(changeUserToAdmin(id));
  }

  const removeUserHandler = (id) => {
    dispatch(removeUser(id));
    history.push(`/users`);
  }

  return (
    <>
      {
        loading 
        ? (
          <Loading />
        )
        : (
          error
          ? (
            <Message variant="alert-danger">{error}</Message>
          )
          : (
            
            <div
              className="card mb-4 author-card-cover"
              style={{ marginBottom: "50px" }}
            >
            <div style={{ textAlign: "center" }}>
              <h1 style={{color:"white",marginTop:"30px"}}>User Information</h1>
            </div>
            <div className="userInforavtar    form" style={{ marginBottom: "50px" , height:"100vh"}}>
              <div className="userinfologo " style={{ textAlign: "center" }}>
                {" "}
                <img src={users.image ? users.image : img_d} className="user_img" alt={"User Image"} />
              </div>
              <div className="userInfo ">
                <input
                  type="text"
                  value={users.name}
                  disabled
                  className="data  input "
                />
                <input
                  type="text"
                  value={users.email}
                  disabled
                  className="data input"
                />
                <input
                  type="text"
                  value={users.verified ? "Verified" : "Not Verified"}
                  disabled
                  className="data  input"
                />
                <input
                  type="text"
                  value={users.isAdmin ? "Admin" :"User"}
                  disabled
                  className="data  input"
                />
                <Popup trigger={!users.isAdmin ? <button style={{ width: "100%" }} className="data button">
                change to admin
                </button> : <></>} 
                modal>
                  {close => (
                    <div className="popupModal">
                    <button className="popupClose" onClick={close}>
                      &times;
                    </button>
                    <div className="popupHeader"> Alert! </div>
                    <div className="popupContent">
                      {' '}
                      Are you sure you want to change this user to admin?
                  </div>
                  <div className="popupActions">
                    <button
                      className="popupButton"
                      onClick={() => {
                        console.log('modal closed ');
                        close();
                      }}
                    >
                      NO
                    </button>
                    <button className="popupButton" onClick={()=>{setAdminHandler(id)}}>YES</button>
                  </div>
                    
                    </div>
                  )}
                </Popup>
                <Popup trigger={<button style={{ width: "100%" }} className="data removeButton">
                  Remove User
                </button>} 
                modal>
                  {close => (
                    <div className="popupModal">
                    <button className="popupClose" onClick={close}>
                      &times;
                    </button>
                    <div className="popupHeader"> Alert! </div>
                    <div className="popupContent">
                      {' '}
                      Are you sure you want to change this user to admin?
                  </div>
                  <div className="popupActions">
                    <button
                      className="popupButton"
                      onClick={() => {
                        console.log('modal closed ');
                        close();
                      }}
                    >
                      NO
                    </button>
                    <button className="popupButton" onClick={()=>{removeUserHandler(id)}}>YES</button>
                  </div>
                    
                    </div>
                  )}
                </Popup>
                {/* {!users.isAdmin ? <button style={{ width: "100%" }} onClick={()=>{setAdminHandler(id)}} className="data button">
                change to admin
                </button> : <></>} */}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              {" "}
              
            </div>
          </div>
          )
        ) 
      }
      
    </>
  );
}

export default UserInfo
