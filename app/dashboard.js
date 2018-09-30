$(document).ready(function() {
    tablero.iniciar();
    // Get the Sidebar
    var mySidebar = document.getElementById("mySidebar");
    // Get the DIV with overlay effect
    var overlayBg = document.getElementById("myOverlay");

    tablero.getNumeroQuejas();
    tablero.getNumSugerencias();
    tablero.getNumPorDia();
    tablero.getNumPorSemana();
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
        console.log(user.email);

        // var name, email, photoUrl, uid, emailVerified;

        // if (user != null) {
        //   name = user.displayName;
        //   email = user.email;
        //   photoUrl = user.photoURL;
        //   emailVerified = user.emailVerified;
        //   uid = user.uid;
        // }
    },

    getNumeroQuejas: function() {
        getStat("quejas", "numQuejas");
    },

    getNumSugerencias: function() {
        getStat("sugerencias", "numSugerencias");
    },

    getNumPorDia: function() {
        db.collection('emisiones').where("created_at", "==", new Date()).get().then(snap => {
            $("#numPorDia").text(snap.size);
        });
    },

    getNumPorSemana: function() {
        // Al día de hoy
        var d = new Date();
        // Se le restan 7 días
        var d1 = d.setDate(d.getDate()-7);

        db.collection('emisiones').where("created_at", "<=", d).where("created_at", ">=", d1).get().then(snap => {
            $("#numPorDia").text(snap.size);
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

function getStat(documento, id) {
    var docRef = db.collection("stats").doc(documento);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            $("#"+id).text(doc.data().contador);
        }
        else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
