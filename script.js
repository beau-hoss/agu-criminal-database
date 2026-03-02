function submitReport() {

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

  let reports = JSON.parse(localStorage.getItem("aguReports")) || [];

  reports.push(report);

  localStorage.setItem("aguReports", JSON.stringify(reports));

  alert("Report Submitted");

  loadReports();
}

function loadReports() {

  const reports = JSON.parse(localStorage.getItem("aguReports")) || [];

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

document.addEventListener("DOMContentLoaded", loadReports);
