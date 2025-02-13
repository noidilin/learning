import { NavLink } from 'react-router-dom';
import classes from './MainNav.module.css';

function MainNav() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* NavLink 
            - className in NavLink accepts a function, and it will
              - receive an obj that contains a property 'isActive'
              - returns a class name based on 'isActive'
            - that class name will be added to the anchor */}
            <NavLink
              to=''
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
              to='products'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
