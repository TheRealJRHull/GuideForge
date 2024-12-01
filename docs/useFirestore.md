# **`useFirestore.js` Manual**

## **Overview**
The `useFirestore.js` composable simplifies interaction with Firebase Firestore in Vue 3 applications. It provides methods to perform CRUD operations, fetch documents with pagination, and listen to real-time updates. The composable is designed to be reusable across different Firestore collections.

---

## **Features**
- **Fetching Documents**:
  - Supports ordered and paginated queries.
  - Fetches additional pages of documents when needed.
- **Real-Time Updates**:
  - Automatically syncs Firestore data with the UI using `onSnapshot`.
- **CRUD Operations**:
  - Add, update, and delete documents in a specified Firestore collection.
- **Lifecycle Management**:
  - Automatically unsubscribes from listeners when components are destroyed.

---

## **Setup**

### **1. Prerequisites**
Ensure Firebase is properly configured in your project. You should have a `firebase.js` file like this:
```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

### **2. Import the Composable**
Place `useFirestore.js` in the `src/composables` directory of your Vue project. Import it where needed:
```javascript
import useFirestore from "@/composables/useFirestore";
```

---

## **API Reference**

### **Initialization**
```javascript
const { 
  documents, 
  loading, 
  error, 
  hasMore, 
  fetchDocuments, 
  listenToUpdates, 
  addDocument, 
  updateDocument, 
  deleteDocument 
} = useFirestore(collectionName, options);
```

- **`collectionName`** *(string)*: Name of the Firestore collection (e.g., "documents").
- **`options`** *(object)*:
  - `orderByField` *(string)*: Field to order by (default: `createdAt`).
  - `pageSize` *(number)*: Number of documents to fetch per page (default: `10`).

---

### **Reactive Variables**
- **`documents`** *(ref)*: Reactive array containing the fetched documents.
- **`loading`** *(ref)*: Reactive boolean indicating if a Firestore operation is in progress.
- **`error`** *(ref)*: Reactive string containing error messages (if any).
- **`hasMore`** *(ref)*: Reactive boolean indicating if more documents can be fetched.

---

### **Methods**

#### **`fetchDocuments(isNextPage = false)`**
Fetches documents from Firestore.
- **Parameters**:
  - `isNextPage` *(boolean)*: If `true`, fetches the next page of documents.
- **Example**:
  ```javascript
  fetchDocuments().then(() => console.log(documents.value));
  ```

#### **`listenToUpdates()`**
Subscribes to real-time updates for the collection. Automatically updates `documents` when changes occur in Firestore.
- **Example**:
  ```javascript
  listenToUpdates();
  ```

#### **`addDocument(data)`**
Adds a new document to the Firestore collection.
- **Parameters**:
  - `data` *(object)*: The document data to add.
- **Example**:
  ```javascript
  addDocument({ title: "New Guide", content: "Hello, World!", createdAt: Date.now() });
  ```

#### **`updateDocument(id, updatedData)`**
Updates a specific document in Firestore.
- **Parameters**:
  - `id` *(string)*: The ID of the document to update.
  - `updatedData` *(object)*: The fields to update.
- **Example**:
  ```javascript
  updateDocument("docId123", { title: "Updated Title" });
  ```

#### **`deleteDocument(id)`**
Deletes a document from Firestore.
- **Parameters**:
  - `id` *(string)*: The ID of the document to delete.
- **Example**:
  ```javascript
  deleteDocument("docId123");
  ```

---

## **Examples**

### **1. Fetch and Display Documents**
```javascript
import useFirestore from "@/composables/useFirestore";

export default {
  setup() {
    const { documents, loading, error, fetchDocuments } = useFirestore("documents");

    fetchDocuments();

    return { documents, loading, error };
  },
};
```

In your template:
```html
<div v-if="loading">Loading...</div>
<div v-if="error">{{ error }}</div>
<ul>
  <li v-for="doc in documents" :key="doc.id">{{ doc.title }}</li>
</ul>
```

---

### **2. Add a Document**
```javascript
import useFirestore from "@/composables/useFirestore";

export default {
  setup() {
    const { addDocument } = useFirestore("documents");

    const addNewGuide = () => {
      addDocument({ title: "My Guide", content: "Step 1: Do this...", createdAt: Date.now() });
    };

    return { addNewGuide };
  },
};
```

In your template:
```html
<button @click="addNewGuide">Add Guide</button>
```

---

### **3. Listen for Updates**
```javascript
import useFirestore from "@/composables/useFirestore";

export default {
  setup() {
    const { documents, listenToUpdates } = useFirestore("documents");

    listenToUpdates();

    return { documents };
  },
};
```

---

### **4. Update a Document**
```javascript
import useFirestore from "@/composables/useFirestore";

export default {
  setup() {
    const { updateDocument } = useFirestore("documents");

    const updateTitle = () => {
      updateDocument("docId123", { title: "Updated Guide Title" });
    };

    return { updateTitle };
  },
};
```

---

## **Best Practices**
1. **Error Handling**: Always check `error.value` after an operation to handle issues gracefully.
2. **Loading State**: Use `loading.value` to display a spinner or loading message during operations.
3. **Unsubscribe from Updates**: Real-time listeners are automatically cleaned up when the component is unmounted, ensuring efficient resource usage.

---
