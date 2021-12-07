import firebase from "./firebase";

export const getAllWorks = (onWorkChanged) => {
    firebase
        .firestore()
        .collection('timetable')
        .onSnapshot((snapshot) => {
            const newWork = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            onWorkChanged(newWork)
        })
}

export const addWork = (data) => {
    firebase
        .firestore()
        .collection('timetable')
        .add(data)

}

export const showById = () => {


}

export const deleteWork = (id) => {
    firebase
        .firestore()
        .collection('timetable')
        .doc(id)
        .delete()
}


export const updateWork = () => {

}

