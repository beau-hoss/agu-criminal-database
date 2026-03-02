// submitReport.js

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK;

  console.log("ENV WEBHOOK:", webhookUrl);
  console.log("REQUEST BODY:", req.body);

  if (!webhookUrl) {
    return res.status(500).json({ success: false, error: "Webhook not set" });
  }

  const report = req.body;

  const message = {
    content:
`🚔 **AGU Arrest Report**
Officer Badge: ${report.officerBadge || "N/A"}
Suspect PSN: ${report.psn || "N/A"}
Date: ${report.date || "N/A"}
Location: ${report.location || "N/A"}
Vehicle: ${report.vehicle || "N/A"}
Property: ${report.property || "N/A"}
Charges: ${report.charges || "N/A"}
Station: ${report.station || "N/A"}

Details:
${report.details || "N/A"}`
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });

    console.log("DISCORD RESPONSE STATUS:", response.status);

    if (!response.ok) {
      console.error("Discord webhook error:", await response.text());
      return res.status(500).json({ success: false, error: "Webhook POST failed" });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("SUBMITREPORT ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
