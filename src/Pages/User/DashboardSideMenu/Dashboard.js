import { Outlet } from "react-router-dom";
import "../Dashboard.css"
import "../../../GeneralComponents/Buttons.css"
import DashboardMenu from "./DashboardMenu";


export default function Dashboard() {

    return (
        <div className="dashboard-body">
            <DashboardMenu />
            <div className='dashboard-components'>
                <Outlet />
            </div>
        </div>

    )
}
