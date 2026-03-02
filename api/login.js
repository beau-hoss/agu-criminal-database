module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const approvedBadges = ["1001", "1002", "2001", "3007"];
  const { badge } = req.body;

  if (approvedBadges.includes(String(badge).trim())) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
};
