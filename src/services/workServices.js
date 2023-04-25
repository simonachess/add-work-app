import firebase from "./firebaseConfig";

const SORT_OPTIONS = {
    "COMPANY_ASC": {
        column: 'company',
        direction: 'asc'
    },
    "COMPANY_DESC": {
        column: 'company',
        direction: 'desc'
    },
    "SERVICE_ASC": {
        column: 'service',
        direction: 'asc'
    },
    "SERVICE_DESC": {
        column: 'service',
        direction: 'desc'
    },
}

export const getAllWorks = (onWorkChanged, sortBy, user) => {
    firebase
        .firestore()
        .collection('timetable')
        .where('uid', '==', user?.uid)
        .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
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
    console.log('byid')
    firebase
        .firestore()
        .collection('timetable')
        .doc(id)
        .get()
        .then((docRef) => {
            console.log('docRef',docRef)
            item(docRef.data()) })

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

