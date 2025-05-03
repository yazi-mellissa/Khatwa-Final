import mongoose, { Schema } from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
          _id: mongoose.Schema.Types.ObjectId,
          children: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Child'
          },
          parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Parent,
          },
          kindergarten: {
            type: mongoose.Schema.Types.ObjectId,
            ref: kindergarten,
          },
           state: {
            type:String,
            /*add enums*/
           },
    }

)

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;