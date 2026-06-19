import './CSS/App.css';
import dramas from './data.js';
import Table from './components/Table.js';

function App() {
    return (
        <div className="App">
            <h3>Дорамы</h3>
            <Table data={dramas} amountRows="10" paginate={true} />
        </div>
    );
}

export default App;