import React from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from "../routes";

const Header = () => {
    return (
        <Menu style={{margin: "15px"}}>

            <Link route="/" >
                <a className='item'> 
                    Crowdcoin
                </a>
            </Link>

            <Menu.Menu position='right'>

            <Link route="/" >
                <a className='item'> 
                    Campaign
                </a>
            </Link>

            <Link route="/campaign/new" >
                <a className='item'> 
                    +
                </a>
            </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default Header;