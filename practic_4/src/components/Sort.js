import { useState } from "react";

const Sort = (props) => {
    // ключи полей, по которым можно сортировать
    const fields = Object.keys(props.data[0]);

    // состояния трёх уровней сортировки и флажков убывания
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [desc1, setDesc1] = useState(false);
    const [desc2, setDesc2] = useState(false);
    const [desc3, setDesc3] = useState(false);

    // обработчик клика «Сортировать»
    const handleSort = (event) => {
        event.preventDefault();

        // массив уровней сортировки: только заполненные
        const levels = [];
        if (level1) levels.push({ field: level1, desc: desc1 });
        if (level2) levels.push({ field: level2, desc: desc2 });
        if (level3) levels.push({ field: level3, desc: desc3 });

        if (levels.length === 0) {
            // нечего сортировать — возвращаем как есть
            props.sorting([...props.data]);
            return;
        }

        // копируем массив (нельзя мутировать props.data) и сортируем
        const sorted = [...props.data].sort((a, b) => {
            for (const lvl of levels) {
                const valA = a[lvl.field];
                const valB = b[lvl.field];
                let cmp = 0;
                if (typeof valA === "number") {
                    cmp = valA - valB;
                } else {
                    cmp = String(valA).localeCompare(String(valB), "ru");
                }
                if (cmp !== 0) {
                    return lvl.desc ? -cmp : cmp;
                }
                // равны — переходим к следующему уровню
            }
            return 0;
        });

        props.sorting(sorted);
    };

    // сброс сортировки
    const handleReset = () => {
        setLevel1(""); setLevel2(""); setLevel3("");
        setDesc1(false); setDesc2(false); setDesc3(false);
        props.sorting(props.fullData);
    };

    // option-ы для select: "Нет" + поля, исключая уже выбранные на других уровнях
    const makeOptions = (exclude) =>
        ["", ...fields.filter(f => !exclude.includes(f))].map((f, i) =>
            <option key={i} value={f}>{f === "" ? "Нет" : f}</option>
        );

    return (
        <form onSubmit={handleSort}>
            <p><b>Сортировка</b></p>
            <p>
                1 уровень:
                <select value={level1} onChange={e => { setLevel1(e.target.value); setLevel2(""); setLevel3(""); }}>
                    {makeOptions([])}
                </select>
                по убыванию? <input type="checkbox" checked={desc1} onChange={e => setDesc1(e.target.checked)} />
            </p>
            <p>
                2 уровень:
                <select value={level2} disabled={!level1} onChange={e => { setLevel2(e.target.value); setLevel3(""); }}>
                    {makeOptions([level1])}
                </select>
                по убыванию? <input type="checkbox" checked={desc2} onChange={e => setDesc2(e.target.checked)} disabled={!level1} />
            </p>
            <p>
                3 уровень:
                <select value={level3} disabled={!level2} onChange={e => setLevel3(e.target.value)}>
                    {makeOptions([level1, level2])}
                </select>
                по убыванию? <input type="checkbox" checked={desc3} onChange={e => setDesc3(e.target.checked)} disabled={!level2} />
            </p>
            <p>
                <button type="submit">Сортировать</button>
                <button type="button" onClick={handleReset}>Сбросить сортировку</button>
            </p>
        </form>
    );
};

export default Sort;