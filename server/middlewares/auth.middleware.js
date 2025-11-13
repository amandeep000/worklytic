export const protect = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = { id: userId };
    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      message: "Unauthorized access. Please log in again.",
      error: error.code || error.message,
    });
  }
};
