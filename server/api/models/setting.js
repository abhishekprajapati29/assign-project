const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {type: String, required: true},
  status: { type: String, default: "SUCCESS" },
  type: { type: String, default: "Free" },
  amount: { type: Number, default: 0 },
  payment_through: { type: String, default: "None" }, // payment method - Wallet, Card, UPI 
  txn_date: { type: Date, default: Date.now() },
});

const Sub = mongoose.model("Sub", subSchema);

const contactusSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {type: String, required: true},
  subject: { type: String, required: true},
  message: { type: String},
},{
  timestamps: true
});

const Contactus = mongoose.model("Contactus", contactusSchema);

module.exports = { Sub, Contactus };