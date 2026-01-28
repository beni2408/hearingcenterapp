import contactModel from "../models/contactModel.js";
import sendAdminMail from "../services/sendAdminMail.js";

export const newContact = async (req, res) => {
  const { First_Name, Last_Name, Email, Phone_Number, Message } = req.body;

  const newContact = await contactModel.create({
    First_Name,
    Last_Name,
    Email,
    Phone_Number,
    Message,
  });

  // admin mail
  await sendAdminMail({
    to: "jbmusicals240802@gmail.com",
    subject: "New Contact Form Submission",
    html: `
    <h1>New Contact Form Submission</h1>
    <p><strong>First Name:</strong> ${First_Name}</p>
    <p><strong>Last Name:</strong> ${Last_Name}</p>
    <p><strong>Email:</strong> ${Email}</p>
    <p><strong>Phone Number:</strong> ${Phone_Number}</p>
    <p><strong>Message:</strong> ${Message}</p>
  `,
  });

  // user mail

  await sendAdminMail({
    to: Email,
    subject: "Thank you for contacting us",
    html: `
    <h1>Thank you for contacting us</h1>
    <p>Dear ${First_Name} ${Last_Name},</p>
    <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
    <p>Best regards,</p>
    <p>The Hearing Center Support Team</p>
  `,
  });

  res.status(201).json({
    status: "Success",
    message: "Contact created successfully",
    data: { new_review: newContact },
  });
};

export const getAllContacts = async (req, res) => {
  const contacts = await contactModel.find();
  res.status(200).json({
    status: "Success",
    data: { contacts },
  });
};
