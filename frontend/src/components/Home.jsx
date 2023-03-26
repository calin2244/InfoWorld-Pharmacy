import { useSelector } from "react-redux";
import { useGetAllMedsQuery } from "../features/medsAPI";
import "../stylesheets/Home.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { decreaseStock } from "../features/medSlice";
import { useEffect, useState } from "react";

const Home = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { items, status } = useSelector((state) => state.meds);
  const { data, err, isLoading } = useGetAllMedsQuery();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!auth._id);
  }, [auth]);

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(decreaseStock({ id: item.id, quantity: 1 }));
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading meds...</p>
      ) : err ? (
        <p>An error occurred. Please refresh or come back later.</p>
      ) : (
        <>
          <h2>Our Meds</h2>
          {isLoggedIn ? (
            <div className="welcome-text">
              Buna {auth.name}! Avem tot ce ai nevoie!
            </div>
          ) : null}

          <div className="meds">
            {data?.map((med) => {
              const item = items.find((item) => item.id === med.id);
              const isOutOfStock = item?.stock <= 0;

              return (
                <div key={med.id} className="medicament">
                  <h3>{med.name}</h3>
                  <img src={med.image} />
                  <div className="med-details">
                    <span className="med-price">{med.price} RON</span>
                  </div>
                  <div className="med-stock">Stock: {item?.stock || 0}</div>
                  <div>
                    <button
                      disabled={isOutOfStock}
                      onClick={() => handleAddToCart(item)}
                    >
                      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
