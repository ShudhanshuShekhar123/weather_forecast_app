import React, { createContext, useState } from 'react';

 export  const Weathercontext = createContext();

const Weatherdata = ({children}) => {
    const [hourdata, sethourdata] = useState("")
  
    console.log(hourdata,"inisde conetxt")
      

  return (
     <Weathercontext.Provider value={{hourdata, sethourdata}}>
        
     {children}
     </Weathercontext.Provider>
  )
}

export default Weatherdata