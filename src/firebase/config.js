import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const config = {
  apiKey: "AIzaSyBr9n_rHICarMF_af4AC8_u864u8SBh5Ts",
  authDomain: "hmpengineeringsolutions.firebaseapp.com",
  projectId: "hmpengineeringsolutions",
  storageBucket: "hmpengineeringsolutions.appspot.com",
  messagingSenderId: "558119702419",
  appId: "1:558119702419:web:7093c76856795609982266"



}

const app = initializeApp(config)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
