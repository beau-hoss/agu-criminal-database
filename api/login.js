module.exports = (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const approvedBadges = ["416",
    "10194",
    "4800",
    "928",
    "148",                          
    "491",
    "824",
    "515",
    "741",
    "9951",
    "491",
    "304",
    "392",
    "404",
    "1738",
    "0420",
    "7201",
    "332",
    "454",
    "8691",
    "559",
    "1919",
    "181",
    "1738",
    "231",
    "90210",
    "47884",
    "678",
    "6767",
    "568",
    "2006",
    "918",
    "3690",
    "999",
    "10194",
    "6039",
    "491",
    "6741",
    "504",
    "928"];
  const { badge } = req.body;

  if (approvedBadges.includes(String(badge).trim())) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
};




