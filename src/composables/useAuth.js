import { ref } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

export function useAuth() {
  const user = ref(null)
  const auth = getAuth()

  // Listen for auth state changes
  auth.onAuthStateChanged((currentUser) => {
    user.value = currentUser
  })

  // Google Sign-In function
  const signIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        user.value = result.user
      })
      .catch((error) => {
        console.error('Error signing in:', error)
      })
  }

  // Sign-Out function
  const signOutUser = () => {
    signOut(auth).then(() => {
      user.value = null
    }).catch((error) => {
      console.error('Error signing out:', error)
    })
  }

  return { user, signIn, signOut: signOutUser }
}
