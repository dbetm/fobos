$(document).ready(function() {
    acceso.iniciar();

    //Handle Account Status
    firebase.auth().onAuthStateChanged(user => {
        if(user != null) {
            window.user = user;
            window.location = 'vistas/dashboard.html'; //After successful login, user will be redirected to home.html
        }
    });
});

var acceso = {
    iniciar: function() {
        // Initializa firestore app
        firebase.initializeApp(config);
        // Initialize database Firebase
        db = firebase.firestore();
        // Habilitar las estampillas del tiempo en los snapshots
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
    },

    // Para intentar iniciar sesión
    signIn: function() {
        var pass = $("#password").val();
        var email = $("#email").val();
        // Para iniciar sesión con
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    },

    // Para cerrar sesión
    signOut: function() {
        var pass = $("#password").val();
        var email = $("#email").val();
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    },
};
