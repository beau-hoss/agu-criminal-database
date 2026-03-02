async function submitReport() {
  const report = {
    psn: document.getElementById("psn").value,
    datetime: document.getElementById("datetime").value,
    location: document.getElementById("location").value,
    vehicle: document.getElementById("vehicle").value,
    property: document.getElementById("property").value,
    charges: document.getElementById("charges").value,
    station: document.getElementById("station").value,
    log: document.getElementById("log").value,
    officerBadge: localStorage.getItem("badge")
  };

  const res = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report)
  });

  if (res.ok) {
    alert("Report Submitted");
    loadReports(); // Reload database
  } else {
    alert("Submission failed");
  }
}

async function loadReports() {
  const res = await fetch("/api/reports");
  const reports = await res.json();

  const container = document.getElementById("recordsList");
  container.innerHTML = "";

  reports.forEach(r => {
    container.innerHTML += `
      <div class="record">
        <p><strong>PSN:</strong> ${r.psn}</p>
        <p><strong>Date:</strong> ${r.datetime}</p>
        <p><strong>Officer Badge:</strong> ${r.officerBadge}</p>
        <p><strong>Charges:</strong> ${r.charges}</p>
        <hr/>
      </div>
    `;
  });
}

// Load reports on dashboard load
if (window.location.pathname.includes("dashboard")) {
  document.addEventListener("DOMContentLoaded", loadReports);
}
