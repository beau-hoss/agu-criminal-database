const fetch = require("node-fetch");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    psn,
    datetime,
    location,
    vehicle,
    property,
    charges,
    station,
    log,
    officerBadge
  } = req.body;

  if (!psn || !officerBadge) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const webhookURL = process.env.DISCORD_WEBHOOK;

  const message = {
    embeds: [
      {
        title: "🚔 Anti-Grief Unit Arrest Report",
        color: 3447003,
        fields: [
          { name: "Suspect PSN", value: psn, inline: true },
          { name: "Date & Time", value: datetime || "N/A", inline: true },
          { name: "Officer Badge #", value: officerBadge, inline: true },
          { name: "Location", value: location || "N/A", inline: false },
          { name: "Vehicle", value: vehicle || "N/A", inline: true },
          { name: "Property", value: property || "N/A", inline: true },
          { name: "Charges", value: charges || "N/A", inline: false },
          { name: "Booking Station", value: station || "N/A", inline: true },
          { name: "Event Log", value: log || "N/A", inline: false }
        ],
        footer: {
          text: "AGU Criminal Database"
        },
        timestamp: new Date()
      }
    ]
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
