$(document).ready(function() {
    quejas.iniciar();
    quejas.leer();
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
        $("#usuario").text(window.user.email);
    },

    leer: function() {
        db.collection("emisiones").where("Tipo", "==", "Queja")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    quejas.render(doc);
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    },

    mostrar: function(id) {

    },

    render: function(doc) {
        var descripcion = $("<span></span>").text(doc.data().Descripcion);
        var hashtag = $("<span></span>").text(doc.data().Hashtag);
        var ruta = $("<span></span>").text(doc.data().Ruta);
        var date = new Date();

        var hours = date.getHours();
        date = new Date();
        var hours = date.getHours();
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var time = hours + ":" + minutes;
        var span_fecha = $("<span></span>").text(time);

        var li = $("<li></li>");
        li.append(descripcion, hashtag, ruta, span_fecha);


    };
};
