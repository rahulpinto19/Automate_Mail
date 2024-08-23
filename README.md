# Email Sender Script

This script uses Node.js and Nodemailer to send emails with content and attachments specified in a text file. It watches for changes to the file and automatically sends an email whenever the file is modified.

## Prerequisites

- Node.js installed on your machine.
- A Gmail account for sending emails (you may need to enable less secure apps or use an app password).

## Installation

1. Clone this repository or download the script file.
2. Navigate to the project directory in your terminal.
3. Install the required packages:   
4. Update the `filePath` variable in the script to point to your text file (e.g., `D:\\Desktop\\send_mail.txt`).

## Text File Format

The text file (`send_mail.txt`) should follow this format:
Reciever mail = recipient@example.com
subject = Your Email Subject
message = Your email message goes here.
attatchment = D:\path\to\your\attachment.txt

- **Reciever mail**: The email address of the recipient.
- **subject**: The subject line of the email.
- **message**: The body of the email.
- **attatchment**: The path to the file you want to attach.

## Usage

1. Update the sender's email and app password in the script:

   ```javascript
   user: "your_email@gmail.com",
   pass: "your_app_password",
## Important Notes
Ensure that your Gmail account settings allow sending emails via Nodemailer. You may need to configure your account to allow less secure apps or generate an app password if you have two-factor authentication enabled.
Be cautious with sharing your email credentials. It’s recommended to use environment variables or a configuration file that is not included in version control for sensitive information.
Modify the file paths as necessary, especially if you're working on different operating systems.
