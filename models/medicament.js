const mongoose  =require('mongoose')

const Schema  =mongoose.Schema

const mediSchema = new Schema({
   name:{
        type : String
    },

   
    description : {
        type :String

    },
    prix : {
        type :String

    },
  
    photo : {
        type :String,
    },
   

} , {timestamps: true})

const Medi = mongoose.model('medi',mediSchema)
module.exports =Medi