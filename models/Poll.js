const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  options: [
    {
      optionName: {
        type: String,
        required: true
      },
      votes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          ip: {
            type: String
          }
        }
      ]
    }
  ],
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Poll = mongoose.model("poll", PollSchema);
