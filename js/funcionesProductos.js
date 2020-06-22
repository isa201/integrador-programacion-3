//utilizar jquery
$(function () {
  var operacion = "C"; //"C"=Crear
  var seleccionarIndice = -1; // Indice de el elemento seleccionado en la lista
  var tblProductos = localStorage.getItem("tblProductos"); //Retornar los datos almacenados
  tblProductos = JSON.parse(tblProductos); //Convertir String a Object
  if (tblProductos === null) // Si no hay datos, inicializar un array vacio
    tblProductos = [];

  function crearProducto() {
    //Obtener los valores de la forma HTML y transformalos en String.
    var producto = JSON.stringify({
      id: $("#txtID").val(),
      nombre: $("#txtNombre").val(),
      marca: $("#txtMarca").val(),
      precio: $("#txtPrecio").val(),
      cantidad: $("#txtCantidad").val()
      
    });
    //Añadir el objeto a la tabla
    tblProductos.push(producto);
    //Almacenar los datos en el Local Storage
    localStorage.setItem("tblProductos", JSON.stringify(tblProductos));
    alert("Se ha creado un nuevo producto"); //Mensaje de alerta
    return true;
  }

  function editarProducto() {
    // Editar el item seleccionado en la tabla
    tblProductos[seleccionarIndice] = JSON.stringify({
      id: $("#txtID").val(),
      nombre: $("#txtNombre").val(),
      marca: $("#txtMarca").val(),
      precio: $("#txtPrecio").val(),
      cantidad: $("#txtCantidad").val()
    });
    //Almacenar los datos en el Local Storage
    localStorage.setItem("tblProductos", JSON.stringify(tblProductos));
    alert("El producto a sido modificado"); //Mensaje de alerta
    return true;
  }

  function eliminarProducto() {
    //Eliminar el elemento seleccionado en la tabla
    tblProductos.splice(seleccionarIndice, 1);
    //Actualizar los datos del Local Storage
    localStorage.setItem("tblProductos", JSON.stringify(tblProductos));
    alert("Producto Eliminado"); //Mensaje de alerta
    location.reload(); //recargar la pagina
  }

  function listarProducto() {
    $("#tblLista").html("");
    $("#tblLista").html(
      "<thead>" +
      "<tr>" +
      "<th>ID</th>" +
      "<th>Nombre</th>" +
      "<th>Marca</th>" +
      "<th>Precio</th>" +
      "<th>Cantidad</th>" +
      "<th>TOTAL</th>" +
      "<th>Acciones</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    ); //Agregar la tabla a la estructura HTML
    for (var i in tblProductos) {
      var pro = JSON.parse(tblProductos[i]);
      $("#tblLista tbody").append("<tr>" +
        "<td>" + pro.id + "</td>" +
        "<td>" + pro.nombre + "</td>" +
        "<td>" + pro.marca + "</td>" +
        "<td>" + pro.precio + "</td>" +
        "<td>" + pro.cantidad + "</td>" +
        "<td>" + pro.cantidad * pro.precio + "</td>" +
        "<td><img src='edit.png' alt='Edit" + i + "' class='btnEditar'/><img src='delete.png' alt='Delete" + i + "' class='btnEliminar'/></td>" +
        "</tr>"
      );
    } //Recorrer y agregar los items a la tabla HTML
  }

  $("#frmProductos").bind("submit", function () {
    if (operacion === "C")
      return crearProducto();
    else
      return editarProducto();
  }); //Función para decidir si se encuentra añadiendo o editando un item

  listarProducto();

  //evento del boton editar
  $(".btnEditar").bind("click", function () {
    operacion = "E"; //"E" = Editar
    //Obtener el identificador del item a ser editado
    seleccionarIndice = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convertir de JSON al formato adecuando para editarlos datos
    var pro = JSON.parse(tblProductos[seleccionarIndice]);
    $("#txtID").val(pro.id);
    $("#txtNombre").val(pro.nombre);
    $("#txtMarca").val(pro.marca);
    $("#txtPrecio").val(pro.precio);
    $("#txtCantidad").val(pro.cantidad);
    $("#txtID").attr("readonly", "readonly"); //campo de solo lectura no puede ser modificado
    $("#txtNombre").focus();
  });

  //evento del boton eliminar
  $(".btnEliminar").bind("click", function () {
    //Obtener el identificador del item a ser eliminado
    seleccionarIndice = parseInt($(this).attr("alt").replace("Delete", ""));
    eliminarProducto(); //Eliminar el item
    listarProducto(); //Volver a listar los items en la tabla
  });
});

