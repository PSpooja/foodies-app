import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory  = ({data, showItems, setShowIndex}) => {
    console.log("data", data)

    // const [showItems, setShowItems] = useState(false);

    const handleClick = () => {
        setShowIndex();
    }

    return(
        <div>
            {/* Header */}
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4" >
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className='font-bold'>{data.title} ({data.itemCards.length})</span>
                    <span>↓</span>
                </div>
                
                 {/* categories body */}
                {showItems && <ItemList items={data.itemCards}/>}
            </div>
            
           
        </div>
    )
}

export default RestaurantCategory;