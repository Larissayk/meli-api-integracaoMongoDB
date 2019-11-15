const mongoose = require("mongoose");

const alunasSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dateOfBirth: { type: String },
  nasceuEmSp: { type: Boolean },
  livros: [
    {
      _id:false,
      titulo: String,
      leu: Boolean
    }]
  },{
    versionKey:false
});

const Alunas = mongoose.model("Alunas", alunasSchema);  //indicando para o mongoose que o Schema está relacionado a model "alunas"

module.exports = Alunas;
