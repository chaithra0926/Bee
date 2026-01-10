import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

/* ================= LOGIN ================= */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // 🔍 Check if user details already exist
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      // ✅ Details already filled → go home
      window.location.href = "home.html";
    } else {
      // ❌ Details not filled → ask details
      window.location.href = "details.html";
    }

  } catch (error) {
    alert(error.message);
  }
};

/* ================= SIGN UP ================= */
window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // ✅ ALWAYS ask details after signup
      window.location.href = "details.html";
    })
    .catch(error => alert(error.message));
};

