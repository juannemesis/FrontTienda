//mostrar tiendas
function mostrarTiendas() {
    let request = sendRequest('tiendas', 'GET', '');
    let table = document.getElementById('tiendas-table');
    table.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        console.log(data);
        data.forEach(element => {
        table.innerHTML += `    
        <tr>
         <td>${element._id}</td>
         <td>${element.nombre}</td>
         <td>${element.direccion}</td>
         <td>${element.horario}</td>
         <td>${element.telefono}</td>
         <td>${element.parqueadero}</td>
         <td>
             <button type="button" class ="btn-blue" onclick='window.location = "/formTiendas.html?id=${element._id}"'>Editar</button>
             <button type="button" class ="btn-red" onclick='deleteTiendas("${element._id}")'>Eliminar</button>
         </td>
        </tr>
        `
       });
    }
    request.onerror = function(){
        table.innerHTML = `
        <tr>
            <td colspan="">Error al traer los datos</td>
        </tr>
        `
    }
}

//eliminar tiendas
function deleteTiendas(id){
    let request = sendRequest('tiendas/'+id, 'DELETE' , '');
    request.onload = function(){
        mostrarTiendas();
    }
}

//crear tiendas
function guardarTiendas(){
    let nom = document.getElementById('nombre-n').value
    let dir = document.getElementById('direccion-d').value
    let hor = document.getElementById('horario-h').value
    let tel = document.getElementById('telefono-t').value
    let par = document.getElementById('parqueadero-p').value
    let data = {'nombre':nom, 'direccion':dir, 'horario':hor, 'telefono':tel, 'parqueadero':par}
    let request = sendRequest('tiendas/', 'POST', data);
    request.onload = function(){
        window.location='tiendas.html'
    }
    request.onerror = function(){
        alert("Error al guardar los datos");
    }
}

//editar tiendas
function cargarDatos(id){
    let request = sendRequest('tiendas/'+id, 'GET', '');
    let nom = document.getElementById('nombre-n')
    let dir = document.getElementById('direccion-d')
    let hor = document.getElementById('horario-h')
    let tel = document.getElementById('telefono-t')
    let par = document.getElementById('parqueadero-p')

    request.onload = function(){
        let data = request.response;
        nom.value = data.nombre
        dir.value = data.direccion
        hor.value = data.horario
        tel.value = data.telefono
        par.value = data.parqueadero
        console.log(data)
    }
    request.onerror = function(){
        alert("Error al guardar los datos");
    }
}

function modificarTiendas(id){
    let nom = document.getElementById('nombre-n').value
    let dir = document.getElementById('direccion-d').value
    let hor = document.getElementById('horario-h').value
    let tel = document.getElementById('telefono-t').value
    let par = document.getElementById('parqueadero-p').value
    let data = {'nombre':nom, 'direccion':dir, 'horario':hor, 'telefono':tel, 'parqueadero':par}
    let request = sendRequest('tiendas/'+id, 'PUT', data);
    console.log(request)
    request.onload = function(){
        window.location='tiendas.html'
    }
    request.onerror = function(){
        alert("Error al modificar los datos")
    }
}