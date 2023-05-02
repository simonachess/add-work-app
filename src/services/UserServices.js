import firebase from './firebaseConfig'

export const getUserData = (user, setUser) => {

    try {
        console.log(user)
        firebase
            .firestore()
            .collection('users')
            .where('uid', '==', user?.uid || '')
            .get()
            .then(console.log('user',user))
            .then(() => { setUser(user.providerData[0]) })
    }
    catch (error) {
        console.log(error)
    }

}