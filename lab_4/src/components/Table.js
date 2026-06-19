import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from 'react';

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {

    const [dataTable, setDataTable] = useState(props.data);

    const [activePage, setActivePage] = useState("5");

    const updateDataTable = (value) => {
        setDataTable(value);
        const newN = Math.ceil(value.length / rowsPerPage);
        setActivePage(String(newN));
    };

    

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const rowsPerPage = props.paginate ? props.amountRows : dataTable.length;

    const n = Math.ceil(dataTable.length / rowsPerPage);
    const arr = Array.from({length:n}, (v, i) => i+1);
    const pages = arr.map((item, index) =>
        <span 
            key={item} onClick={changeActive} 
            className={Number(activePage) === item ? "active" : ""}
            >
                {item}
            </span>);

    return(
      <>
        <h4>Фильтры</h4>
        <Filter
            filtering={updateDataTable}
            fullData={props.data}
        />
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody 
                body={ dataTable } 
                amountRows={rowsPerPage} 
                numPage= {activePage} 
            />
        </table>
        
        {props.paginate && <div>{pages}</div>}
    
       </>  
    )   
}

export default Table;