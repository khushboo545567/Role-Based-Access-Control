const roleAccess = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ success: false, msg: "Access denied for your role!" });
      }
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong!" });
    }
  };
};
export { roleAccess };
