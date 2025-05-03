const mongoose = require('mongoose');
const { Schema } = mongoose;
const educationTypes = ['HAHA', 'HIHI', 'HOHO', 'HEHE'];
const reservation_states = ['Confirmed', 'Pending', 'Cancelled'];


// Base user schema
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

// Kindergarten user schema
const KindergartenSchema = new Schema({
  kindergartenName: {type: String,required: true},
  Education: { type: String, enum: educationTypes, required: true},
  minAge: { type: Number, required: true },
  maxAge: { type: Number, required: true },
  classCapacity: [
    {
      name: { type: String, required: true },
      capacity: { type: Number, required: true }
    }
  ],
  rating: { type: Number, min: 0, max: 5},
  photos: [{ type: String }],
  videos: [{ type: String }],
  schedule: {
    openTime: {
      type: String,
      required: true
    },
    closeTime: {
      type: String,
      required: true
    }
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Child' }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
});

const ReservationSchema = new mongoose.Schema(
  {
        _id: mongoose.Schema.Types.ObjectId,
        children: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Child'
        },
        parent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Parent',
        },
        kindergarten: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Kindergarten',
        },
         State: { type: String, enum: reservation_states, required: true},
         Hour: {
          type:String,
          required: true
         },
         reservation_date : {
          type: Date,
          required: true
         }
  }
)

// Parent user schema
const ParentSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: { type: String,required: true},
  photo: { type: String ,required: true},
  gender: {type: String ,required: true},
  birth_date: {type: Date,required: true},
  children: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
});

// Child schema
const ChildSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName:{type: String, required: true},
  lastName: {type: String, required: true },
  age: {type: Number, required: true },
  photo: {type: String, required: true },
  gender: {type: String,required: true},
  birth_date: {type: Date,required: true},
  Kindergarten: {type: mongoose.Schema.Types.ObjectId, ref: 'Kindergarten' },
});

const User = mongoose.model('User', UserSchema);
const Kindergarten = User.discriminator('Kindergarten', KindergartenSchema);
const Parent = User.discriminator('Parent', ParentSchema);
const Child = mongoose.model('Child', ChildSchema);
const Reservation = mongoose.model("Reservation", ReservationSchema);

exports.User = mongoose.model('User', UserSchema);


module.exports = { User};
module.exports = mongoose.connection.models.Kindergarten;
module.exports = mongoose.connection.models.Parent;
module.exports = mongoose.connection.models.Child;
module.exports = mongoose.connection.models.Reservation;




