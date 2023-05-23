
import User from './users/navigators/SideDrawer'
import Admin from './admin/nav/SideDraw';
import Doctor from './doctors/navigations/SideBar';


const Main  = ({token})=>{
    const decodeToken = jwt.decode(token);
    if (!decodeToken) {
        return null;
    }

    const { role } = decodeToken;

    if (role === "admin") {
        return <Admin />;
    } else if (role === 'doctor') {
        return <Doctor />;
    } else {
        return <User />
    }
}
export default Main;