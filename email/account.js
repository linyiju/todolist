const sgMail = require('@sendgrid/mail')

const sendGrindAPIkey = "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"

sgMail.setApiKey(sendGrindAPIkey)

const msg = {
    to: 'lynn8301@gmail.com', // Change to your recipient
    from: 'lynn8301@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent')
    })
    .catch((error) => {
    console.error(error)
    })