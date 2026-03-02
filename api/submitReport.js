let reports = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    reports.push(req.body);
    res.status(200).json({ success: true });
  }
}