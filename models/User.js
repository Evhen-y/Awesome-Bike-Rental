const {Schema, model, Types, isValidObjectId} = require('mongoose')

const schema = new Schema({
  nameBike: {type: String, required: true,},
  typeBike: {type: String, required: true},
  priceBike: { type: String, required: true },
  links: [{type: Types.ObjectId, ref: 'Link'}]

})

module.exports = model('User', schema)
 