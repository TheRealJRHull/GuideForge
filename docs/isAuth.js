# **`isAuth.js` Manual**

## **Overview**
`isAuth.js` is a simple Vue composable designed to track whether a user is authenticated using Firebase Authentication. It listens for changes in the authentication state and provides a reactive status (`isAuthenticated`) and a loading state (`isLoading`).

---

## **Features**
- **Authentication Status**:
  - Tracks if the user is logged in (`isAuthenticated`).
- **Loading State**:
  - Indicates when the authentication status is being determined (`isLoading`).
- **Real-Time Updates**:
  - Updates automatically when the user logs in or out.

---

## **Setup**

### **1. Prerequisites**
Ensure Firebase is properly configured in your project and includes the `auth` instance. Your `firebase.js` file might look like this:
```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## **API Reference**

### **Initialization**
Import and call the composable in your Vue component:
```javascript
import { isAuth } from "@/composables/isAuth";

const { isAuthenticated, isLoading } = isAuth();
```

- **`isAuthenticated`** *(ref)*: Reactive boolean indicating whether the user is logged in.
- **`isLoading`** *(ref)*: Reactive boolean indicating whether the authentication status is still being determined.

---

## **Reactive Variables**

### **`isAuthenticated`**
- **Type**: `ref`
- **Description**: Tracks the user’s authentication status (`true` if authenticated, `false` otherwise).
- **Example Usage**:
  ```javascript
  if (isAuthenticated.value) {
    console.log("User is authenticated");
  } else {
    console.log("User is not authenticated");
  }
  ```

### **`isLoading`**
- **Type**: `ref`
- **Description**: Indicates whether the authentication status is still being determined.
- **Example Usage**:
  ```javascript
  if (isLoading.value) {
    console.log("Checking authentication status...");
  } else {
    console.log("Authentication status determined");
  }
  ```

---

## **Examples**

### **1. Basic Usage**
```javascript
import { isAuth } from "@/composables/isAuth";

export default {
  setup() {
    const { isAuthenticated, isLoading } = isAuth();

    return { isAuthenticated, isLoading };
  },
};
```

#### Template:
```html
<div v-if="isLoading">
  <p>Loading...</p>
</div>
<div v-else>
  <p v-if="isAuthenticated">Welcome back!</p>
  <p v-else>Please log in to continue.</p>
</div>
```

---

### **2. Protecting Routes**
Use `isAuth.js` to guard routes in your Vue Router setup. This ensures only authenticated users can access certain pages.

#### Example:
```javascript
import { isAuth } from "@/composables/isAuth";

const { isAuthenticated } = isAuth();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated.value) {
          next();
        } else {
          next("/login");
        }
      },
    },
    { path: "/login", name: "Login", component: Login },
  ],
});
```

---

### **3. Accessing Auth State in Components**
```javascript
import { isAuth } from "@/composables/isAuth";

export default {
  setup() {
    const { isAuthenticated, isLoading } = isAuth();

    return { isAuthenticated, isLoading };
  },
};
```

#### Template:
```html
<div>
  <h1>My App</h1>
  <div v-if="isLoading">
    <p>Checking authentication status...</p>
  </div>
  <div v-else-if="isAuthenticated">
    <p>Welcome to your dashboard!</p>
  </div>
  <div v-else>
    <p>You are not logged in. Please sign in.</p>
  </div>
</div>
```

---

## **Best Practices**
1. **Handle Loading Gracefully**:
   - Use the `isLoading` reactive variable to show a spinner or placeholder content while authentication status is being determined.
2. **Combine with `useAuth.js`**:
   - Pair this with `useAuth.js` for managing sign-in and sign-out actions in addition to checking authentication status.
3. **Protect Sensitive Routes**:
   - Use `isAuthenticated` in Vue Router’s `beforeEnter` hooks to restrict access to certain pages.

---

## **Advanced Use**

If you want to track additional user details (e.g., email or display name), modify `isAuth.js` to store the user object:
```javascript
const user = ref(null);

onAuthStateChanged(auth, (currentUser) => {
  isAuthenticated.value = !!currentUser;
  user.value = currentUser;
  isLoading.value = false;
});
```

Expose `user` in the returned object:
```javascript
return { isAuthenticated, isLoading, user };
```

You can now use `user` to access more details:
```javascript
if (user.value) {
  console.log("User email:", user.value.email);
}
```
