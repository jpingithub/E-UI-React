import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const AdminSideBar = () => {
    return (
        <>
            <Link to="/home" style={{ textDecoration: 'none' }}><h1 className='navLogo adminlogo'>RealMart-Shopping</h1></Link>
            <ul className="listitems">
                <NavLink to={"products"} style={{ textDecoration: 'none' }} 
                className={({isActive})=>{
                    return(
                        'item routeitem' +
                        (isActive?' clicked':'')
                    );
                }}>
                    <li>Products</li>
                </NavLink>
                <NavLink to={"customers"} style={{ textDecoration: 'none' }} className={({isActive})=>{
                    return(
                        'item routeitem' +
                        (isActive?' clicked':'')
                    );
                }}><li>Customers</li></NavLink>
                <NavLink to={"sales"} style={{ textDecoration: 'none' }} className={({isActive})=>{
                    return(
                        'item routeitem' +
                        (isActive?' clicked':'')
                    );
                }}><li>Sales</li></NavLink>
            </ul>
        </>
    )
}

export default AdminSideBar