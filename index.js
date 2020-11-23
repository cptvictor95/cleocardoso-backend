const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
var cors = require('cors')
const creds = require('./config')
const path = require('path')

// const { response } = require("express");

var transport = {
  host: creds.SMTP_HOST, // SMTP DO PROVEDOR DO EMAIL
  port: creds.SMTP_PORT,
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take messages')
  }
})

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var phone = req.body.phone
  var message = req.body.message
  var content = `Nome: ${name} \n Email: ${email} \n Whatsapp: ${phone} \n Mensagem: ${message}`

  var mail = {
    from: name,
    to: 'cleo@cleocardoso.com', // EMAIL QUE RECEBE AS MENSAGENS DO FORM
    subject: 'Nova mensagem de possível cliente',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
      console.log(err)
    } else {
      res.json({
        status: 'success'
      })
    }
  })
})

const app = express()
const PORT = process.env.PORT || 3002
app.use(cors())

app.use(express.json())

app.use('/', router)

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)
