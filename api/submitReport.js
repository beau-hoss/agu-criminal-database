module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK;

  if (!webhookUrl) {
    return res.status(500).json({ success: false, error: "Webhook not set" });
  }

  const report = req.body;

  const message = {
    content:
`🚔 **AGU Arrest Report**
Officer Badge: ${report.officerBadge}
Suspect PSN: ${report.psn}
Date: ${report.date}
Location: ${report.location}
Vehicle: ${report.vehicle}
Property: ${report.property}
Charges: ${report.charges}
Station: ${report.station}

Details:
${report.details}`
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ success: false });
  }
};
