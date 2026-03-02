console.log("SCRIPT LOADED");

// LOGIN PAGE LOGIC
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    console.log("LOGIN BUTTON CLICKED");

    const badge = document.getElementById("badge").value.trim();
    const error = document.getElementById("error");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ badge })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("badge", badge);
        window.location.href = "/dashboard.html";
      } else {
        error.textContent = "Invalid Badge #";
      }

    } catch (err) {
      console.error("Login error:", err);
      error.textContent = "Server error.";
    }
  });
}


// DASHBOARD PAGE LOGIC
const submitBtn = document.getElementById("submitBtn");

if (submitBtn) {
  submitBtn.addEventListener("click", submitReport);
}

async function submitReport() {

  const badge = localStorage.getItem("badge");

  const report = {
    psn: document.getElementById("psn").value,
    date: document.getElementById("date").value,
    location: document.getElementById("location").value,
    vehicle: document.getElementById("vehicle").value,
    property: document.getElementById("property").value,
    charges: document.getElementById("charges").value,
    station: document.getElementById("station").value,
    details: document.getElementById("details").value,
    officerBadge: badge
  };

  try {
    const res = await fetch("/api/submitReport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report)
    });

    const data = await res.json();

    if (data.success) {
      alert("Report Submitted to Discord Log");
    } else {
      alert("Submission Failed");
    }

  } catch (err) {
    console.error("Submit error:", err);
    alert("Server error submitting report.");
  }
}
