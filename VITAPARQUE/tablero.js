window.onload = function() {
   pantalla = document.getElementById("screen");
   btn_ssr = document.getElementById("btn_startStopResume");
   inp_tiempo = document.getElementById("tiempo");
   display_team_2 = document.getElementById("display_team_2");
   input_team_2 = document.getElementById("input_team_2");
   tx_input_team_2 = document.getElementById("tx_input_team_2");
   display_team_1 = document.getElementById("display_team_1");
   input_team_1 = document.getElementById("input_team_1");
   tx_input_team_1 = document.getElementById("tx_input_team_1");
   marcador_team1 = document.getElementById("marcador_team1");
   marcador_team2 = document.getElementById("marcador_team2");

   
   document.getElementById("input_team_2")
      .addEventListener("keyup", function (event) {
         event.preventDefault();
         if (event.keyCode === 13) {
            display_team_2.innerHTML = tx_input_team_2.value.trim();
            display_team_2.style.display = "block";
            input_team_2.style.display = "none";
         }
      });

   document.getElementById("input_team_1")
      .addEventListener("keyup", function (event) {
         event.preventDefault();
         if (event.keyCode === 13) {
            display_team_1.innerHTML = tx_input_team_1.value.trim();
            display_team_1.style.display = "block";
            input_team_1.style.display = "none";
         }
      });
}

function editNameTeam1() {
   tx_input_team_1.value = display_team_1.innerHTML.trim();
   display_team_1.style.display = 'none';
   input_team_1.style.display = 'block';
}

function editNameTeam2() {
   tx_input_team_2.value = display_team_2.innerHTML.trim();
   display_team_2.style.display = 'none';
   input_team_2.style.display = 'block';
}


var isMarch = false;
var started = false;
var acumularTime = 0;

function startStopResume(){
   // si no está corriendo ni se ha iniciado - se inicia
   if (isMarch == false && started == false) {
      tiempo_ini_add = parseInt(document.getElementById("tiempo").value, 10);
      if (!nat(tiempo_ini_add)){
         alert("Los minutos iniciales añadidos no son un número natural");
         return;
      }
      console.log("Se añadenn " + tiempo_ini_add + " minutos");
      timeInicial = new Date();
      timeInicial.setMinutes(timeInicial.getMinutes() - tiempo_ini_add); // el ultimo dato son los minutos adicionales
      control = setInterval(cronometro, 500);
      isMarch = true;
      started = true;
      btn_ssr.innerHTML = "Pause &#10074;&#10074;";
      inp_tiempo.style.visibility = "hidden";
      return;
   }

   // si está parado y fue iniciado - lo resume
   if (isMarch == false && started == true) {
      timeActu2 = new Date();
      timeActu2 = timeActu2.getTime();
      acumularResume = timeActu2 - acumularTime;

      timeInicial.setTime(acumularResume);
      control = setInterval(cronometro, 10);
      isMarch = true;
      btn_ssr.innerHTML = "Pause &#10074;&#10074;";
      return;
   }

   // si está andando lo detiene
   if (isMarch == true) {
      clearInterval(control);
      isMarch = false;
      btn_ssr.innerHTML = "Resume &#9658;";
      return;
   }

} // startStopResume

function start () {
   if (isMarch == false) {
      timeInicial = new Date();
      timeInicial.setMinutes(timeInicial.getMinutes() - 0); // el ultimo dato son los minutos adicionales
      control = setInterval(cronometro,500);
      isMarch = true;
   }
}

function cronometro () {
   timeActual = new Date();
   acumularTime = timeActual-timeInicial;
   acumularTime2 = new Date();
   acumularTime2.setTime(acumularTime);

   ss = acumularTime2.getSeconds();
   mm = acumularTime2.getMinutes();
   hh = acumularTime2.getHours() - 19;

   if (ss < 10) {ss = "0"+ss;}
   mm = mm + (hh * 60)
   if (mm < 10) {mm = "0"+mm;}

   pantalla.innerHTML = mm+":"+ss;
}


function stop () {
   if (isMarch == true) {
      clearInterval(control);
      isMarch = false;
   }
}

function resume () {
   if (isMarch == false) {
      timeActu2 = new Date();
      timeActu2 = timeActu2.getTime();
      acumularResume = timeActu2-acumularTime;

      timeInicial.setTime(acumularResume);
      control = setInterval(cronometro,10);
      isMarch = true;
   }
} // resume

function reset () {
   if (isMarch == true) {
      clearInterval(control);
      isMarch = false;
   }
   acumularTime = 0;
   started = false;
   pantalla.innerHTML = "00:00";
   btn_ssr.innerHTML = "Start &#9658;";
   document.getElementById("tiempo").value = 0;
   inp_tiempo.style.visibility = "visible";
} // reset

function nat(n) {
   return n >= 0 && Math.floor(n) === +n;
} // nat


/**
 * Función que modifica la puntuación en el marcador
 * 
 * @params  string elemento: El elemento referenciado para sumar o restar
 *          int adicionar: La cantidad de puntos a adicionar o restar
 */
function sumarPuntuacion(elemento, adicionar) {
   score = parseInt(document.getElementById(elemento).innerHTML); // obtenemos el número del elemento referenciado
   adicionar = parseInt(adicionar); // parseamos el adicionar

   if(adicionar > 0) // si es positvo (hicieron gol)
      hicieronGol(); // llamar a la función del gol

   if( !(adicionar < 0 && score == 0) ) // si están restando y está en ceros no hacer nada
      document.getElementById(elemento).innerHTML = score + adicionar; // suma uno al valor actual del elemento referenciado
} // sumarPuntuacion

function hicieronGol(){
   
   gol.style.width = '100%';
   gol.style.display = 'block';
   gol.value = gol.innerHTML.trim();
   //alert("Golazo !!");

}

function salirGol(){
   
   //gol.style.width = '100%';
   gol.style.display = 'none';
   gol.value = gol.innerHTML.trim();
   //alert("Golazo !!");

}

function editMarquee() {
   texto = prompt("Ingrese el texto del mensaje");
  	document.getElementById("marquee_txt").innerHTML = texto;
}
