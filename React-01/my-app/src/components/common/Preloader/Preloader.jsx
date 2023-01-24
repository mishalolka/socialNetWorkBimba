
import loading from "../../../img/loading.gif";
import classes from "./Preloader.module.css";

let Preloader = (props) =>
{

    return (
        <div className={classes.PreloaderPhoto} >
            <img  src={loading} alt=""/>
        </div>

    );


}
export default Preloader;