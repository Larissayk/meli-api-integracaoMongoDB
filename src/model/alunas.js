const mongoose = require("mongoose");

const alunasSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dateOfBirth: { type: Date },
  nasceuEmSp: { type: Boolean },
  livros: [
    {
      titulo: String,
      leu: Boolean
    }
  ]
});

const Alunas = mongoose.model("Alunas", alunasSchema);  //indicando para o mongoose que o Schema está relacionado a model "alunas"

module.exports = Alunas;
