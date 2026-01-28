import mongoose from "mongoose";
import express, { Router } from "express";
import {
  getAllContacts,
  newContact,
} from "../controllers/contactusController.js";

const contactUsRouter = Router();
contactUsRouter.post("/newcontact", newContact);
contactUsRouter.get("/allcontacts", getAllContacts);

export default contactUsRouter;
