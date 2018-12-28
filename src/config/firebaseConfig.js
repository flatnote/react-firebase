import firebase from "firebase";

export const init = () => {
    let config = {
        apiKey: "AIzaSyCZruAOzhPufsLJlKw-TNzp6KhccwdOkC4",
        authDomain: "ball-bon.firebaseapp.com",
        databaseURL: "https://ball-bon.firebaseio.com",
        projectId: "ball-bon",
        storageBucket: "ball-bon.appspot.com",
        messagingSenderId: "234763764087"
    };
    console.log(config)
    return firebase.initializeApp(config);
}