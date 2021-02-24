
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

const TASQUES = "tasques";

function refresh_view(tasques){
    //buidar tasklist
    $('li').remove();

    //omplir dades
    var cont =0;
    for(const tasca of tasques){
        cont++;
        $('ul').append("<li id='"+cont+"'class='ui-last-child'><a class='ui-btn' href='#'>"+tasca+"<button class='deleteButton'><img src='../img/delete.png' alt='x' /></button></a></li>");
        
    }
    //ESBORRAR TASCA
    $(".deleteButton").click(deleteElement);
}   

function deleteElement() {
    var element = $(this).parent().parent().attr('id');
    var dades = JSON.parse(localStorage.getItem(TASQUES));
    dades.splice(element-1, 1);
    localStorage.setItem(TASQUES, JSON.stringify(dades));

    refresh_view(dades);
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // aquest tros de codi el comentem pq l'element "deviceready" ja no existeix
    //document.getElementById('deviceready').classList.add('ready');

    // TODO: inicialitzar array tasques al localStorage si no existeix
    if(!localStorage.getItem(TASQUES)) {
        localStorage.setItem(TASQUES, JSON.stringify([]));
    }

    // AFEGIR TASCA
    $("#inputButton").click(function() {
        // pillem text de l'input
        var text = $('#taskInput').val();
        // agafem les dades del localStorage i afegim el nou text a la llista, tornat-la a guardar a LS
        var dades = JSON.parse(localStorage.getItem(TASQUES));
        dades.push(text);
        localStorage.setItem(TASQUES, JSON.stringify(dades));

        refresh_view(dades);
    });

    //inicialitzem tasklist amb les dades existents
    var dades = JSON.parse(localStorage.getItem(TASQUES));
    refresh_view(dades);
} 
