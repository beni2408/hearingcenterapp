import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    menu_title: {
      type: String,
      required: true,
      trim: true,
    },

    menu_url: {
      type: String,
      required: true,
      trim: true,
    },

    menu_order: {
      type: Number,
      default: 0,
    },

    menu_status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const menuModel = mongoose.model("Menus", menuSchema);
export default menuModel;
