import { Navigate, Outlet } from "react-router-dom"
import MiniLoader from "../../component/MiniLoader/MiniLoader"

const PrivateRoutes = ({isAuth , isLoading}) => {

    return isLoading ? <MiniLoader
        style = {{
            opacity : 1,
            zIndex : 2,
            height : '100vh',
            width : '100vw'
        }}
    /> : (isAuth ? <Outlet/> : <Navigate to ='/login' replace = {true}/>)

}

export default PrivateRoutes
