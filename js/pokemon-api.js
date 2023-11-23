let body= "";
let ini= 0;
const bototn = document.querySelector('#load-more');


async function obtenerPokemons(inicio = 0) {
    document.querySelector('#mostrar-cargando').textContent="CARGANDO...";
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${inicio}&limit=20`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    return data.results.map((pokemon, index) => {
        return {
            id: inicio + index + 1,
            nombre: pokemon.name,
            imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${inicio + index + 1}.png`

        };
    });
}

obtenerPokemons().then(pokemons =>  mostrar_pokemons(pokemons));

function mostrar_pokemons (poketodos){
    for (let i=0; i<poketodos.length; i++){
      body +=`<div class="box">
       <div class="icons">
        <span>${poketodos[i].id}</span>
       </div>
        <div class="image">
           <img src="${poketodos[i].imagen}" alt="">
        </div>
        <div class="content">
           <h3>${poketodos[i].nombre}</h3>
        </div>
     </div>`;
     document.getElementById('content').innerHTML = body;
    }
    document.querySelector('#mostrar-cargando').textContent="";
}

bototn.addEventListener('click', function(){
    ini = ini+20;
    obtenerPokemons(ini).then(pokemons => mostrar_pokemons(pokemons));

});