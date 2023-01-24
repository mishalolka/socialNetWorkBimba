import classes from "./Paginator.module.css";
import React, {useState} from "react";

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    let portionCount = Math.ceil(pagesCount  / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;



    return (
        <div>
            {
                portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1)}}> left </button>
            }
                {
                    pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map(p => {
                        return <span className={props.currentPage === p && classes.selectedPage} key={p} onClick={() => {
                            props.onPageChanged(p)
                        }}> {p} </span>
                    })
                }
            {
                portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>right</button>
            }
        </div>
    );

}

export default Paginator;