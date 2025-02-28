import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: { type: String},
    address: { type: String},
    city: { type: String},
    pinCode: { type: String},
    phone: { type: String},
    notes: { type: String},
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);
export default Address;
