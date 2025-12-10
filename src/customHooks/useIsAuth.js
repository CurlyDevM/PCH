import React, { useEffect, useState } from 'react'
import firebase from 'firebase'

// WOW, that is beautiful! 😍
const useFirebaseAuth = () => {
  const [state, setState] = useState(null)
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setState(user)
    })
  }, []) // [] means don't re-run useEffect ever
  return state
}

function MyComponent () {
  const user = useFirebaseAuth() // Component now updates and listens for changes
  if (!user) return <p>You're not logged in!</p>
  return <p>Hello, {user.email}</p>
}