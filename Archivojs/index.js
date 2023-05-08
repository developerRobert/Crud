window.addEventListener("DOMContentLoaded", () => {
// sacar los valores unicos, ejemplos[1,1,,3,3,4,3,5,5,] resultado del ejemplo:[1,3,4,5]






  const input_nombre = document.querySelector(".input_nombre")
  const input_apellido = document.querySelector(".input_apellido")
  const input_documento = document.querySelector(".input_documento")
  const input_correo = document.querySelector(".input_correo")
  const input_edad = document.querySelector(".input_edad")
  const btn_guardar = document.querySelector(".btn_guardar")
  const btn_actual = document.querySelector(".btn_actualiza")
  const btn_cancelar = document.querySelector(".btn_cancelar")
  const coteinercards = document.querySelector(".conteiner_cards")
  const coteinerform = document.querySelector(".conteiner_form")
  const buscarUsu = document.querySelector(".conteiner_card_input")
  const vistaContador = document.querySelector(".vista_titulo_contador")
  //  const coteinertitulo=document.querySelector(".conteiner_card_titulo")
  const contenedor = document.querySelector(".conteiner_mostrar")


  const arrayPersonas = []
  let array_local;
  let array_local_actualizar = JSON.parse(localStorage.getItem("usuario")) || [];
  let cambioBoton = false;
  obtenerLocaStore(array_local_actualizar);
  eventosbtn();

  //__________________________________________________________
  // const vistaNombre=document.querySelector(".vista_nombre")
  // const vistaApellido=document.querySelector(".vista_apellido")
  // const vistaDocumento=document.querySelector(".vista_documento")
  // const vistaEdad=document.querySelector(".vista_edad")
  // const vistacorreo=document.querySelector(".vista_correo")

  function agregarUsuario() {
    array_local = JSON.parse(localStorage.getItem("usuario")) || [];
    // aconsole.log("entró")
    const buscarUsuario = array_local.find((usu) => input_documento.value === usu.documento) || "";
    // console.log(buscarUsuario)

    if (buscarUsuario !== "") {
      mostrar(" El documento ingresado ya existe. ");
    } else {
      const objeto_user = {
        nombre: `${input_nombre.value.toLowerCase()}`,
        apellido: `${input_apellido.value.toLowerCase()}`,
        documento: `${input_documento.value.toLowerCase()}`,
        correo: `${input_correo.value.toLowerCase()}`,
        edad: `${input_edad.value.toLowerCase()}`
      }

      if (array_local.length > 0) {
        array_local.unshift(objeto_user)
        admiLocastore()
        obtenerLocaStore(array_local)
      } else {
        arrayPersonas.unshift(objeto_user)
        localStorage.setItem("usuario", JSON.stringify(arrayPersonas));
        obtenerLocaStore(arrayPersonas)
      }

    }

  }

  btn_guardar.addEventListener("click", (e) => {
    e.preventDefault();
    if (validar()) {
      
      mostrar(" porfavor llene los campos ")
    } else {
      agregarUsuario();
      coteinerform.reset();
      //  obtenerLocaStore(array_local_actualizar);
      eventosbtn();
    }

  })
  // -______________________________________________________________________________________

  function admiLocastore() {
    localStorage.setItem("usuario", JSON.stringify(array_local));

  }



  function obtenerLocaStore(array) {
    // console.log("holaaa")
    coteinercards.innerHTML = "";
    array_local = JSON.parse(localStorage.getItem("usuario")) || []

    array.map((valor, i) => {
      const card = document.createElement("div")
      card.setAttribute("class", "card")

      card.innerHTML =
        `
        <figure class="card_img"></figure>
        <h3 class="titulos  titulo_nombre">Nombre</h3>
        <p class="vista vista_nombre">${array[i].nombre}</p>
        <h3 class="titulos   titulo_apellido">Apellido</h3>
        <p class="vista  vista_apellido">${array[i].apellido}</p>
        <h3 class="titulos  titulo_documento">Documento</h3>
        <p class="vista  vista_documento">${array[i].documento}</p>
        <h3 class="titulos  titulo_correo">Correo</h3>
        <p class="vista  vista_correo">${array[i].correo}</p>
        <h3 class="titulos  titulo_edad">Edad</h3>
        <p class="vista vista_edad">${array[i].edad}</p>
        <div class="card_btn">
            <button class="botones actualizar botonActualizar" id=${array_local[i].documento}>Actualizar</button>
            <button class="botones eliminar botonEliminar" id=${array_local[i].documento}>Eliminar</button>
        </div>
  
        `
      coteinercards.appendChild(card);
    })
    vistaContador.textContent = array_local.length;
    // console.log(array_local.length) 
    return array_local;

  }
  // ______________________________________________________________________________________
  function validar() {
    if (input_nombre.value === "" || input_apellido.value === "" || input_documento.value === "" || input_correo.value === "" || input_edad.value === "") {
      return true
    } else {
      return false
    }
  }

  //__________________________________________________________________________________
  function eliminarUser(document_event) {
      array_local = JSON.parse(localStorage.getItem("usuario"));
      for (let i = 0; i < array_local.length; i++) {
        if (array_local[i].documento === document_event) {
          array_local.splice(i, 1)
          break
        }
      }
      admiLocastore();
      obtenerLocaStore(array_local);
      eventosbtn();
    
  }
  //____________________________________________________________

  function actualizar(documento_event) {
    array_local = JSON.parse(localStorage.getItem("usuario"))

    const buscar = array_local.find((usu) => documento_event === usu.documento);
    let valorObjecto = array_local[array_local.indexOf(buscar)];
    const indexObjecto = array_local.indexOf(valorObjecto);
    const user = array_local[indexObjecto];
    // const arayUser=[user.nombre,user.apellido,user.documento,user.edad]

    input_nombre.value = user.nombre;
    input_apellido.value = user.apellido;
    input_documento.value = user.documento;
    input_correo.value = user.correo;
    input_edad.value = user.edad;

    input_documento.setAttribute("readOnly", "true")
    cambioBoton = true;
    btn_guardar.classList.add("btn_ocultar")
    btn_actual.classList.remove("btn_ocultar")
    btn_cancelar.classList.remove("btn_ocultar")
    btn_actual.setAttribute("id", indexObjecto);
  }
  btn_actual.addEventListener("click", (e) => {
    e.preventDefault();
    Editar(e.currentTarget.id);
    eventosbtn();
  })

  function Editar(indexObjecto) {
    if (cambioBoton) {
      array_local = JSON.parse(localStorage.getItem("usuario"))
      // console.log(indexObjecto);

      array_local[indexObjecto].nombre = input_nombre.value.toLowerCase();
      array_local[indexObjecto].apellido = input_apellido.value.toLowerCase();
      array_local[indexObjecto].correo = input_correo.value.toLowerCase();
      array_local[indexObjecto].edad = input_edad.value.toLowerCase();
      if (validar()) {


        alert("ups.... complete todo la informacion ")
      } else {
        admiLocastore();
        obtenerLocaStore(array_local);
        eventosbtn();
        coteinerform.reset();
        btn_guardar.classList.remove("btn_ocultar")
        btn_actual.classList.add("btn_ocultar")
        btn_cancelar.classList.add("btn_ocultar")
        input_documento.removeAttribute("readOnly");
        cambioBoton = false
      }

    }


  }


  function eventosbtn() {
    const arrayEventoActualizar = [...document.querySelectorAll(".botonActualizar")];
    const arrayEventoEliminar = [...document.querySelectorAll(".botonEliminar")];

    let deletebtns = document.querySelector(".eliminar")
    // console.log(deletebtns)

    // console.log(arrayEventoEliminar)
    // console.log(arrayEventoActualizar)



    for (let i = 0; i < arrayEventoActualizar.length; i++) {
      const botones = arrayEventoActualizar[i];

      botones.addEventListener("click", (e) => {
        const id = e.currentTarget.id;
        actualizar(id);
        // console.log("holaaa")

      })
    }

    for (let i = 0; i < arrayEventoEliminar.length; i++) {
      const botones = arrayEventoEliminar[i];

      botones.addEventListener("click", (e) => {
        const id = e.currentTarget.id;
        contener_modal.style.display="flex";
        mensaje_modal.textContent="Desea eliminar este usuario ?"
        crearBotonesModal();
        const btn_aceptar=document.querySelector(".aceptar");
        btn_aceptar.addEventListener("click",()=>{
          eliminarUser(id);
          contener_modal.style.display="none";
        });

      });

    }


  }

  function filtrar(valorPalabra) {
    array_local = JSON.parse(localStorage.getItem("usuario"))
    let palabraSinEspacio = valorPalabra.replace(/ /g, "")
    const filtro = array_local.filter((palabra) => (palabra.nombre + palabra.apellido).replace(/ /g, "").includes(palabraSinEspacio));
    console.log(filtro)

    if (filtro.length > 0) {
      obtenerLocaStore(filtro)
      coteinercards.classList.remove("resgistro_no_encotrado")

    } else {
      coteinercards.innerHTML = " Registro no encontrado ";
      coteinercards.classList.add("resgistro_no_encotrado")

    }

  }
  buscarUsu.addEventListener("input", (e) => {
    e.preventDefault();
    filtrar(buscarUsu.value.toLowerCase());
    eventosbtn();

  })

  const contener_modal=document.querySelector(".contenedor_modal");
  const mensaje_modal=document.querySelector(".modal_texto");
  const cerrar_modal=document.querySelector(".cerrar");

function mostrar (mensaje) {
  container_botones.innerHTML="";
  contener_modal.style.display="flex";
  mensaje_modal.textContent=mensaje;
  cerrar_modal.addEventListener("click",(e)=>{
    contener_modal.style.display="none";

  }) 
}


const container_botones=document.querySelector(".modal_btn");
const boton_Cancelar=document.querySelector(".modal_btn");

function crearBotonesModal() {
  container_botones.innerHTML="";

  container_botones.innerHTML=`
  <button class="btns aceptar">Aceptar</button>
  <button class="btns cancelar">Cancelar</button>
  ` 
  boton_Cancelar.addEventListener("click",(e)=>{
    contener_modal.style.display="none";
  })
  cerrar_modal.addEventListener("click",(e)=>{
    contener_modal.style.display="none";

  }) 
}
// crearBotonesModal();













})