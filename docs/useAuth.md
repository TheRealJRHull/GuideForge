# **`useAuth.js` Manual**

## **Overview**
`useAuth.js` is a Vue composable that simplifies authentication with Firebase. It provides:
- **Real-time user authentication state** monitoring.
- Google Sign-In using Firebase Authentication.
- Easy sign-out functionality.

---

## **Features**
- **Track Authentication State**:
  - Automatically listens for authentication state changes and updates the `user` reactive variable.
- **Google Sign-In**:
  - Uses Firebase's `GoogleAuthProvider` to handle OAuth-based Google Sign-In.
- **Sign-Out**:
  - Logs the user out and clears the `user` state.

---

## **Setup**

### **1. Prerequisites**
Ensure Firebase is configured in your project. You should have a `firebase.js` setup similar to this:
```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export default app;
```

---

## **API Reference**

### **Initialization**
Import the composable and initialize it in your Vue component:
```javascript
import { useAuth } from "@/composables/useAuth";

const { user, signIn, signOut } = useAuth();
```

- **`user`** *(ref)*: A reactive variable holding the currently signed-in user's data or `null` if no user is logged in.
- **`signIn`** *(function)*: Initiates Google Sign-In.
- **`signOut`** *(function)*: Logs the user out.

---

## **Reactive Variables**

### **`user`**
- **Type**: `ref`
- **Description**: Holds the currently authenticated user or `null` if no user is logged in.
- **Example Usage**:
  ```javascript
  console.log(user.value); // Prints the user object or null
  ```

---

## **Methods**

### **`signIn()`**
Initiates Google Sign-In using Firebase Authentication.
- **Parameters**: None.
- **Returns**: Nothing (updates `user` reactive variable upon success).
- **Example**:
  ```javascript
  signIn(); // Opens Google Sign-In popup
  ```

### **`signOut()`**
Logs out the currently authenticated user.
- **Parameters**: None.
- **Returns**: Nothing (clears `user` reactive variable upon success).
- **Example**:
  ```javascript
  signOut(); // Logs the user out
  ```

---

## **Examples**

### **1. Basic Authentication Flow**
```javascript
import { useAuth } from "@/composables/useAuth";

export default {
  setup() {
    const { user, signIn, signOut } = useAuth();

    return { user, signIn, signOut };
  },
};
```

#### Template:
```html
<div>
  <div v-if="user">
    <p>Welcome, {{ user.displayName }}</p>
    <button @click="signOut">Sign Out</button>
  </div>
  <div v-else>
    <p>Please sign in to continue.</p>
    <button @click="signIn">Sign In with Google</button>
  </div>
</div>
```

---

### **2. Access User Data**
After signing in, you can access the user's details from the `user` reactive variable:
```javascript
if (user.value) {
  console.log("User Name:", user.value.displayName);
  console.log("User Email:", user.value.email);
}
```

---

## **Error Handling**

### **Sign-In Errors**
If `signIn` fails, it logs the error to the console:
```javascript
console.error("Error signing in:", error);
```
You can add custom handling, such as showing a user-friendly message:
```javascript
const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      user.value = result.user;
    })
    .catch((error) => {
      alert("Sign-In failed. Please try again.");
      console.error("Error signing in:", error);
    });
};
```

### **Sign-Out Errors**
Similarly, errors during `signOut` are logged:
```javascript
console.error("Error signing out:", error);
```

---

## **Best Practices**
1. **Auth State Persistence**:
   - Firebase automatically persists the auth state across sessions, so users remain logged in even after refreshing the page.
2. **Guarding Routes**:
   - Use `user.value` to protect certain routes:
     ```javascript
     if (!user.value) {
       router.push("/login");
     }
     ```
3. **Display Loading State**:
   - While waiting for Firebase to confirm the auth state, show a loading spinner or message.

---

## **Advanced Use**
If you plan to use other authentication methods, extend `useAuth.js` with additional providers:
```javascript
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const facebookSignIn = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      user.value = result.user;
    })
    .catch((error) => {
      console.error("Error signing in with Facebook:", error);
    });
};
```
