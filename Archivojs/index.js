
const input_nombre=document.querySelector(".input_nombre")
const input_apellido=document.querySelector(".input_apellido")
const input_documento=document.querySelector(".input_documento")
const input_correo=document.querySelector(".input_correo")
const input_edad=document.querySelector(".input_edad")
const btn_guardar=document.querySelector(".btn_guardar")
const btn_actual=document.querySelector(".btn_actualiza")
const coteinercards=document.querySelector(".conteiner_cards")
const coteinerform=document.querySelector(".conteiner_form")
const coteinertitulo=document.querySelector(".conteiner_card_titulo")


const arrayPersonas=[]
let array_local;
let cambioBoton= false;
eventosbtn();

//__________________________________________________________
const vistaNombre=document.querySelector(".vista_nombre")
const vistaApellido=document.querySelector(".vista_apellido")
const vistaDocumento=document.querySelector(".vista_documento")
const vistaEdad=document.querySelector(".vista_edad")
const vistacorreo=document.querySelector(".vista_correo")
const vistaContador=document.querySelector(".vista_titulo_contador")

function agregarUsuario() {
  array_local=JSON.parse(localStorage.getItem("usuario")) || [];

  const buscarUsuario=array_local.find((usu)=>input_documento.value === usu.documento ) || "";
  console.log(buscarUsuario)

  if (buscarUsuario !== "") {
    alert(" El documento ingresado ya existe. ");
  }else{
   const objeto_user={
    nombre:`${input_nombre.value}`,
    apellido:`${input_apellido.value}`,
    documento:`${input_documento.value}`,
   correo:`${input_correo.value}`,
    edad:`${input_edad.value}`
  }
  
  if (array_local.length > 0) {
    array_local.unshift(objeto_user)
    localStorage.setItem("usuario",JSON.stringify(array_local));
   }else{
     arrayPersonas.unshift(objeto_user)
    localStorage.setItem("usuario",JSON.stringify(arrayPersonas));
   }

  }

   }

   btn_guardar.addEventListener("click",(e)=>{
     e.preventDefault();
     if (validar()) {
        alert(" porfavor llene los campos ")  
     }else{
      agregarUsuario();
     coteinerform.reset();
     obtenerLocaStore();
     eventosbtn();
     }
     
    })
// -______________________________________________________________________________________

function admiLocastore() {
  localStorage.setItem("usuario",JSON.stringify(array_local));
  
}

    obtenerLocaStore();
    function obtenerLocaStore() {

      coteinercards.innerHTML= "";
      array_local=JSON.parse(localStorage.getItem("usuario"))|| []

      array_local.map((valor,i)=>{
        const card= document.createElement("div")
        card.setAttribute("class","card")

        card.innerHTML=
      `
      <figure class="card_img"></figure>
      <h3 class="titulos  titulo_nombre">Nombre</h3>
      <p class="vista vista_nombre">${array_local[i].nombre}</p>
      <h3 class="titulos   titulo_apellido">Apellido</h3>
      <p class="vista  vista_apellido">${array_local[i].apellido}</p>
      <h3 class="titulos  titulo_documento">Documento</h3>
      <p class="vista  vista_documento">${array_local[i].documento}</p>
      <h3 class="titulos  titulo_correo">Correo</h3>
      <p class="vista  vista_correo">${array_local[i].correo}</p>
      <h3 class="titulos  titulo_edad">Edad</h3>
      <p class="vista vista_edad">${array_local[i].edad}</p>
      <div class="card_btn">
          <button class="botones actualizar" id=${array_local[i].documento}>Actualizar</button>
          <button class="botones eliminar" id=${array_local[i].documento}>Eliminar</button>
      </div>

      `
      coteinercards.appendChild(card);
      })
      vistaContador.textContent=array_local.length;
      // console.log(array_local.length) 
      return array_local;

    }
// ______________________________________________________________________________________
    function validar() {
      if (input_nombre.value ==="" || input_apellido.value === "" || input_documento.value === "" ||input_correo.value ===""|| input_edad.value ===""  ) {
          return true
      }else{
         return false
      }
  }

//__________________________________________________________________________________
  function eliminarUser(document_event) {
        let mensaje=confirm(" Deseas eliminar este Usuario")

        if (mensaje) {
          array_local= JSON.parse(localStorage.getItem("usuario"));
          for (let i = 0; i < array_local.length; i++) {
            if (array_local[i].documento === document_event) {
              array_local.splice(i,1)
              break 
            } 
          } 
          
        localStorage.setItem("usuario",JSON.stringify(array_local));
        obtenerLocaStore();
        eventosbtn();
        }
  }
//____________________________________________________________

function actualizar(documento_event) {
  array_local=JSON.parse(localStorage.getItem("usuario"))  

  const buscar= array_local.find((usu)=> documento_event === usu.documento);
  let valorObjecto= array_local[array_local.indexOf(buscar)];
  const indexObjecto= array_local.indexOf(valorObjecto);
  const user=array_local[indexObjecto];
  // const arayUser=[user.nombre,user.apellido,user.documento,user.edad]

  input_nombre.value = user.nombre;
  input_apellido.value = user.apellido;
  input_correo.value = user.correo;
  input_edad.value = user.edad;

  input_documento.setAttribute("readOnly", "true")
  cambioBoton=true;
  btn_guardar.classList.add("btn_ocultar")
  btn_actual.classList.remove("btn_ocultar")
  btn_actual.setAttribute("id", indexObjecto);
}
btn_actual.addEventListener("click",(e)=>{
  e.preventDefault();
  Editar(e.currentTarget.id);
  eventosbtn();
})

function Editar(indexObjecto) {
  if (cambioBoton) {
    array_local=JSON.parse(localStorage.getItem("usuario"))  
    console.log(indexObjecto);

    array_local[indexObjecto].nombre = input_nombre.value;
    array_local[indexObjecto].apellido = input_apellido.value;
    array_local[indexObjecto].correo = input_correo.value;
    array_local[indexObjecto].edad = input_edad.value;
    if (validar) {
      alert("ups.... complete todo la informacion ")
    }else{
      admiLocastore();
      obtenerLocaStore();
      eventosbtn();
      coteinerform.reset();
      btn_guardar.classList.remove("btn_ocultar")
      btn_actual.classList.add("btn_ocultar")
      input_documento.removeAttribute("readOnly");
      cambioBoton=false
    }
    
  }
  

}


function eventosbtn() {
  const arrayEventoActualizar=[...document.querySelectorAll(".actualizar")]
  const arrayEventoEliminar=[...document.querySelectorAll(".eliminar")]
  console.log(arrayEventoEliminar)


  for (let i = 0; i < arrayEventoActualizar.length; i++) {
      const botones= arrayEventoActualizar[i];

      botones.addEventListener("click",(e)=>{
          const id = e.currentTarget.id;
          actualizar(id);
          console.log("holaaa")

      })
  }

  for (let i = 0; i < arrayEventoEliminar.length; i++) {
    const botones = arrayEventoEliminar[i];

    botones.addEventListener("click",(e)=>{
       const id = e.currentTarget.id;
       eliminarUser(id);
       
    })
    
  }

  
}









// function guardaLocasotre() {
//     const miObjecto={
//         nombre:"robert",
//         apellido:"morelo",
//         documeto:1234,
//         edad:25
//     }

//     let nombre="pedro;"
    
//     localStorage.setItem("nombre",JSON.stringify(miObjecto))
//     // localStorage.setItem("nombre", nombre)
// }
// guardaLocasotre();

