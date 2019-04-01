
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location: { pathname }})=> {
  const links = [
    {
      title: 'Users',
      path: '/users'
    },
    {
      title: 'Create',
      path: '/users/create'
    },
    {
      title: 'Top Ranked',
      path: '/users/topranked'
    }
  ];

  console.log(location)
  return (
    <ul className='nav nav-tabs'>
      {
        links.map( link => (
            <li key={ link.path } className='nav-item'>
              <Link to={link.path} className={`nav-link${link.path === pathname ? ' active': ''}`}>
                { link.title }
              </Link>
            </li>
        ))

      }
    </ul>
  );
}

export default Nav
