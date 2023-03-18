import { useSelector } from "react-redux";
import { useGetAllMedsQuery } from "../features/medsAPI";
import "../stylesheets/Home.css"
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const Home = () => {
    const { items, status } = useSelector(state => state.meds);
    const { data, err, isLoading } = useGetAllMedsQuery();

    const dispatch = useDispatch();

    return(
        <div className="home-container">
            { isLoading ? (<p>Loading meds...</p>) 
            : err ? 
            (<p>An error occured. Please refresh or come back later.</p>)
            : (
                <>
                <h2>Our Meds</h2>
                <div className="meds">
                    {data?.map(med => <div key={med.id} className="medicament">
                        <h3>{med.name}</h3>
                        <img src={med.image} />
                        <div className="med-details">
                            {/* <span>{med.descr}</span> */}
                            <span className="med-price">{med.price} RON</span>
                        </div>
                        <button onClick={() => {
                            dispatch(addToCart(med))
                        }}
                        >Add to Cart</button>
                </div>)}
                </div>
                </>
            )}
        </div>
    )
}
 
export default Home;