//mostrar proveedores
function mostrarProveedores() {
    let request = sendRequest('proveedores', 'GET', '');
    let table = document.getElementById('proveedores-table');
    table.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        console.log(data);
        data.forEach(element => {
        table.innerHTML += `    
        <tr>
         <td>${element._id}</td>
         <td>${element.nombre}</td>
         <td>${element.tipoident}</td>
         <td>${element.numeroident}</td>
         <td>${element.telefono}</td>
         <td>${element.direccion}</td>
         <td>${element.departamento}</td>
         <td>
             <button type="button" class ="btn-blue" onclick='window.location = "/formProveedores.html?id=${element._id}"'>Editar</button>
             <button type="button" class ="btn-red" onclick='deleteProveedores("${element._id}")'>Eliminar</button>
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

//eliminar proveedores
function deleteProveedores(id){
    let request = sendRequest('proveedores/'+id, 'DELETE' , '');
    request.onload = function(){
        mostrarProveedores();
    }
}

//crear proveedores
function guardarProveedores(){
    let nom = document.getElementById('nombre-n').value
    let tid = document.getElementById('tipoident-t').value
    let nid = document.getElementById('numeroident-ni').value
    let tel = document.getElementById('telefono-t').value
    let dir = document.getElementById('direccion-d').value
    let dep = document.getElementById('departamento-de').value
    let data = {'nombre':nom, 'tipoident':tid, 'numeroident':nid, 'telefono':tel, 'direccion':dir, 'departamento':dep}
    let request = sendRequest('proveedores/', 'POST', data);
    request.onload = function(){
        window.location='proveedores.html'
    }
    request.onerror = function(){
        alert("Error al guardar los datos");
    }
}

//editar proveedores
function cargarDatos(id){
    let request = sendRequest('proveedores/'+id, 'GET', '');
    let nom = document.getElementById('nombre-n')
    let tid = document.getElementById('tipoident-t')
    let nid = document.getElementById('numeroident-ni')
    let tel = document.getElementById('telefono-t')
    let dir = document.getElementById('direccion-d')
    let dep = document.getElementById('departamento-de')

    request.onload = function(){
        let data = request.response;
        nom.value = data.nombre
        tid.value = data.tipoident
        nid.value = data.numeroident
        tel.value = data.telefono
        dir.value = data.direccion
        dep.value = data.departamento
        console.log(data)
    }
    request.onerror = function(){
        alert("Error al guardar los datos");
    }
}

function modificarProveedores(id){
    let nom = document.getElementById('nombre-n').value
    let tid = document.getElementById('tipoident-t').value
    let nid = document.getElementById('numeroident-ni').value
    let tel = document.getElementById('telefono-t').value
    let dir = document.getElementById('direccion-d').value
    let dep = document.getElementById('departamento-de').value
    let data = {'nombre':nom, 'tipoident':tid, 'numeroident':nid, 'telefono':tel, 'direccion':dir, 'departamento':dep}
    let request = sendRequest('proveedores/'+id, 'PUT', data);
    console.log(request)
    request.onload = function(){
        window.location='proveedores.html'
    }
    request.onerror = function(){
        alert("Error al modificar los datos")
    }
}