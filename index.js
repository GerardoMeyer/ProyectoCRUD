tareas = []
let Fila = null

//Obtenr el área de texto
let txtTarea = document.querySelector('.txtTarea')
let txtDescription = document.querySelector('.txtDescripcion')
//Obtener el boton
let boton = document.querySelector('.btnAgregar')

let table = document.querySelector('.tabla')

//Por si la tabla anda vacía
function mostrar() {
    table.style.visibility = 'visible'
}


//Submit del form
function onSubmit() {
    let DataForm = Leer()
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0]
    if (Fila == null) {
        InsertarDatos(DataForm)
    } else {
        Actualizar(DataForm)
        Vaciar()
    }
}

//Leer
function Leer() {
    let DataForm = {}
    DataForm["tar"] = txtTarea.value
    DataForm["des"] = txtDescription.value
    return DataForm
}

//Insertar nuevos datos 
function InsertarDatos(data) {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0]
    let Fila = table.insertRow(table.length)
    columna1 = Fila.insertCell(0).innerHTML = data.tar
    columna2 = Fila.insertCell(1).innerHTML = data.des
    columna3 = Fila.insertCell(2).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`
    Vaciar()
}

//Vaciar campos
function Vaciar() {
    txtTarea.value = ""
    txtDescription.value = ""
    Fila = null
}

//Editar registro
function Editarr(td) {
    Fila = td.parentElement.parentElement
    txtTarea.value = Fila.cells[0].innerHTML
    txtDescription.value = Fila.cells[1].innerHTML
}

//Actualizar registro
function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.tar
    Fila.cells[1].innerHTML = DataForm.des
    txtTarea.focus()
}

//Borrar registro 
function Borrarr(td) {
    if (confirm(`¿Seguro deseas borrar esta tarea?`)) {
        row = td.parentElement.parentElement
        document.getElementById("tabla").deleteRow(row.rowIndex)
        Vaciar()
    }
}