async function login() {
  const badge = document.getElementById("badge").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ badge })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("badge", badge);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Unauthorized Badge #";
  }
}

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

  await fetch("/api/submitReport", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report)
  });

  alert("Report Submitted");
  loadReports();
}

async function loadReports() {
  const res = await fetch("/api/getReports");
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

if (window.location.pathname.includes("dashboard")) {
  loadReports();
}