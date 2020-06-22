$(function () {
  var operacion = "C"; //"utilizar c para crear
  var seleccionarIndice = -1; // Indice de el elemento seleccionado en la lista
  var tblClientes = localStorage.getItem("tblClientes"); //Retornar los datos almacenados
  tblClientes = JSON.parse(tblClientes); //Convertir String a Object
  if (tblClientes === null) // Si no hay datos, inicializar un array vacio
    tblClientes = [];

  function crearCliente() {
    //Obtener los valores de la forma HTML y transformalos en String.
    var cliente = JSON.stringify({
      idCliente: $("#txtID").val(),
      dniCliente: $("#txtDni").val(),
      nombreCliente: $("#txtNombre").val(),
      telefonoCliente: $("#txtTelefono").val(),
      emailCliente: $("#txtEmail").val()
    });
    //Añadir el objeto a la tabla
    tblClientes.push(cliente);
    //Almacenar los datos en el Local Storage
    localStorage.setItem("tblClientes", JSON.stringify(tblClientes));
    alert("Los datos del cliente han sido almacenados"); //Mensaje de alerta
    return true;
  }

  function editarCliente() {
    // Editar el item seleccionado en la tabla
    tblClientes[seleccionarIndice] = JSON.stringify({
      idCliente: $("#txtID").val(),
      dniCliente: $("#txtDni").val(),
      nombreCliente: $("#txtNombre").val(),
      telefonoCliente: $("#txtTelefono").val(),
      emailCliente: $("#txtEmail").val()
    });
    //Almacenar los datos en el Local Storage
    localStorage.setItem("tblClientes", JSON.stringify(tblClientes));
    alert("Los datos del cliente han sido modificados"); //Mensaje de alerta
    return true;
  }

  function eliminarCliente() {
    //Eliminar el elemento seleccionado en la tabla
    tblClientes.splice(seleccionarIndice, 1);
    //Actualizar los datos del Local Storage
    localStorage.setItem("tblClientes", JSON.stringify(tblClientes));
    alert("Cliente eliminado"); //Mensaje de alerta
    location.reload(); //recargar la pagina
  }

  function listarCliente() {
    $("#tblLista3").html("");
    $("#tblLista3").html(
      "<thead>" +
      "<tr>" +
      "<th>ID</th>" +
      "<th>DNI</th>" +
      "<th>Nombre</th>" +
      "<th>Teléfono</th>" +
      "<th>Email</th>" +
      "<th>Acciones</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    ); //Agregar la tabla a la estructura HTML
    for (var i in tblClientes) {
      var cli = JSON.parse(tblClientes[i]);
      $("#tblLista3 tbody").append("<tr>" +
        "<td>" + cli.idCliente + "</td>" +
        "<td>" + cli.dniCliente + "</td>" +
        "<td>" + cli.nombreCliente + "</td>" +
        "<td>" + cli.telefonoCliente + "</td>" +
        "<td>" + cli.emailCliente + "</td>" +
        "<td><img src='edit.png' alt='Edit" + i + "' class='btnEditar'/><img src='delete.png' alt='Delete" + i + "' class='btnEliminar'/></td>" +
        "</tr>"
      );
    } //Recorrer y agregar los items a la tabla HTML
  }

  //Función para decidir si se encuentra añadiendo o editando un item
  $("#frmClientes").bind("submit", function () {
    if (operacion === "C")
      return crearCliente();
    else
      return editarCliente();
  });

  listarCliente();

  $(".btnEditar").bind("click", function () {
    operacion = "E"; //"E" = Editar
    //Obtener el identificador del item a ser editado
    seleccionarIndice = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convertir de JSON al formato adecuando para editarlos datos
    var cli = JSON.parse(tblClientes[seleccionarIndice]);
    $("#txtID").val(cli.idCliente);
    $("#txtDni").val(cli.dniCliente);
    $("#txtNombre").val(cli.nombreCliente);
    $("#txtTelefono").val(cli.telefonoCliente);
    $("#txtEmail").val(cli.emailCliente);
    $("#txtID").attr("readonly", "readonly");
    $("#txtDni").focus();
  });

  $(".btnEliminar").bind("click", function () {
    //Obtener el identificador del item a ser eliminado
    seleccionarIndice = parseInt($(this).attr("alt").replace("Delete", ""));
    eliminarCliente(); //Eliminar el item
    listarCliente(); //Volver a listar los items en la tabla
  });
});

