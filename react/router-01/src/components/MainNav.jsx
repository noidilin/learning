import { NavLink } from 'react-router-dom';

import classes from './MainNav.module.css';
import NewsletterSignup from './NewsletterSignup';

/* NavLink 
 - className in NavLink accepts a function, and it will
   - receive an obj that contains a property 'isActive'
   - returns a class name based on 'isActive'
 - that class name will be added to the anchor */

function MainNav() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* end: check if the current path end with '/' */}
            <NavLink
              to='/'
              end={true}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/events'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/newsletter'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNav;
