/** Construir HTML */
const slider = document.querySelector('.slider');
console.log(slider);
const makeHTML = (array) => {
    let html;
    for (const iterator of array) {
        const { nombreEmpresa, variacionPrecio, valorAccion, imagen } = iterator;
        html = `
        <div class="sliderItem">
        <!-- precio accion -->
        <div class="precioAccion">
            <!-- img nombre empresa -->
            <div class="precioAccion__img">
                <img src="IMG/${imagen}" alt="" width="28rem">
                <h4>${nombreEmpresa}</h4>
            </div>
            <!-- precio -->
            <p>${variacionPrecio}%</p>
        </div>
        <!-- variacion precio -->
        <div class="variacionPrecio">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-currency-dollar" width="28"
        height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
        stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
        <path d="M12 3v3m0 12v3" />
    </svg>
    <p>${valorAccion}</p>
    </div>
        `;
        slider.innerHTML += html;
    };
};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        makeHTML(data);
    })