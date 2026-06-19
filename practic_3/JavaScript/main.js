document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("showTable");
    const table = document.getElementById("dramas");

    table.innerHTML = "";

    button.addEventListener("click", function () {

        if (button.textContent === "Показать таблицу") {
            showTable("dramas", dramas);
            button.textContent = "Скрыть таблицу";
        } else {
            table.innerHTML = "";
            button.textContent = "Показать таблицу";
        }
    });

    const form = document.getElementById("graphForm");
    const oyBlock = document.getElementById("oyBlock");

    const oyInputs = document.querySelectorAll('input[name="oy"]');
    
    oyInputs.forEach(input => {
    input.addEventListener("change", function () {

        const oy = Array.from(
            document.querySelectorAll('input[name="oy"]:checked')
        );

        if (oy.length === 0) {
            oyBlock.classList.add("error");
        } else {
            oyBlock.classList.remove("error");
        }
    });
});


    form.addEventListener("submit", function (e) {
        e.preventDefault();


        const ox = document.querySelector('input[name="ox"]:checked').value;

        const oy = Array.from(
            document.querySelectorAll('input[name="oy"]:checked')
        ).map(el => el.value);

        if (oy.length === 0) {
            oyBlock.classList.add("error");
        } else {
            oyBlock.classList.remove("error");
        }

        const type = document.getElementById("typeChart").value;

        drawGraph(dramas, {
            ox,
            oy,
            type
        });
    });

});