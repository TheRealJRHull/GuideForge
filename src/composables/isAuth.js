// src/composables/isAuth.js
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase'; // Import Firebase auth instance

export function isAuth() {
  const isAuthenticated = ref(false);
  const isLoading = ref(true); // Track loading state

  onMounted(() => {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      isAuthenticated.value = !!user; // Update auth status
      isLoading.value = false; // Stop loading once the auth state is determined
    });
  });

  return { isAuthenticated, isLoading };
}
