import { auth } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Protect page + redirect */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    // ✅ Logged in → go to categories
    window.location.href = "categories.html";
  }
});
