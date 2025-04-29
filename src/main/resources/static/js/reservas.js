document.getElementById("formulario").addEventListener('submit', (event)=>{
    event.preventDefault();
});

function confirmación(){
const confirmación=document.getElementById("h1")

let nom=document.getElementById("nombre").value;
let fecha=document.getElementById("fecha").value;
let hora=document.getElementById("hora").value;


h1.textContent=`Hola ${nom}, agendaste una reservación con nosotros el día ${fecha} a las ${hora}. ¡Gracias por preferirnos!`
}

