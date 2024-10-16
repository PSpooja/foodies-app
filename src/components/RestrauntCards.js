import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/userContext";

const RestrauntCards = (props) => {
    //    console.log("Props", props)
    const {resData} = props;
    const {LoggedInUser} = useContext(UserContext); // Destructuring
   
    
    const {name, cuisines, costForTwo, avgRating, sla:{deliveryTime}, cloudinaryImageId} = resData?.info;
    
        return(
            <div className='rest-card p-4 m-4 w-[200px] rounded-lg bg-gray-100 hover:bg-gray-300' >
                    <img className='rest-logo rounded-lg' alt src={CDN_URL+ cloudinaryImageId}/>
                <h3 className="font-bold py-4 text-lg">{name}</h3>
                <h4>{cuisines.join(', ')}</h4>
                <h4>{costForTwo}</h4>
                <ul className="flex justify-between">
                    <li className='font-semibold'>{avgRating} star</li>
                    <li className='font-semibold'>{deliveryTime} min</li>
                </ul>
                <h4>User : {LoggedInUser}</h4>
            </div>
        )
    }

export default RestrauntCards;