import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const dispatch = useDispatch();
  const [productData,setproduct] = useState(true)
  const singleData ={};

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  let sarchProduct =products
  console.log(sarchProduct)

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;
  const [search , setSearch] = useState("");
  const searchDataHandler = (ed) => {
    let data = products.filter((data)=>(data.name).toLowerCase().includes(ed))
    if(data){
      setSearch(data);
    }else{
      setSearch("");
    }
  };
  useEffect(() => {
    dispatch(listProducts());
  }, [successDelete])

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                onChange={(e) => {
                  
                  return searchDataHandler(e.target.value);
           
                }}
              />
            </div>
            
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {search ?
                search.map((product) => (
                <Product product={product} key={product._id} />
              ))
              :
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
