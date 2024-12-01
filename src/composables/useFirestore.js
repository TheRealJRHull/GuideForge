// src/composables/useFirestore.js
import { ref, onUnmounted } from "vue";
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { db } from "@/firebase";

export default function useFirestore(collectionName, options = { orderByField: "createdAt", pageSize: 10 }) {
  const documents = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const lastVisible = ref(null);
  const unsubscribe = ref(null);
  const hasMore = ref(true);

  const { orderByField, pageSize } = options;

  // Fetch documents with pagination
  const fetchDocuments = async (isNextPage = false) => {
    loading.value = true;
    error.value = null;

    try {
      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef, orderBy(orderByField, "desc"), limit(pageSize));

      if (isNextPage && lastVisible.value) {
        q = query(collectionRef, orderBy(orderByField, "desc"), startAfter(lastVisible.value), limit(pageSize));
      }

      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        hasMore.value = false;
      } else {
        lastVisible.value = snapshot.docs[snapshot.docs.length - 1];
        if (!isNextPage) documents.value = [];
        snapshot.forEach((doc) => {
          documents.value.push({ id: doc.id, ...doc.data() });
        });
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Listen to real-time updates
  const listenToUpdates = () => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy(orderByField, "desc"));

    unsubscribe.value = onSnapshot(
      q,
      (snapshot) => {
        documents.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      },
      (err) => {
        error.value = err.message;
      }
    );
  };

  // Add a document
  const addDocument = async (data) => {
    try {
      await addDoc(collection(db, collectionName), data);
    } catch (err) {
      error.value = err.message;
    }
  };

  // Update a document
  const updateDocument = async (id, updatedData) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);
    } catch (err) {
      error.value = err.message;
    }
  };

  // Delete a document
  const deleteDocument = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      error.value = err.message;
    }
  };

  // Cleanup listener
  onUnmounted(() => {
    if (unsubscribe.value) {
      unsubscribe.value();
    }
  });

  return {
    documents,
    loading,
    error,
    hasMore,
    fetchDocuments,
    listenToUpdates,
    addDocument,
    updateDocument,
    deleteDocument,
  };
}
