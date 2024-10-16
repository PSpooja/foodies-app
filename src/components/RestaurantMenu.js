import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
//    const[restaurantInfo, setRestaurantInfo] = useState(null);
   const[vegItems, setVegItems] = useState([]);
   const[showVeg, setShowVeg] = useState(false);
   const[showIndex, setShowIndex] = useState(0);

   const {resId} = useParams();

   const restaurantInfo = useRestaurantMenu(resId);

   console.log("::restaurantInfo", restaurantInfo)

    // useEffect(()=> {
    //     fetchData();
    // },[])

    // const fetchData = async () => {
    //    const data = await fetch(MENU_URL + resId);
    //    const json = await data.json();
    //   console.log(json.data?.cards[2]?.card?.card?.info?.name);
    //   console.log(json.data);
    //    setRestaurantInfo(json.data)
    // }

       if(restaurantInfo === null) return <Shimmer />

   const {name, cuisines, costForTwoMessage, avgRating, totalRatingsString, areaName, sla:{minDeliveryTime, maxDeliveryTime}
   } = restaurantInfo?.cards[2]?.card?.card?.info
    
   const {itemCards} = restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
//    console.log("dgg", itemCards)

   console.log("dgg", restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

   const categories = restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter( c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

   console.log("categories", categories)

   const handleClickVeg = (e) => {
        const vegMenus = itemCards.filter((item) => item.card.info.isVeg)
        console.log(vegMenus) 
        
        
        if(showVeg){
            setVegItems([]);
            setShowVeg(false);
            e.target.style.backgroundColor = ''
        }
        else{
            setVegItems(vegMenus);
            setShowVeg(true);  
            e.target.style.backgroundColor = "green" 
        }
   }

    return(
        <div className="text-center">
           
              <h1 className="font-bold my-6 text-xl">{name}</h1>
        
            {/* <div className="">
                <ul className="flex">
                    <li>{avgRating}  {totalRatingsString}</li>
                    <li>{costForTwoMessage}</li>
                </ul>
            <h3>{cuisines}</h3>
            <h3>{areaName}</h3>
            <p>Your favourite dish will be on your table in between <span className="highlighted-items">{minDeliveryTime}min - {maxDeliveryTime}min</span></p>
            </div> */}

            <p className="font-bold text-lg">
                {cuisines.join(', ')} - {costForTwoMessage}
            </p>
                        
            <h2>Menu</h2>
            <button className="veg-btn"
            onClick={handleClickVeg}
            >Veg</button>

            {/* categories accordion */}
            
            {categories.map((category, index) => (
                <RestaurantCategory 
                data={category?.card?.card}
                showItems = {index === showIndex ? true : false}
                setShowIndex = {()=> setShowIndex(index)}
                />
            ))}

            {/* <ul> */}
                {/* <li>{itemCards[0].card.info.name}</li>
                <li>{itemCards[1].card.info.name}</li>
                <li>{itemCards[2].card.info.name}</li>
                <li>Cold Drink</li> */}

                {/* {(showVeg ? vegItems: itemCards).map((item) => (
                     <li key={item?.card?.info?.id}>{item?.card?.info?.name} - Rs. {item?.card?.info?.price/100}</li>

                )
                )} */}
            {/* </ul> */}
        </div>
    )
}

export default RestaurantMenu;