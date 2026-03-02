export default function handler(req, res) {
  const approvedBadges = ["1001", "1002", "2001", "3007"];

  const { badge } = req.body;

  if (approvedBadges.includes(badge)) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}