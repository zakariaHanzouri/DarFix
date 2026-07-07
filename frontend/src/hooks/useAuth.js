import { useContext } from "react"
import { authContext } from "../context/AuthContext"


function UseAuth() {
  return (
    useContext(authContext)
  )
}

export default UseAuth