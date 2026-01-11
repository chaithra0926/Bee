import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* CHECK USER & SHOW DETAILS */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in → go to login
    window.location.href = "index.html";
  } else {
    // Show user details
    document.getElementById("userEmail").innerText = user.email;
  }
});

/* NEXT BUTTON */
window.goNext = function () {
  window.location.href = "categories.html";
};

/* LOGOUT */
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

