import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB4Pt9e1s8h2c16yP0z5kOueo0CoL6Ibmg",
    authDomain: "docs-7146b.firebaseapp.com",
    projectId: "docs-7146b",
    storageBucket: "docs-7146b.appspot.com",
    messagingSenderId: "711838891238",
    appId: "1:711838891238:web:56f8d77d16403eb6af8f27"
}

// initialize firebase app
initializeApp(firebaseConfig)


// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, where('author', '==', "Sadiq"))

// get collection data


onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
        .then(() => {
            addBookForm.reset()
        })

})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })

})