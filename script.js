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

  const res = await fetch("/api/submitReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(report)
  });

  if (res.ok) {
    alert("Report Successfully Logged to AGU Database (Discord)");
  } else {
    alert("Submission failed");
  }
}
