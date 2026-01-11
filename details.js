function saveDetails() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  // Save name locally for personalization
  localStorage.setItem("username", name);

  // Save user details in Firebase
  firebase.firestore().collection("users").add({
    name: name,
    age: age,
    gender: gender,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    window.location.href = "categories.html";
  })
  .catch((error) => {
    alert(error.message);
  });
}
