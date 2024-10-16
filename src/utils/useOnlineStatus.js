import { useEffect, useState } from "react";

const useOnlineStatus = () => {
    const[onlineStatus, setOnlineStatus] = useState(true);

    
    useEffect(()=>{
      // check if user online
      window.addEventListener('online', ()=>{
        setOnlineStatus(true)
      })

      window.addEventListener('offline', ()=>{
        setOnlineStatus(false)
      })
    }, [])


   // return status
   return onlineStatus;
}

export default useOnlineStatus;