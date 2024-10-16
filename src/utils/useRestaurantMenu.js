import { useState, useEffect } from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
    const[restaurantInfo, setRestaurantInfo] = useState(null);
    
    useEffect(()=> {
        fetchData();
    },[])

    const fetchData = async () => {
       const data = await fetch(MENU_URL + resId);
       const json = await data.json();
      console.log(json.data?.cards[2]?.card?.card?.info?.name);
      console.log(json.data);
       setRestaurantInfo(json.data)
    }
   return restaurantInfo;
}

export default useRestaurantMenu;