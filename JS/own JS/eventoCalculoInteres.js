/** btn calcular interes: */
const calcularInteres = document.querySelector('#calcular_Interes');
//Evento:
calcularInteres.addEventListener('click', () => {

    /** Datos del Cliente: */
    //Nombre
    const nombreCliente = document.querySelector('#nombre_Cliente').value,
        //Capital Inicical
        capitalInicial = parseInt(document.querySelector('#capital_Inicial').value),
        //Aportación Mensual
        aportacionMensual = parseInt(document.querySelector('#aportacion_Mensual').value),
        //Tiempo de Inversión
        tiempoInversion = parseInt(document.querySelector('#tiempo_Inversion').value),
        //Tipo de inversionista
        tipoInversionista = document.querySelector('#tipo_Inversionista').value

    /** Validacion de los datos: */
    if (nombreCliente == String('')) {
        Swal.fire('Ingresa tu nombre');
    } else if (nombreCliente == Number(nombreCliente)) {
        Swal.fire('Ingresaste un número en el campo nombre');
    } else if (
        isNaN(capitalInicial) ||
        isNaN(aportacionMensual) ||
        isNaN(tiempoInversion)
    ) {
        Swal.fire('Datos Erroneos, Ingresa un número');
    } else if (
        capitalInicial <= 0 ||
        aportacionMensual <= 0 ||
        tiempoInversion <= 0
    ) {
        Swal.fire('¡Error! Ingresa números mayores a 0');
    } else if (tipoInversionista === '--Selecciona--') {
        Swal.fire('Selecciona el tipo de Inversionista')
    } else {
        let timerInterval
        Swal.fire({
            title: '¡Calculando Interes!',
            html: '<span style="font-size: 2rem;">Terminaremos en un momento: <b></b></span>',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                /** <Funciones:> */
                //Formato Moneda
                const currencyFormat = new Intl.NumberFormat('es-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                });
                //Aportación total del periodo
                const aportacionTotal = (
                    CInicial = capitalInicial,
                    AMensual = (aportacionMensual * 12)
                ) => {
                    const capitalTotalAcumulado = (CInicial + AMensual) * tiempoInversion;
                    return capitalTotalAcumulado;
                };
                //Aportacion de un periodo
                const aportacionPeriodo = () => {
                    const capitalparcial = capitalInicial;
                    const mensualParcial = aportacionMensual;
                    const periodo1 = capitalparcial + (mensualParcial * 12);
                    return periodo1;
                };
                //Interes Compuesto
                const interesCompuesto = (
                    CI = aportacionPeriodo(),
                    I = tipoInversionista,
                    n = tiempoInversion,
                    i
                ) => {
                    I === 'Conservador' ? i = (1.15) :
                        I === 'Moderado' ? i = (1.25) : i = (1.35);
                    ROI = CI;
                    for (let conteo = 0; conteo < n; conteo++) {
                        ROI = (ROI * i) + CI;
                        if (conteo === 0) {
                            ROI -= CI;
                        }
                    };
                    return ROI;
                };
                //Capital Neto
                const capitalNeto = () => {
                    const capitalNeto = interesCompuesto() * 0.05;
                    const capitalFinalNeto = (interesCompuesto() - capitalNeto)
                    return capitalFinalNeto;
                }
                //Metas de capital
                const metasCapital = () => {
                    const tiempo = tiempoInversion;
                    let metas;
                    tiempo > 0 && tiempo <= 5 ? metas = 'Hábito de Ahorro' :
                        tiempo > 5 && tiempo <= 10 ? metas = 'Crecimiento de Capital' :
                            tiempo > 10 && tiempo <= 15 ? metas = 'Fortalecimiento de Capital' : metas = 'Consolidación de Capital';
                    return metas;
                }
                //Porcentaje de recuperación
                const porcentajeRecuperacion = () => {
                    const porcentaje = ((capitalNeto() * 100) / aportacionTotal());
                    return porcentaje;
                }
                /** </Funciones> */

                /** <Tabla de resultados y chart:> */
                //Tabla de resultados:
                const calculadoraTabla = document.querySelector('.calculadora_Tabla');
                const tablaInteres = document.querySelector('.tablaInteres');
                const tabla = document.querySelector('#tablaRendimientos');
                calculadoraTabla.classList.add('calculadoraTabla_Styles');
                tablaInteres.classList.add('tablaInteres_stylesJS');
                tabla.innerHTML = `
                <caption>¡Qué tal, <span style="color:#031e41; font-weight: 600;">${nombreCliente}</span>!Basado en la información que nos proporcionas y de acuerdo a las condiciones actuales del mercado,estos podrían ser tus rendimientos:<caption>
                <tr>
                <th>Capital total acumulado</th>
                <th>Capital Final Bruto</th>
                <th>Capital Final Neto</th>
                <th>% de Recuperación</th>
                <th>Metas a largo plazo</th>
                </tr>
                
                <tr>
                <td>${currencyFormat.format(aportacionTotal())}</td>
                <td>${currencyFormat.format(interesCompuesto())}</td>
                <td>${currencyFormat.format(capitalNeto())}</td>
                <td>${Math.round(porcentajeRecuperacion())}%</td>
                <td>${metasCapital()}</td>
                </tr>`;
                // Chart:
                const chartRendimientos = document.querySelector('.chartRendimientos');
                chartRendimientos.classList.add('estilosChart');
                const capitales = [];
                const capitalesInteres = [];
                const addCapital = (array, element) => {
                    array.push(element);
                };
                //añadir capitales desglosados:
                const capitalesPeriodo = aportacionTotal() / 12;
                const capitalPeriodoInteres = interesCompuesto() / 12;
                let capitalArrayInteres = capitalPeriodoInteres;
                let capitalArray = capitalesPeriodo;
                for (let conteo = 1; conteo <= 12; conteo++) {
                    capitalArrayInteres += capitalPeriodoInteres;
                    capitalArray += capitalesPeriodo;
                    if (conteo === 1) {
                        capitalArray -= capitalesPeriodo;
                        capitalArrayInteres -= capitalPeriodoInteres;
                    }
                    addCapital(capitales, capitalArray);
                    addCapital(capitalesInteres, capitalArrayInteres);
                };
                console.log(capitales);
                console.log(capitalesInteres);
                //Labels
                const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nomviembre', 'Diciembre'];
                //Data
                const data = {
                    labels: meses,
                    datasets: [{
                        label: 'Capital sin interes',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [
                            capitales[0],
                            capitales[1],
                            capitales[2],
                            capitales[3],
                            capitales[4],
                            capitales[5],
                            capitales[6],
                            capitales[7],
                            capitales[8],
                            capitales[9],
                            capitales[10],
                            capitales[11]
                        ]
                    },
                    {
                        label: 'Capital con interes',
                        backgroundColor: 'rgb(3, 30, 65)',
                        borderColor: 'rgb(3, 30, 65)',
                        data: [
                            capitalesInteres[0],
                            capitalesInteres[1],
                            capitalesInteres[2],
                            capitalesInteres[3],
                            capitalesInteres[4],
                            capitalesInteres[5],
                            capitalesInteres[6],
                            capitalesInteres[7],
                            capitalesInteres[8],
                            capitalesInteres[9],
                            capitalesInteres[10],
                            capitalesInteres[11]
                        ]
                    }
                    ]
                };
                const config = {
                    type: 'bar',
                    data: data,
                    options: {}
                };
                //Render Chart
                const myChart = new Chart(
                    document.querySelector('#myChart'),
                    config
                );
                /** </Tabla de resultados y chart:> */

            }; // ---> Swal results ( if ) 
        }); //-----> Swal results 
    }; // ---> else event
});