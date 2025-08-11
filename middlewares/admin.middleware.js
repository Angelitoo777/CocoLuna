export const isAdmin = (req, res, next) => {
  const { role } = req.user

  if (role !== 'Admin') {
    return res.status(403).json({ message: 'Acceso no autorizado' })
  }

  next()
}
