module.exports = (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const approvedBadges = ["1001", "1002", "2001", "3007"];
  const { badge } = req.body;

  if (!badge) {
    return res.status(400).json({ success: false });
  }

  if (approvedBadges.includes(String(badge).trim())) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
};
