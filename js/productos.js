//mostrar productos
function mostrarProductos() {
    let request = sendRequest('productos', 'GET', '');
    let table = document.getElementById('productos-table');
    table.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        console.log(data);
        data.forEach(element => {
        table.innerHTML += `    
        <div class="cont2">
            <table>
                <tbody>
                    <tr>
                        <td rowspan="5"><img src="${element.imagen}" alt="${element.nombre}"></td>
                        <td>Nombre:</td>
                        <td><h3>${element.nombre}</h3></td>
                    </tr>
                    <tr>
                        <td>Id producto:</td>
                        <td><p class="id">${element._id}</p></td>
                    </tr>
                    <tr>
                        <td>Descripción:</td>
                        <td><p class="desc">${element.descripcion}</p></td>
                    </tr>
                    <tr>
                        <td>Precio:</td>
                        <td><p class="val">$ ${element.valor}</p></td>
                    </tr>
                    <tr>
                        <td>Comprar:</td>
                        <td><p class="link"><a href="${element.link}" target="_blanc">Enlace externo</a></p></td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="btn-blue" onclick='window.location = "/formProductos.html?id=${element._id}"'>Editar</button>
            <button type="button" class="btn-red" onclick='deleteProductos("${element._id}")'>Eliminar</button>
        </div>
        <br><br>
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

//eliminar productos
function deleteProductos(id){
    let request = sendRequest('productos/'+id, 'DELETE' , '');
    request.onload = function(){
        mostrarProductos();
    }
}

//crear productos
function guardarProductos(){
    let nom = document.getElementById('nombre-n').value
    let des = document.getElementById('descripcion-d').value
    let img = document.getElementById('imagen-i').value
    let val = document.getElementById('valor-v').value
    let lin = document.getElementById('link-l').value
    let data = {'nombre':nom, 'descripcion':des, 'imagen':img, 'valor':val, 'link':lin}
    let request = sendRequest('productos/', 'POST', data);
    request.onload = function(){
        window.location='productos.html'
    }
    request.onerror = function(){
        alert("Error al guardar los datos");
    }
}

//editar productos
function cargarDatos(id){
    let request = sendRequest('productos/'+id, 'GET', '');
    let nom = document.getElementById('nombre-n')
    let des = document.getElementById('descripcion-d')
    let img = document.getElementById('imagen-i')
    let val = document.getElementById('valor-v')
    let lin = document.getElementById('link-l')

    request.onload = function(){
        let data = request.response;
        nom.value = data.nombre
        des.value = data.descripcion
        img.value = data.imagen
        val.value = data.valor
        lin.value = data.link
        console.log(data)
    }
    request.onerror = function(){
        alert("Error al guardar los datos");
    }
}

function modificarProductos(id){
    let nom = document.getElementById('nombre-n').value
    let des = document.getElementById('descripcion-d').value
    let img = document.getElementById('imagen-i').value
    let val = document.getElementById('valor-v').value
    let lin = document.getElementById('link-l').value
    let data = {'nombre':nom, 'descripcion':des, 'imagen':img, 'valor':val, 'link':lin}
    let request = sendRequest('productos/'+id, 'PUT', data);
    console.log(request)
    request.onload = function(){
        window.location='productos.html'
    }
    request.onerror = function(){
        alert("Error al modificar los datos")
    }
}