import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA9pe_SURRDZcO7eMVeFTFbgL3UByZNH-k',
  authDomain: 'nftfy-5ac58.firebaseapp.com',
  projectId: 'nftfy-5ac58',
  storageBucket: 'nftfy-5ac58.appspot.com',
  messagingSenderId: '576290200028',
  appId: '1:576290200028:web:f7c8a1e0fbe73907081719',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
