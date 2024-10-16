import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants"
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";

const HeaderLayout = () => {
    const [btnNameReact, setBtnNameReact] = useState('Login')
    // let btnName = 'Login'
    const onlineStatus = useOnlineStatus();

    const {LoggedInUser} = useContext(UserContext)

    console.log("logged in user",LoggedInUser)

    console.log("Header Rendered")

    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems)

    return(
        <div className='flex justify-between bg-pink-100 shadow-lg'>
            <div className='logo-container'>
                <img className='logo w-20' src={LOGO_URL}/>
            </div>
            <div className='flex items-center'>
                <ul className='flex p-4 m-4'>
                    <li className='px-4'>Online Status : {onlineStatus ? '🟢' : '🔴'}</li>
                    <li className='px-4'><Link to={"/"}>Home</Link></li>
                    <li className='px-4'><Link to={"/about"}>About Us</Link></li>
                    <li className='px-4'><Link to={"/contact"}>Contact Us</Link></li>
                    <li className='px-4'><Link to={"/grocery"}>Grocery</Link></li>
                    <li className='px-4 font-bold'><Link to={"/cart"}>Cart ({cartItems} items)</Link></li>
                    <li className='px-4 font-bold'>{LoggedInUser}</li>
                    <button className="login"
                    onClick={()=>{
                       btnNameReact === 'Login'? setBtnNameReact('Logout') : setBtnNameReact('Login');
                    }}
                    >{btnNameReact}</button>
                </ul>
            </div>
        </div>
    )
}

export default HeaderLayout