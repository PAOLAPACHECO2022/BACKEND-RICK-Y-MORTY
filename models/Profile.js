const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Profileschema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  fullname: {
    type: String,
    required: true,
    max: 40
  },

  city: {
    type: String,
    required: false
  },
  telepone: {
    type: Number,
    required: false
  },
  email: {
    type: String
  },


  character: [
    {
     namecharacter: {
        type: String,
        required: true
      },
     status: {
        type: String,
        required: true
      },
      creaciondate: {
        type: Date,
        required: true
      },
      species: {
        type: String
      },
    
    location: {
      type: String
    },
   
    
    }
  ],

  season: [
    {
      nameseason: {
        type: String,
        required: true
      },
      version: {
        type: String,
        required: true
      },
      episodes: {
        type: Number,
        required: true
      },
      numbercharacters: {
        type: Number,
        required: true
      },

    }
  ],
 
  create: {
    type: Date,
    default: Date.now
  }
});

//export this as a Mongoose model, add the Profile Schema
module.exports = Profile = mongoose.model('profile', Profileschema);
