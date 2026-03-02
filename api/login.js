export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const approvedBadges = ["1001", "1002", "2001", "3007"];

  try {
    const { badge } = req.body;

    if (!badge) {
      return res.status(400).json({ success: false, message: "Badge required" });
    }

    if (approvedBadges.includes(String(badge).trim())) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
