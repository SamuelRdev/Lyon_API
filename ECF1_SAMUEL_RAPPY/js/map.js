
// Initialisation de la latitude et de la longitude de la carte
let lat = 45.7578;
let lon = 4.8351;
let lyonMap = null;

// Iinitialisation de la carte
function initMap() {
    // Création de l'objet "lyonMap" et insération dans l'élément HTML qui a l'ID "map"
    lyonMap = L.map('map').setView([lat, lon], 12);
    // Cartes non récupérées (tiles) par défaut par leaflet. On précise le lieu de récupération. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(lyonMap);

}

window.onload = function(){

    initMap(); 

};


let xhr = new XMLHttpRequest();
 
xhr.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=244d55a4a4a5a1be2dd10645b5fccdfccca74205'); 
 
xhr.addEventListener('load', function() {
 
    if (xhr.status >= 200 && xhr.status < 400) {

        callback(xhr.responseText);

    } else {

        callback(xhr.status);

    }
    
});
 
xhr.addEventListener('error', function() {
 
    console.log("erreur de connexion");
 
});
 
xhr.send(null);

function callback(response) {
  response = JSON.parse(response);
  response.forEach(function (info) {

//Différentes données que l'on va placer dans le popup
    var info_station =                                                                        
    '<div class="d-flex flex-column align-items-center justify-content-between pt-3 pe-3 ps-3">'  +
        '<ul>' +
            '<li class="pt-2"><span class="prequelmap">Station</span>: ' + info.address + '</li>' +
            '<li class="pt-2"><span class="prequelmap">Nombre de vélos</span>: ' + info.bike_stands + '</li>' +
            '<li class="pt-2"><span class="prequelmap">Nombre de vélos disponibles</span>: ' + info.available_bikes + '</li>' +
            '<li class="pt-2"><span class="prequelmap">Statut de la station</span>: ' + info.status + '</li>' +
        '</ul>' +
        '<button type="button" class="btn text-center btn-outline-dark resa" onclick="Function()">Réserver</button>' + 
    '</div>'

//Marqueurs
    L.marker(           

        [info.position.lat, info.position.lng],
        {
          "jcdecauxInfo": info}           // on stocke ici toutes les infos
      ) 
      .addTo(lyonMap)                     // fonction d'appel 
      .bindPopup(info_station);
  });
  
};



