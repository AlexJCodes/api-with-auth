const greeting = document.querySelector("#greeting");
const logoutButton = document.querySelector("#logout-btn");

const fetchProtectedContent = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/greetings/admin",
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      window.location.href =
        "/?message=You must be logged in to view this page";
      return;
    }

    const data = await response.json();
    greeting.textContent = data.message;
  } catch {
    greeting.textContent = "Could not connect to the server";
  }
};

fetchProtectedContent();

logoutButton.addEventListener("click", async () => {
  try {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href =
      "/?message=You have been logged out";
  } catch {
    greeting.textContent = "Could not connect to the server";
  }
});