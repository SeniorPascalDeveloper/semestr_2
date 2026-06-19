import './CSS/App.css';
import { useState } from 'react';
import dramas from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';

function App() {

    const [filteredData, setFilteredData] = useState(dramas);
    const [displayedData, setDisplayedData] = useState(dramas);

    const handleFilter = (newData) => {
        setFilteredData(newData);
        setDisplayedData(newData);
    };

    const handleSort = (sortedData) => {
        setDisplayedData(sortedData);
    };

    return (
        <div className="App">
            <h3>Рейтинг дорам</h3>
            <Chart data={displayedData} />
            <Table 
                data={dramas} 
                filteredData={filteredData}
                displayedData={displayedData}
                onFilterChange={handleFilter}
                onSortChange={handleSort}
                amountRows="10" 
                paginate={true} 
            />
        </div>
    );
}

export default App;