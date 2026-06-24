import { readonly, ref } from 'vue'
import {
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useFirebase } from '~/composables/useFirebase'

const currentUser = ref(null)
const loading = ref(false)
const error = ref('')
const initializing = ref(true)
let authInitialized = false

function mapUser(user) {
  if (!user) return null
  return {
    uid: user.uid,
    name: user.displayName || user.email,
    email: user.email,
    photoURL: user.photoURL || ''
  }
}

function initAuth() {
  if (!process.client || authInitialized) return

  const { auth, firestore } = useFirebase()
  if (!auth) {
    initializing.value = false
    return
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const mapped = mapUser(user)
      currentUser.value = mapped
      // Guardar información básica del usuario en la colección 'users' de Firestore
      if (firestore) {
        try {
          const userRef = doc(firestore, 'users', user.uid)
          await setDoc(userRef, mapped, { merge: true })
        } catch (err) {
          console.error('Error al guardar el usuario en Firestore:', err)
        }
      }
    } else {
      currentUser.value = null
    }
    initializing.value = false
  })

  authInitialized = true
}

export function useAuth() {
  initAuth()

  const loginWithGoogle = async () => {
    if (!process.client) return
    loading.value = true
    error.value = ''

    try {
      const { auth } = useFirebase()
      if (!auth) throw new Error('Firebase auth no disponible')

      await setPersistence(auth, browserLocalPersistence)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err: any) {
      error.value = err?.message || 'Error iniciando sesión'
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    if (!process.client) return
    const { auth } = useFirebase()
    if (!auth) return
    await signOut(auth)
  }

  return {
    currentUser: readonly(currentUser),
    loading: readonly(loading),
    error: readonly(error),
    initializing: readonly(initializing),
    loginWithGoogle,
    logout
  }
}
