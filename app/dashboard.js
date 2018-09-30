$(document).ready(function() {
    tablero.iniciar();
    // Get the Sidebar
    var mySidebar = document.getElementById("mySidebar");
    // Get the DIV with overlay effect
    var overlayBg = document.getElementById("myOverlay");

    tablero.getFlujo();
});

function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

var tablero = {
    iniciar: function() {
        // Initializa firestore app
        firebase.initializeApp(config);
        // Initialize database Firebase
        db = firebase.firestore();
        // Habilitar las estampillas del tiempo en los snapshots
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var user = firebase.auth().currentUser;
    },

    getFlujo: function() {
        var contDia = 0;
        var contSemana = 0;
        var contQuejas = 0;
        var contSugerencias = 0;
        $("#numPorSemana").text("0");
        // db.collection('emisiones').where("Fecha", "==", new Date()).get().then(snap => {
        //     $("#numPorDia").text(snap.size);
        // });
        db.collection("emisiones").get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var date = doc.data().Fecha.toDate();
                    var hoy = new Date();
                    var hoyAux = hoy;
                    hoy = hoy.getDay() + "," + hoy.getDate() + "," + hoy.getFullYear();
                    var aux = date.getDay() + "," + date.getDate() + "," + date.getFullYear();
                    if(aux == hoy) {
                        contDia++;
                        // No son buenas prácticas
                        $("#numPorDia").text(contDia);
                    }
                    var haceUnaSemana = new Date(hoyAux - 7);
                    if(date.getTime() >= haceUnaSemana.getTime()) {
                        contSemana++;
                        $("#numPorSemana").text(contSemana);
                    }
                    if(doc.data().Tipo == "Queja") {
                        contQuejas++;
                        $("#numQuejas").text(contQuejas);
                    }
                    else {
                        contSugerencias++;
                        $("#numSugerencias").text(contSugerencias);
                    }
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    },
};

var sesion = {
    cerrarSesion: function() {
        firebase.auth().signOut().then(function() {
            window.location = "../";
        }).catch(function(error) {
          // An error happened.
        });
    },
};

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}
