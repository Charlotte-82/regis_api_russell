const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("En-tête Authorization manquant ou mal formaté");
    return res
      .status(401)
      .json({ message: "Pas de token, autorisation refusée" });
  }

  const token = authHeader.substring(7);
  console.log("Token récupéré :", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Pas de token, autorisation refusée" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    console.log("Token vérifié, ID utilisateur :", decoded.id);
    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token invalide" });
    } else {
      return res.status(401).json({ message: "Erreur d'authentification" });
    }
  }
};

module.exports = authMiddleware;
