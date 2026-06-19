// src/components/Chart.js
import { useState } from 'react';
import * as d3 from 'd3';
import ChartDraw from './ChartDraw';

const Chart = (props) => {
  // Состояния для оси X и Y (макс/мин)
  const [ox, setOx] = useState('Страна');
  const [oy, setOy] = useState([true, false]); // [макс, мин]
  // Состояние для типа диаграммы (добавлено в самостоятельном задании)
  const [chartType, setChartType] = useState('scatter'); // 'scatter' или 'bar'

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // Получаем выбранное значение radio
    const oxValue = form.ox.value;
    setOx(oxValue);

    // Получаем состояние чекбоксов
    const maxChecked = form.oyMax.checked;
    const minChecked = form.oyMin.checked;
    setOy([maxChecked, minChecked]);

    // Тип диаграммы
    const type = form.chartType.value;
    setChartType(type);
  };

  // Подготовка данных для графика
  const createArrGraph = (data, key) => {
    // Группируем по ключу (Страна или Год)
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    for (let entry of groupObj) {
      // Извлекаем все высоты из группы
      const heights = entry[1].map(d => d['Высота']);
      const minMax = d3.extent(heights); // [min, max]
      arrGraph.push({
        labelX: entry[0],
        values: minMax // [min, max]
      });
    }

    // Сортировка для годов (самостоятельное задание 1)
    if (key === 'Год') {
      arrGraph.sort((a, b) => parseInt(a.labelX) - parseInt(b.labelX));
    }
    return arrGraph;
  };

  const graphData = createArrGraph(props.data, ox);

  // Проверка, выбрана ли хотя бы одна высота (для ошибки)
  const isAnyOySelected = oy[0] || oy[1];

  return (
    <div>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p>Значение по оси ОХ:</p>
        <div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ox === 'Страна'} /> Страна
          <br />
          <input type="radio" name="ox" value="Год" defaultChecked={ox === 'Год'} /> Год
        </div>

        <p>Значение по оси ОУ:</p>
        <div>
          <input type="checkbox" name="oyMax" defaultChecked={oy[0]} /> Максимальная высота
          <br />
          <input type="checkbox" name="oyMin" defaultChecked={oy[1]} /> Минимальная высота
        </div>

        {/* Самостоятельное задание 3: выбор типа диаграммы */}
        <p>Тип диаграммы:</p>
        <select name="chartType" defaultValue={chartType}>
          <option value="scatter">Точечная</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      {/* Если не выбрано ни одного значения по OY – выводим ошибку */}
      {!isAnyOySelected && (
        <p style={{ color: 'red' }}>Ошибка: выберите хотя бы одно значение по оси OY!</p>
      )}

      {/* Передаём данные и настройки в ChartDraw */}
      {isAnyOySelected && (
        <ChartDraw
          data={graphData}
          oy={oy}
          chartType={chartType}
        />
      )}
    </div>
  );
};

export default Chart;