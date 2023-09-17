window.addEventListener("load", () => {
  let form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("name1");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const msgInput = document.getElementById("msg");

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailInput.value)) {
      alert("הכנס כתובת אימייל חוקית בבקשה");
      return;
    }

    // Create a user object
    const user = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      msg: msgInput.value,
    };

    // Get existing users from local storage or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array
    users = [...users, user];

    // Save the updated user array to local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Provide feedback to the user
    alert(`תודה רבה ${user.name} פרטיך נקלטו בהצלחה`);

    // Clear the form
    form.reset();
  });
});
