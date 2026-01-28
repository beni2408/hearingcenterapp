import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    company: {
      name: {
        type: String,
        default: "",
      },
      logo: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
    },

    office_hours: [
      {
        day: String,
        time: String,
      },
    ],

    footer_links: [
      {
        title: String,
        url: String,
      },
    ],

    map_url: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", footerSchema);
export default Footer;
