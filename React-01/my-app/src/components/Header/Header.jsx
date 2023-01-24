import classes from "./Header.module.css";
import {Navigate, NavLink} from "react-router-dom";
import Logo from "./../common/logo/pngwing.com.png"

const Header = (props) => {



    return (
        <header className={classes.header}>
            <NavLink to={""} className={classes.logo}>
                <img src={Logo}></img>
                <span className={classes.home}>Bimba</span>
            </NavLink>
                <div className={classes.loginBlock}>
                    {props.isAuth ? <div>
                        <div>{props.login}</div>
                        <button onClick={props.logout}>Log out</button>
                    </div> : <NavLink to={"/login"}>Login</NavLink>}
                </div>
        </header>
        /* {} портібні бля того шоб jsx поняв шо ми в середині {} пишем js код */
    );

}

export default Header;