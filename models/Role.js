const { Schema, model } = require('mongoose')

const Role = new Schema({
   name: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
   }
})

module.exports = model('Role', Role)
