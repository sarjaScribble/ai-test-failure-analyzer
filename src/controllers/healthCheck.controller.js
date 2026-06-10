
exports.health = async (req, res) => {
  const report = "Healthy"

  res.status(201).json(report);
};