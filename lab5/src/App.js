// src/App.js
import './App.css';
import Chart from './components/Chart.js';
import  buildings  from './data.js';

function App() {
  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={buildings} />
      {/* Здесь могла бы быть таблица, но мы её не реализуем для краткости */}
    </div>
  );
}

export default App;