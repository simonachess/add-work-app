import firebase, { app } from '../firebaseConfig';


const auth = app.auth();

const db = app.firestore();

const register = async (name, email, password) => {
    try {
        //naudojame async await nes laukiamia kol google sukurs useri
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        await db.collection('users')
            .add({
                uid: user.uid,
                name,
                authProvider: 'local',
                email
            })
    }
    catch (error) {
        console.log(error.message)
    }
}

const logout = () => {
    auth.signOut();
}

const signIn = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
    }
    catch (error) {
        console.log(error.message)
    }
}


export default firebase;

export {
    auth,
    db,
    register,
    logout,
    signIn
}