import { NavLink } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";
import { useCartContext } from "../context/cart_context";

const Product = (curProduct) => {
  const { id, name} = curProduct;
  const hasImage = curProduct.hasOwnProperty("image");
  const {addToCart} = useCartContext();
  
  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
          {
            hasImage ? 
              (
                <img src={curProduct.image} alt={name} />
            ) : 
            (
              <div className='hasImage' >
                No Image Available
              </div>
            )
          }
          {/* <figcaption className="caption">{category}</figcaption> */}
        </figure>
        <div className="card-data">
          <div className="card-data-flex">
            <h3> {name} </h3>
            {/* <p className="card-data--price">{<FormatPrice price={price} />}</p> */}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
