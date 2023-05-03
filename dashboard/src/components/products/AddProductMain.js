import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import UploadWidget from "../UploadWidget";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState("");
  const [create, setCreate] = useState(0);

  const validating = useRef()
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      validating.current.classList.remove("was-validated")
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (create === 1) {
      if(image && price && description && countInStock) {
        dispatch(createProduct(name, price, description, image, countInStock));
        setCreate(0);
      } else {
        toast.error("Please Fill All Details", ToastObjects);
      }
    }
  };

  const childToParent = (childData) => {
    setImage(childData);
  };
const handleblur= ()=>
{
 validating.current.classList.add("was-validated")
}

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}  ref ={validating} onBlur={handleblur} noValidate>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button onClick={() => setCreate(1)} className="btn btn-success">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4 d-flex justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">
                      Please Enter title of the product.
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">
                      Please Enter price of the product.
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                    <div class="invalid-feedback">
                      Please Enter quantity of stocks.
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div class="invalid-feedback">
                      Please provide a description.
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Image</label>
                    <UploadWidget childToParent={childToParent} />
                  </div>
                  <div className="mb-4">
                    {/* <label className="form-label">Images</label> */}
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Automated Image Url"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                      disabled
                    />

                    <div class="invalid-feedback">
                      Please provide a image url.
                    </div>
                  </div>
                  {image && <div className="mb-4" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                      {/* <label className="form-label">Images</label> */}
                      <img src={image} alt="Product" height="200" style={{objectFit: "contain"}}/>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
