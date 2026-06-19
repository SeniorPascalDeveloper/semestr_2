import { useState } from "react";
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';

const Table = (props) => {
    const [dataTable, setDataTable] = useState(props.data);
    const [activePage, setActivePage] = useState("1");

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage("1");
    };

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const rowsPerPage = props.paginate ? props.amountRows : dataTable.length;
    const n = Math.ceil(dataTable.length / rowsPerPage);
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
            <Filter filtering={updateDataTable} fullData={props.data} />

            <Sort sorting={updateDataTable} data={dataTable} fullData={props.data} />

            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={dataTable} amountRows={rowsPerPage} numPage={activePage} />
            </table>

            {props.paginate && <div>{pages}</div>}
        </>
    );
};

export default Table;