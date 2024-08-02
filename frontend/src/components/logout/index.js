import { useEffect } from "react"


const Logout = () => {


    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, [])

    return(
        <>
        </>
    )
}
 
export default Logout