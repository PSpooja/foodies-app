import RestrauntCards from "./RestrauntCards"
// import resList from "../utils/mockdata";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

const BodyLayout = () => {

//   const [listOfRestaurant, setListOfRestaurant] = useState(resList);

  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  
  const [filteredRestaurant, setFilteredRestaurant] =  useState([]);

  const [searchText, setSearchText] = useState('');

  const onlineStatus = useOnlineStatus();

  const {userName,setUserName}= useContext(UserContext);
  
  useEffect(() => {
    // console.log("UseEffect called");
    fetchData();
  }, [])

  console.log('list of restaurants', listOfRestaurant)

  const fetchData = async () => {
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8985899&lng=77.6514648&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
    const json = await data.json();
    setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    // console.log(json)
  }

  // conditional rendering
//   if(listOfRestaurant.length === 0){
//     return <Shimmer />
//   }

 if (onlineStatus === false) return <h2>Looks Like you are offline !!! Please check your connection.</h2> ; 

    return listOfRestaurant.length === 0 ? <Shimmer /> : (
        <div className='body'>
            <div className='filter flex'>
                <div className="search m-4 p-4">
                    <input type="text" className="search-box border border-solid border-black rounded-lg" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    <button className="search-btn m-1 px-4 py-1 bg-green-100 rounded-lg"
                    onClick={() => {
                        // Filter the restaurant cards and update the UI
                        console.log(searchText)
                      const filteredRestaurant =  listOfRestaurant.filter((res) => {
                        return  res.info.name.toLowerCase().includes(searchText.toLowerCase());
                        })
                        setFilteredRestaurant(filteredRestaurant)
                    }}
                    >Search</button>
                </div>
                
                <div className="m-4 p-4 items-center">
                  <button className="filter-btn px-4 py-1 bg-blue-200 rounded-lg" onClick={()=>{
                    const filteredData = listOfRestaurant.filter((res) => res.info.avgRating > 4.2)
                    console.log(filteredData)
                    setListOfRestaurant(filteredData);
                  }}>Top Rated Restaurant</button>
                </div>

                <div className="m-4 p-4">
                  <label>User:</label>
                 <input className="border border-solid border-black" 
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)}/>
                </div>
                
            </div>
            <div className='rest-container flex flex-wrap'>
                {/* <RestrauntCards resData={resList[0]}/>
                <RestrauntCards resData={resList[1]}/>
                <RestrauntCards resData={resList[2]}/>
                <RestrauntCards resData={resList[3]}/> */}

                {filteredRestaurant.map((restaurant) => {
                   return <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id}><RestrauntCards resData={restaurant}/></Link>
                })}
                
            </div>
        </div>
    )
}

export default BodyLayout;