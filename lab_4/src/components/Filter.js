const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город" : event.target["city"].value.toLowerCase()
        };

        const numberFields = {
            "Год":[
                event.target["yearFrom"].value === "" ? -Infinity : Number(event.target["yearFrom"].value),
                event.target["yearTo"].value === "" ? Infinity : Number(event.target["yearTo"].value)
            ],
            "Высота":[
                event.target["heightFrom"].value === "" ? -Infinity : Number(event.target["heightFrom"].value),
                event.target["heightTo"].value === "" ? Infinity : Number(event.target["heightTo"].value)
            ]
        };

        let arr = props.fullData;
        for (const key in filterField) {
            arr = arr.filter(item =>
                item[key].toLowerCase().includes(filterField[key])
            );
        }

        for (const key in numberFields) {
            const[min, max] = numberFields[key];
            arr = arr.filter(item =>
                item[key] >= min && item[key] <= max
            );
        }

        props.filtering(arr);
    };

    const handleReset = () => {
        props.filtering(props.fullData);
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <label>Название: </label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Тип: </label>
                <input name="type" type="text" />
            </p>
            <p>
                <label>Страна:</label>
                <input name="country" type="text" />
            </p>
                        <p>
                <label>Город: </label>
                <input name="city" type="text" />
            </p>
            <p>
                <label>Год от: </label>
                <input name="yearFrom" type="number" />
            </p>
            <p>
                <label>Год до: </label>
                <input name="yearTo" type="number" />
            </p>
            <p>
                <label>Высота от: </label>
                <input name="heightFrom" type="number" />
            </p>
            <p>
                <label>Высота до: </label>
                <input name="heightTo" type="number" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    );
};

export default Filter;