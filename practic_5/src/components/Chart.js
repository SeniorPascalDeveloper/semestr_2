import { useState } from "react";
import * as d3 from "d3";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {

    const [ox, setOx] = useState("Жанр");
    const [oy, setOy] = useState([true, false]);
    const [chartType, setChartType] = useState("dot");

    const handleSubmit = (event) => {
        event.preventDefault();
        setOx(event.target["ox"].value);
        setChartType(event.target["chartType"].value);
        setOy([
            event.target["oy"][0].checked,
            event.target["oy"][1].checked
        ]);
    };

    const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];
        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Рейтинг']));
            arrGraph.push({ labelX: entry[0], values: minMax });
        }
        if (key === "Год") {
            arrGraph.sort((a, b) => a.labelX - b.labelX);
        }
        return arrGraph;
    };

    // ошибка вычисляется из oy — а oy меняется ТОЛЬКО при нажатии "Построить"
    const hasError = !oy[0] && !oy[1];

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p>Значение по оси OX:</p>
                <div>
                    <input type="radio" name="ox" value="Жанр" defaultChecked={ox === "Жанр"} />
                    Жанр
                    <br />
                    <input type="radio" name="ox" value="Год" defaultChecked={ox === "Год"} />
                    Год
                </div>
                <p>Значение по оси OY:</p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={oy[0] === true} />
                    Максимальная высота
                    <br />
                    <input type="checkbox" name="oy" defaultChecked={oy[1] === true} />
                    Минимальная высота
                </div>

                {hasError && (
                    <p style={{ color: "red" }}>
                        Ошибка: выберите хотя бы одно значение по оси OY
                    </p>
                )}

                <p>
                    Тип диаграммы:
                    <select name="chartType" defaultValue={chartType}>
                        <option value="dot">Точечная диаграмма</option>
                        <option value="bar">Гистограмма</option>
                    </select>
                </p>
                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>

            <ChartDraw 
                data={createArrGraph(props.data, ox)} 
                oy={oy} 
                chartType={chartType} 
            />
        </>
    );
};

export default Chart;