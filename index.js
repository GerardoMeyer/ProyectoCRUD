tareas = []
let Fila = null

//Obtenr el área de texto
let txtTarea = document.querySelector('.txtTarea')
let txtDescription = document.querySelector('.txtDescripcion')

//Obtener el boton
let boton = document.querySelector('.btnAgregar')

let table = document.querySelector('.tabla')

leerLS()

//INSERTAR LOCALSTORAGE 
function crearLS(e) {
    //Local storage
    titulo = document.querySelector('.txtTarea').value
    descripcion = document.querySelector('.txtDescripcion').value

    let juego = {
        titulo,
        descripcion
    }

    if (localStorage.getItem("Juegos") == null) {
        let juegos = []
        juegos.push(juego)
        localStorage.setItem("Juegos", JSON.stringify(juegos))

    } else {
        let juegos = localStorage.getItem("Juegos")
        juegosJS = JSON.parse(juegos)
        juegosJS.push(juego)
        localStorage.setItem("Juegos", JSON.stringify(juegosJS))

    }
    alert(`El juego ${titulo} se ha agregado correctamente!`)
    Vaciar()
    leerLS()
}

//Mostrar en el HTML el contenido del LS
function leerLS() {
    let juegos = localStorage.getItem("Juegos")
    juegosJS = JSON.parse(juegos)
    document.querySelector('#tbodyLS').innerHTML = ""
    for (let i = 0; i < juegosJS.length; i++) {
        let titulo = juegosJS[i].titulo
        let descripcion = juegosJS[i].descripcion
        document.getElementById('containerLS').style.display = 'block'
        document.getElementById('tbodyLS').innerHTML +=
            `<tr>
            <td>${titulo}</td>
            <td>${descripcion}</td>
            <td><button onclick="borrarLS('${titulo}')" class="btn btn-danger">Eliminar</button></td>
            <td><button onclick="editarLS('${titulo}')" class="btn btn-primary">Editar</button></td>
        </tr>
        `
    }
}

// Editar registro en el LS 
function editarLS(titulo) {
    let juegos = localStorage.getItem("Juegos")
    juegosJS = JSON.parse(juegos)
    for (let i = 0; i < juegosJS.length; i++) {
        if (juegosJS[i].titulo === titulo) {
            document.getElementById('containerLS').style.display = 'none'
            document.getElementById('bodyLS').innerHTML =
                `<div class="row">
            <div class="d-flex bd-highlight col-md-5">
                <h3>Editar registro</h3>
            </div>

            <div class="card-body">
                <form>
                    <br>
                    <div class="form-group">
                        <label for="tar">Videojuego</label> <br> <input type="text" id="newTitulo" class="form-control"
                            placeholder="${juegosJS[i].titulo}">
                        <br>
                         <br>
                       <label for="des">Descripcion</label> <br> <textarea id="newDescripcion" class="form-control"
                            placeholder="${juegosJS[i].descripcion}" rows="5" cols="50"></textarea>
                    </div>
                    <br>
                    <button onclick="actualizarLS('${i}')" class="btn btn-success">Actualizar</button>
                    <button onclick="cancelar()" class="btn btn-primary">Cancelar</button>
                </form>
                <br>
                <br>
                <hr class="sections">
            </div>
        </div>`
        }
    }
}

//Actualizar registro localStorage
function actualizarLS(i) {
    let juegos = localStorage.getItem("Juegos")
    juegosJS = JSON.parse(juegos)
    juegosJS[i].titulo = document.getElementById("newTitulo").value
    juegosJS[i].descripcion = document.getElementById("newDescripcion").value
    if (juegosJS[i].titulo == "") {
        alert("No ha ingresado el título")
    } else {
        if (juegosJS[i].descripcion == "") {
            alert("No ha ingresado el descripcion")
        } else {
            localStorage.setItem("Juegos", JSON.stringify(juegosJS))
        }
    }
    document.getElementById('bodyLS').innerHTML = ""
    leerLS()
}

function cancelar() {
    document.getElementById('bodyLS').innerHTML = ""
    leerLS()
}

//Borrar localStorage
function borrarLS(titulo) {
    let juegos = localStorage.getItem("Juegos")
    juegosJS = JSON.parse(juegos)
    for (let i = 0; i < juegosJS.length; i++) {
        if (juegosJS[i].titulo === titulo) {
            juegosJS.splice(i, 1)
        }
    }
    localStorage.setItem("Juegos", JSON.stringify(juegosJS))
    leerLS()
}



//Vaciar campos
function Vaciar() {
    txtTarea.value = ""
    txtDescription.value = ""
    Fila = null
}