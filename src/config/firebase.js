// Swal.fire({
//     title: 'Custom width, padding, color, background.',
//     width: 600,
//     padding: '3em',
//     color: '#716add',
//     background: '#fff url(/images/trees.png)',
//     backdrop: `
//       rgba(0,0,123,0.4)
//       url("/images/nyan-cat.gif")
//       left top
//       no-repeat
//   })

// Firebase
import swal from "sweetalert";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    FacebookAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    collection,
    onSnapshot, where, query, getDoc, getDocs,DocRef
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js"


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBA3hRw08Z48N3pxt22D6DzmDHZnqh6r-M",
    authDomain: "foodpanda-clone-60754.firebaseapp.com",
    projectId: "foodpanda-clone-60754",
    storageBucket: "foodpanda-clone-60754.appspot.com",
    messagingSenderId: "984141674834",
    appId: "1:984141674834:web:cf43e13e84dfe0d8b3e28b",
    measurementId: "G-63RHZM5049"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)




const signInGoogle = async () => {
    try {
        var provider = new GoogleAuthProvider();
        const result = await auth;
        await signInWithPopup(auth, provider);
        console.log('before sending')
        // await addUserToDB();
        console.log('after sending')
        await swal("Congratulations!", "Loggined successfully!", "success");
    } catch (e) {
        console.log(e.message);
    }
};




// adding users to database
const addUserToDB = async () => {
    const uid = auth.currentUser.uid;
    var userProfile = { email: "", name: "", photoUrl: "" };
    userProfile.email = auth.currentUser.email;
    userProfile.name = auth.currentUser.displayName;
    userProfile.photoUrl = auth.currentUser.photoURL;

    return setDoc(doc(db, "users", uid), userProfile);
};


const addUserToDBSignup = async (userName) => {
    const uid = auth.currentUser.uid;
    var userProfile = { email: "", name: "", photoUrl: "" };
    userProfile.email = auth.currentUser.email;
    userProfile.name = userName;
    userProfile.photoUrl = auth.currentUser.photoURL;

    return setDoc(doc(db, "users", uid), userProfile);
};








// Auth Keep loggined
function keeploggined() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User is loggined");
        } else {
            console.log("User is signed out");
        }
    });
}
keeploggined()


export {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    getFirestore,
    doc,
    setDoc,
    swal,
    auth,
    db,
    FacebookAuthProvider,
    addUserToDB,
    addDoc,
    collection,
    getStorage, ref, uploadBytes, getDownloadURL,
    storage,
    onSnapshot, where, query, getDoc, getDocs,
    signInGoogle,
    createUserWithEmailAndPassword,
    addUserToDBSignup,
    signInWithEmailAndPassword,
    DocRef

}

