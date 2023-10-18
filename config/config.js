require('dotenv').config()
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const DBURI = process.env.DBURI

module.exports = {
  DBURI,
  PORT,
  SECRET,
}