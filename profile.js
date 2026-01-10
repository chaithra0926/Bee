import { auth } from "./firebase.js";
import { getFirestore, doc, setDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const db = getFirestore();

/* Protect page */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

/* Save user credentials */
window.saveDetails = async function () {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  if (!name || !age || !gender) {
    alert("Fill all fields");
    return;
  }

  const user = auth.currentUser;

  await setDoc(doc(db, "users", user.uid), {
    name,
    age,
    gender,
    email: user.email
  });

  window.location.href = "home.html";
};
