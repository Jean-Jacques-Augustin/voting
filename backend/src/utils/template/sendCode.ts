import {sendEmail} from "../mail";


const SignupEmail = (email: string, name: string, code: string) => {
    sendEmail(email, "Verification code for Vontig", `
				<!DOCTYPE html>
			<html lang="en">
			<head>
			<meta charset="UTF-8">
			<title>Verification Code from the Voting Team</title>
			<style>
			  body {
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				background-color: #f8f8f8;
			  }
			  h1, h2 {
				font-weight: bold;
				margin-top: 0;
				margin-bottom: 16px;
			  }
			  p {
				margin-top: 0;
				margin-bottom: 16px;
			  }
			  .container {
				max-width: 600px;
				margin: 0 auto;
				padding: 16px;
				background-color: #ffffff;
				border-radius: 8px;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
			  }
			  .header {
				background-color: #004080;
				color: #ffffff;
				padding: 16px;
				border-radius: 8px 8px 0 0;
			  }
			  .footer {
				background-color: #f8f8f8;
				color: #666666;
				padding: 16px;
				border-radius: 0 0 8px 8px;
				font-size: 14px;
			  }
			</style>
			</head>
			<body>
			<div class="container">
			  <div class="header">
				<h1>Verification Code</h1>
			  </div>
			   <br>
			  <div class="content">
			 
				<p>Dear ${name},</p>
				<p>Thank you for signing up for our service. To complete your registration, please enter the following verification code:</p>
				<h2>${code}</h2>
				<p>If you did not request this verification code, please ignore this email.</p>
			  </div>
			   <br>
			  <div class="footer">
				<p>Thank you,</p>
				<p>The Voting Team</p>
			  </div>
			</div>
			</body>
			</html>
		`).then(r => console.log(r)).catch(e => console.log(e));
};

export default SignupEmail;