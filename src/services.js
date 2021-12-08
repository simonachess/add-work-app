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

export const showById = (item, id) => {
    firebase
        .firestore()
        .collection('timetable')
        .doc(id)
        .get()
        .then((docRef) => { item(docRef.data()) })

}

export const deleteWork = (id) => {
    firebase
        .firestore()
        .collection('timetable')
        .doc(id)
        .delete()
}


export const updateWork = (id, data) => {
    firebase
        .firestore()
        .collection('timetable')
        .doc(id)
        .set(data)
}

