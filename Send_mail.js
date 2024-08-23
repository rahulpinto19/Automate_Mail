const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const filePath = "write\your\notepad\path";

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
    let currentField = null;

    // Function to extract values from curly braces
    const extractValue = (line) => {
      const match = line.match(/\{([^}]+)\}/);
      return match ? match[1].trim() : "";
    };

    lines.forEach((line) => {
      if (line.startsWith("Reciever mail =")) {
        reciever = extractValue(line);
        currentField = null;
      } else if (line.startsWith("subject =")) {
        subject = extractValue(line);
        currentField = null;
      } else if (line.startsWith("message =")) {
        message = extractValue(line);
        currentField = "message";
      } else if (line.startsWith("attatchment =")) {
        attachmentPath = extractValue(line);
        currentField = null;
      } else if (currentField === "message") {
        // Continuously append to the message if it's a multi-line message
        message += "\n" + line.trim();
      }
    });

    console.log({ reciever, subject, message, attachmentPath });

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sender mail", // Your email
        pass: "your app password", // go through online once how to get app password
      },
    });

    const mailOptions = {
      from: "sender mail", // Sender address
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
  if (eventType === "change") {
    console.log("File has been modified, sending email...");
    sendEmail();
  }
});

console.log("Watching for changes in the file...");
