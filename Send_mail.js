const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");


const filePath = "patho/of/the/notepad";


const sendEmail = () => {
    fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

   
    const lines = data.split("\n");
    let reciever = "";
    let subject = "";
    let message = "";
    let attachmentPath = "";

    lines.forEach((line) => {
      if (line.startsWith("Reciever mail =")) {
        reciever = line.replace("Reciever mail =", "").trim();
      } else if (line.startsWith("subject =")) {
        subject = line.replace("subject =", "").trim();
      } else if (line.startsWith("message =")) {
        message = line.replace("message =", "").trim();
      } else if (line.startsWith("attatchment =")) {
        attachmentPath = line.replace("attatchment =", "").trim();
      }
    });
    console.log({ reciever, subject, message, attachmentPath });

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sender_mail", // Your email
        pass: "seder app password", // Your app password
      },
    });

    
    const mailOptions = {
      from: "sender_mail", // Sender address
      to: reciever, // Recipient address
      subject: subject, // Subject of the email
      text: message, // Plain text body
      attachments: [
        {
          filename: path.basename(attachmentPath),
          path: attachmentPath,
        },
      ],
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error: ", error);
      }
      console.log("Email sent: " + info.response);
    });
  });
};

// Watch for changes in the file
fs.watch(filePath, (eventType) => {
  if (eventType === 'change') {
    console.log("File has been modified, sending email...");
    sendEmail();
  }
});

console.log("Watching for changes in the file...");
