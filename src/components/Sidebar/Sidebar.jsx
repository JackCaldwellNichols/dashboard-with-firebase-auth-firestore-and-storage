import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LogoutIcon from '@mui/icons-material/Logout';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {DarkModeContext} from '../../context/DarkModeContext'
import { AuthContext } from '../../context/AuthContext';



const Sidebar = () => {
//const {dispatch} = useContext(DarkModeContext)
const {dispatch} = useContext(AuthContext)

const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
}
  return (
    <div className='sideBar'>
        <div className="top">
            <Link to='/' className='link'>
                <span className="logo">ReactAdmin</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to='/' className='link'>
                <li>
                    <DashboardIcon className='icon'/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <Link to='/users' className='link'>
                    <li>
                        <GroupIcon className='icon'/>   
                        <span>Users</span>
                    </li>
                </Link>
                <Link to='/products' className='link'>
                    <li>
                        <CategoryIcon className='icon'/>
                        <span>Products</span>
                    </li>
                </Link>
                <li>
                    <CreditCardIcon className='icon'/>
                    <span>Orders</span>
                </li>
                <li>
                    <AirportShuttleIcon className='icon'/>
                    <span>Delivery</span>
                </li>
                <li>
                    <HealthAndSafetyIcon className='icon'/>
                    <span>System Health</span>
                </li>
                <li>
                    <TextSnippetIcon className='icon'/>
                    <span>Logs</span>
                </li>
                <p className="title">USER</p>
                <li>
                    <PersonIcon className='icon'/>
                    <span>Profile</span>
                </li>
                <li>
                    <SettingsIcon className='icon'/>
                    <span>Settings</span>
                </li>
                <li>
                    <LogoutIcon className='icon'/>
                    <span onClick={handleLogout}>Logout</span>
                </li>
           
            </ul>
        </div>
        <div className="bottom">
           <div className="colorOption" onClick={() => dispatch({type: 'LIGHT'})}/>
           <div className="colorOption" onClick={() => dispatch({type: 'DARK'})}/>
        </div>
    </div>
  )
}

export default Sidebar