import { createContext, useState } from "react"



export const authContext=createContext()


function AuthContext({children}) {

    const [user,setUser]=useState(null)
    const [token,setToken]=useState(null)
    const [loading,setLoading]=useState(false)

  return (
    <authContext.Provider value={{user,setUser,token,setToken,loading,setLoading}} >
        {children}
    </authContext.Provider>
  )
}

export default AuthContext