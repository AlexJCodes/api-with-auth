const loginButton = document.querySelector("#login-btn");
const loginMessage = document.querySelector("#login-message");

const params = new URLSearchParams(window.location.search);
const message = params.get("message");

if (message) {
  loginMessage.textContent = message;
}

loginButton.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: "admin",
        password: "123",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      loginMessage.textContent = data.message;
      return;
    }

    window.location.href = "protected.html";
  } catch {
    loginMessage.textContent = "Could not connect to the server";
  }
});