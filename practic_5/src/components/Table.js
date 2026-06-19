import { useState } from "react";
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';

const Table = (props) => {
    const [activePage, setActivePage] = useState("1");

    // когда фильтр срабатывает
    const handleFilter = (value) => {
        props.onFilterChange(value);
        setActivePage("1");
    };

    // когда сортировка срабатывает
    const handleSort = (value) => {
        props.onSortChange(value);
        setActivePage("1");
    };

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const rowsPerPage = props.paginate ? props.amountRows : props.displayedData.length;
    const n = Math.ceil(props.displayedData.length / rowsPerPage);
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const pages = arr.map((item, index) =>
        <span
            key={index}
            onClick={changeActive}
            className={Number(activePage) === item ? "active" : ""}
        >{item}</span>
    );

    return (
        <>
            <h4>Фильтры</h4>
            <Filter filtering={handleFilter} fullData={props.data} />

            <Sort 
                sorting={handleSort} 
                data={props.displayedData} 
                fullData={props.filteredData}
            />

            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={props.displayedData} amountRows={rowsPerPage} numPage={activePage} />
            </table>

            {props.paginate && <div>{pages}</div>}
        </>
    );
};

export default Table;