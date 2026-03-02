let reports = []; // Shared in-memory database

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const report = req.body;

    // Basic validation
    if (!report || !report.psn || !report.officerBadge) {
      return res.status(400).json({ success: false, message: "Invalid report" });
    }

    reports.push(report);
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(reports);
  }

  return res.status(405).json({ message: "Method not allowed" });
};
