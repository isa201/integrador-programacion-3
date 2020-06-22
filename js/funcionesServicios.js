$(function () {
    var operacion = "C"; //"C"=Crear
    var seleccionarIndice = -1; // Indice de el elemento seleccionado en la lista
    var tblServicios = localStorage.getItem("tblServicios"); //Retornar los datos almacenados
    tblServicios = JSON.parse(tblServicios); //Convertir String a Object
    if (tblServicios === null) // Si no hay datos, inicializar un array vacio
        tblServicios = [];
  
    function crearServicio() {
      //Obtener los valores de la forma HTML y transformalos en String.
      var servicio = JSON.stringify({
        idServicio: $("#txtIDServicio").val(),
        producto: $("#txtProducto").val(),
        responsable: $("#txtResponsable").val(),
        precioServicio: $("#txtPrecioServicio").val()
      }); 
      //Añadir el objeto a la tabla
      tblServicios.push(servicio);
      //Almacenar los datos en el Local Storage
      localStorage.setItem("tblServicios", JSON.stringify(tblServicios));
      alert("Se ha creado un nuevo servicio"); //Mensaje de alerta
      return true;
    }
  
    function editarServicio() {
      // Editar el item seleccionado en la tabla
      tblServicios[seleccionarIndice] = JSON.stringify({
          idServicio: $("#txtIDServicio").val(),
          producto: $("#txtProducto").val(),
          responsable: $("#txtResponsable").val(),
          precioServicio: $("#txtPrecioServicio").val()
      });
      //Almacenar los datos en el Local Storage
      localStorage.setItem("tblServicios", JSON.stringify(tblServicios)); 
      alert("El servicio a sido modificado"); //Mensaje de alerta
      return true;
    }
  
    function eliminarServicio() {
      //Eliminar el elemento seleccionado en la tabla
      tblServicios.splice(seleccionarIndice, 1); 
      //Actualizar los datos del Local Storage
      localStorage.setItem("tblServicios", JSON.stringify(tblServicios)); 
      alert("El servicio ha sido Eliminado"); //Mensaje de alerta
      location.reload(); //recargar la pagina
    }
  
    function listarServicio() {
      $("#tblLista2").html("");
      $("#tblLista2").html(
              "<thead>" +
              "<tr>" +                
              "<th>ID</th>" +
              "<th>Producto</th>" +
              "<th>Responsable</th>" +
              "<th>Precio</th>" +
              "<th>Acciones</th>" +
              "</tr>" +
              "</thead>" +
              "<tbody>" +
              "</tbody>"
              ); //Agregar la tabla a la estructura HTML
      for (var i in tblServicios) {
          var ser = JSON.parse(tblServicios[i]);
          $("#tblLista2 tbody").append("<tr>" +                    
                  "<td>" + ser.idServicio + "</td>" +
                  "<td>" + ser.producto + "</td>" +
                  "<td>" + ser.responsable + "</td>" +
                  "<td>" + ser.precioServicio + "</td>" +                    
                  "<td><img src='edit.png' alt='Edit" + i + "' class='btnModificar'/><img src='delete.png' alt='Delete" + i + "' class='btnBorrar'/></td>" +
                  "</tr>"
                  );
      } //Recorrer y agregar los items a la tabla HTML
    }
  
    $("#frmServicio2").bind("submit", function () {
      if (operacion=== "C")
          return crearServicio();
      else
          return editarServicio();
    }); //Función para decidir si se encuentra añadiendo o editando un item
    
    listarServicio();
  
    //evento del boton editar
    $(".btnModificar").bind("click", function () {
      operacion = "E"; //"E" = Editar
      //Obtener el identificador del item a ser editado
      seleccionarIndice = parseInt($(this).attr("alt").replace("Edit", ""));
      // Convertir de JSON al formato adecuando para editarlos datos
      var ser = JSON.parse(tblServicios[seleccionarIndice]); 
      $("#txtIDServicio").val(ser.idServicio);
      $("#txtProducto").val(ser.producto);
      $("#txtResponsable").val(ser.responsable);
      $("#txtPrecioServicio").val(ser.precioServicio);
      $("#txtIDServicio").attr("readonly", "readonly");
      $("#txtProducto").focus();
    });
  
    //evento del boton eliminar
    $(".btnBorrar").bind("click", function () {
      //Obtener el identificador del item a ser eliminado
      seleccionarIndice = parseInt($(this).attr("alt").replace("Delete", "")); 
      eliminarServicio(); //Eliminar el item
      listarServicio(); //Volver a listar los items en la tabla
    });
  });
  
  