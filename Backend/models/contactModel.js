import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  Email: { type: String, required: true },
  Phone_Number: { type: String, required: true },
  Message: { type: String, required: true },
});

const contactModel = mongoose.model("Contact", contactSchema);

export default contactModel;
