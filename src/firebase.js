import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyA60O0Iz797np5aoxi_HM8UkX2Tnq5Opu0",
    authDomain: "reactapp-1c379.firebaseapp.com",
    databaseURL: "https://reactapp-1c379.firebaseio.com",
    projectId: "reactapp-1c379",
    storageBucket: "reactapp-1c379.appspot.com",
    messagingSenderId: "635042103012",
    appId: "1:635042103012:web:79d5c6f01b336445"
};


class Firebase {

    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);

        //referenciando a database para ser acessada em outros locais
        this.app = app.database();
        this.storage = app.storage();
    }

    //Método de login
    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout() {
        return app.auth().signOut();
    }

    //Método de registro
    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password);

        //Armazenando o ID do usuário
        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        });
    };

    //função para verificar se o registro e conexão deu certo
    isInitialized() {
        //retorna um promisse
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }


    //verifica se há usuário logado
    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid
    }



    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null;
        }
        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid).once('value').then(callback);

    }
}

export default new Firebase();