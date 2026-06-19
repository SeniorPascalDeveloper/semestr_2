const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const textFields = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Жанр": event.target["genre"].value.toLowerCase(),
            "Статус": event.target["status"].value.toLowerCase()
        };

        const numberFields = {
            "Год": [
                event.target["yearFrom"].value === "" ? -Infinity : Number(event.target["yearFrom"].value),
                event.target["yearTo"].value === "" ? Infinity : Number(event.target["yearTo"].value)
            ],
            "Рейтинг": [
                event.target["ratingFrom"].value === "" ? -Infinity : Number(event.target["ratingFrom"].value),
                event.target["ratingTo"].value === "" ? Infinity : Number(event.target["ratingTo"].value)
            ]
        };

        let arr = props.fullData;
        for (const key in textFields) {
            arr = arr.filter(item =>
                item[key].toLowerCase().includes(textFields[key])
            );
        }
        for (const key in numberFields) {
            const [min, max] = numberFields[key];
            arr = arr.filter(item => item[key] >= min && item[key] <= max);
        }

        props.filtering(arr);
    };

    const handleReset = () => {
        props.filtering(props.fullData);
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p><label>Название: </label><input name="structure" type="text" /></p>
            <p><label>Жанр: </label><input name="genre" type="text" /></p>
            <p><label>Статус: </label><input name="status" type="text" /></p>
            <p>
                <label>Год от: </label><input name="yearFrom" type="number" />
                <label> до: </label><input name="yearTo" type="number" />
            </p>
            <p>
                <label>Рейтинг от: </label><input name="ratingFrom" type="number" step="0.1" />
                <label> до: </label><input name="ratingTo" type="number" step="0.1" />
            </p>
            <p>
                <button type="submit">Найти</button>
                <button type="reset">Очистить фильтры</button>
            </p>
        </form>
    );
};

export default Filter;