import React from 'react'
import './sidebar-item.css'
import {Link, withRouter} from 'react-router-dom';

const SidebarItem = ({children, to, isactive, location}) => {
    var isActive = location.pathname === to;
    var className = isActive ? 'active' : '';
    return (
        <li>
            <Link to={to} className={className} title="My music">
                <span className="nav_icon">
                    {children}
                </span>
            </Link>
        </li>
    )
}

export default withRouter(SidebarItem);