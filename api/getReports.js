let reports = [];

export default function handler(req, res) {
  res.status(200).json(reports);
}