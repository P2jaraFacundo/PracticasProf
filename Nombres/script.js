const nombresAzar = ["Axel", "Veronica", "Carlos", "Daniel", "Enzo", "Facundo", "Rodrigo", "Pedro", "Ismael", "Julio"];

const ContenedorNombres = document.getElementById('contenedor-nombres');
const NombresOrdenados = document.getElementById('nombres-ordenados');
const BotonVerificador = document.getElementById('Boton-Verificador');

// Función para mostrar nombres al inicio
function MostrarNombres() {
    nombresAzar.forEach(nombre => {
        const nombreDiv = document.createElement('div');
        nombreDiv.textContent = nombre;
        nombreDiv.classList.add('nombre');
        nombreDiv.addEventListener('click', () => {
            moverNombre(nombreDiv);
        });
        ContenedorNombres.appendChild(nombreDiv);
    });
}

// Función para mover el nombre de izquierda a derecha
function moverNombre(nombreDiv) {
    nombreDiv.removeEventListener('click', moverNombre);
    nombreDiv.classList.add('ordenado');
    NombresOrdenados.appendChild(nombreDiv);
    if (NombresOrdenados.childElementCount === nombresAzar.length) {
        BotonVerificador.style.display = 'block';
    }
}

// Función para verificar si todos los nombres están en orden
function Chekear() {
    const nombresOrdenadosDivs = NombresOrdenados.querySelectorAll('.nombre');
    const ExtracionNombres = Array.from(nombresOrdenadosDivs).map(div => div.textContent);
    
    let ordenado = true;
    
    for (let i = 0; i < ExtracionNombres.length - 1; i++) {
        if (ExtracionNombres[i] > ExtracionNombres[i + 1]) {
            ordenado = false;
            break;
        }
    }
    if (ordenado) {
        alert('¡Felicidades! Todos los nombres están ordenados correctamente.');
    } else {
        alert('¡Ups! Algunos nombres no están ordenados correctamente.');
    }
}

MostrarNombres();
BotonVerificador.addEventListener('click', Chekear);