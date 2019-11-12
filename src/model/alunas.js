const mongoose = require('mongoose');

const AlunasSchema = new mongoose.Schema({
    nome:{type: String, required: true},
    dateOfBirth:{type: Date},
    nasceuEmSp:{type: Boolean},
    livros: [{
        titulo:String,
        leu:Boolean
    }]

})