$(document).ready(function() {
    quejas.iniciar();
    quejas.lanzarAgenteDeQuejas();
});

var quejas = {
    iniciar: function() {
        // Initializa firestore app
        firebase.initializeApp(config);
        // Initialize database Firebase
        db = firebase.firestore();
        // Habilitar las estampillas del tiempo en los snapshots
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var auth = firebase.auth();
        auth.currentUser = window.user;
        //$("#usuario").text(window.user.email);
    },

    // leer: function() {
    //     db.collection("emisiones").where("Tipo", "==", "Queja")
    //         .get()
    //         .then(function(querySnapshot) {
    //             querySnapshot.forEach(function(doc) {
    //                 quejas.render(doc);
    //             });
    //             quejas.lanzarAgenteDeQuejas();
    //         })
    //         .catch(function(error) {
    //             console.log("Error getting documents: ", error);
    //         });
    // },

    mostrar: function(id) {

    },

    render: function(doc) {
        var descripcion = $("<span></span>").html("<b>Descripción: </b>" +  doc.data().Descripcion);
        var hashtag = $("<span></span>").text(doc.data().HashTag);
        hashtag.addClass("hashtag");
        var ruta = $("<span></span>").html("<b>Ruta: </b>" + doc.data().Ruta);
        var span_fecha = getTiempo(doc.data().Fecha);
        span_fecha.addClass("fecha");

        var li = $("<li></li>");
        li.addClass("list-group-item");
        li.addClass("list-group-item-action");
        li.attr("id", doc.id);
        li.append(descripcion, ruta, span_fecha,  hashtag);
        $(".list-group").prepend(li);
    },

    lanzarAgenteDeQuejas: function() {
        db.collection("emisiones").where("Tipo", "==", "Queja")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    quejas.render(change.doc);
                }
                if (change.type === "removed") {
                    var item = document.getElementById(change.doc.id);
                    item.parentNode.removeChild(item);
                }
            });
        });
    }
};

function getTiempo(time) {
    // Recuperar la hora
    var date = time.toDate();
    var hoy = new Date();
    hoy = hoy.getDay() + "," + hoy.getDate() + "," + hoy.getFullYear();
    aux = date.getDay() + "," + date.getDate() + "," + date.getFullYear();

    if(aux == hoy) {
       // Hours part from the timestamp
       var hours = date.getHours();
       // Minutes part from the timestamp
       var minutes = ('0' + date.getMinutes()).slice(-2);
       var formato = hours + ":" + minutes;
       return $("<span></span>").text("Hoy " + formato);
    }
    // Se agrega la fecha completa
    else {
       return $("<span></span>").text(date.toLocaleString());
    }
}
