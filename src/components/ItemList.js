import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({items}) => {
    console.log("items", items)

    const dispatch = useDispatch();
    const handleAddButton = () => {
        dispatch(addItems("pizza"))
        console.log("heyaa")
    }
    return(
        <div>{items.map((item)=>(
            <div className="p-2 m-2 border-b-2 border-grey-200 text-left" key={item.card.info.id}>
                <div className="flex justify-between">
                <div className="py-2 w-9/12">
                    <span>{item.card.info.name}</span>
                    <br/>
                    <span>₹ {item.card.info.price/100}</span>
                    <p className="text-xs text-gray-500 font-medium">{item.card.info.description}</p>
                </div>
                

               <div>
                 <div className="absolute">
                  <button className="p-1 mx-7 rounded-lg bg-white" onClick={handleAddButton}>Add +</button>
                  </div>
                  <img src={CDN_URL + item.card.info.imageId}  className="w-20"/>
                  
                  
               </div> 
            </div>
               
            </div>
        ))}</div>
    )
}

export default ItemList;