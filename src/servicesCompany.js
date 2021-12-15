import firebase from "./firebase";


export const addCompany = (companies) => {
    firebase
        .firestore()
        .collection('companies')
        .add(companies)
}

export const deleteCompany = (idCompany) => {
    firebase
        .firestore()
        .collection('companies')
        .doc(idCompany)
        .delete()
}

export const getAllCompanies = (onCompanyChanged) => {
    firebase
        .firestore()
        .collection('companies')
        .onSnapshot((snapshot) => {
            const newCompany = snapshot.docs.map(doc => ({
                idCompany: doc.id,
                ...doc.data()
            }))
            onCompanyChanged(newCompany)
        })
}