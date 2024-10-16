
import React from "react";
import UserContext from "../utils/userContext";
class UserClass extends React.Component {
   constructor(props){
    super(props);
    // console.log(props)

    this.state = {
      userInfo : {
        name : 'Dummy',
        location : 'Dummy'
      }
    }

    console.log(this.props.name + "Child constructor");
   }

   async componentDidMount(){
    this.timer = setInterval(()=>{
        console.log("React Op")
    }, 1000)
    console.log(this.props.name + "Child componentDidMount");

    const data = await fetch('https://api.github.com/users/PSpooja');
    const json = await data.json();

    this.setState({
        userInfo : json
    })
   }

   componentWillUnmount(){
      clearInterval(this.timer);
   }

    render(){
        console.log(this.props.name + "Child Render");
        const {name, location, avatar_url} = this.state.userInfo;

        return(
            <div className="user-card">
                <img src={avatar_url}/>
               <h3>Name : {name}</h3>
               <h3>Location : {location}</h3> 
               <UserContext.Consumer>
                {({LoggedInUser})=><h2 className="font-bold">{LoggedInUser}</h2>}
               </UserContext.Consumer>
            </div>
        )
    }
}

export default UserClass;