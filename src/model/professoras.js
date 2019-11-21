const mongoose = require("mongoose");

const professorasSchema = new mongoose.Schema({
   nome: { type: String, required: true },
  especialidade: { type: String },
  signo: { type: String },
  cpf: { type: Number }
  },{
    versionKey:false
});

const Professoras = mongoose.model("Professoras", professorasSchema);  //indicando para o mongoose que o Schema está relacionado a model "alunas"

module.exports = Professoras;
