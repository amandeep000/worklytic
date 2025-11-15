export const protect = async (req, res, next) => {
  try {
    const { userId } = await req.auth();
    console.log("AUTH:", req.auth);
    console.log("USER ID:", req.auth.userId);
    console.log("ORG:", req.auth.orgId);
    console.log("SESSION CLAIMS:", req.auth.sessionClaims);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      message: "Unauthorized access. Please log in again.",
      error: error.code || error.message,
    });
  }
};
