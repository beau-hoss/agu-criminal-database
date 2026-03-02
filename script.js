document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const badge = document.getElementById("badge").value.trim();

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ badge })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("badge", badge);
        window.location.href = "/dashboard.html";
      } else {
        document.getElementById("error").innerText = "Unauthorized Badge #";
      }
    });
  }

});
