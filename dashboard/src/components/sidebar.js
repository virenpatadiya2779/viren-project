import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect } from "react";

const Sidebar = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  console.log("hello");
  console.log(userInfo)
  useEffect(() => {

  }, [userInfo]);
  return (
    <div>
      <aside className='navbar-aside' id='offcanvas_aside'>
        <div className='aside-top '>
          <Link to='/' className='brand-wrap'>
            <img
              src='/images/logo.png'
              style={{ height: '46' }}
              className='logo'
              alt='Ecommerce dashboard template'
            />
          </Link>
          <h2
            className='brand-wrap'
            style={{ postion: 'relative', left: '-10px' }}
          >
            Admin
          </h2>
          <div>
            <button className='btn btn-icon btn-aside-minimize'>
              <i className='text-muted fas fa-stream'></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className='menu-aside'>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li> */}
            <li className='menu-item'>
              <NavLink
                activeClassName='active'
                className='menu-link'
                to='/products'
              >
                <i className='icon fas fa-shopping-bag'></i>
                <span className='text'>Products</span>
              </NavLink>
            </li>
            <li className='menu-item '>
              <NavLink
                activeClassName='active'
                className='menu-link '
                to='/addproduct'
              >
                <i className='icon fas fa-cart-plus add-produc'></i>
                <span className='text'>Add product</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/category"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Categories</span>
              </NavLink>
            </li> */}
            <li className='menu-item'>
              <NavLink
                activeClassName='active'
                className='menu-link'
                to='/orders'
              >
                <i className='icon fas fa-bags-shopping'></i>
                <span className='text'>Orders</span>
              </NavLink>
            </li>
            <li className='menu-item'>
              <NavLink
                activeClassName='active'
                className='menu-link'
                to='/users'
              >
                <i className='icon fas fa-user'></i>
                <span className='text'>Users</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link disabled"
                to="/sellers"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Sellers</span>
              </NavLink>
            </li> */}

            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link disabled"
                to="/transaction"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Transactions</span>
              </NavLink>
            </li> */}
            {userInfo.isSuperAdmin ? (
              <li className='menu-item'>
                <NavLink
                  activeClassName='active'
                  className='menu-link'
                  to='/Admin'
                >
                  <i className='icon fas fa-user '></i>
                  <span className='text'>Admin</span>
                </NavLink>
              </li>
            ) : (
              <></>
            )}

          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
