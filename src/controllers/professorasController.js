const Professoras = require("../model/professoras");
const fs = require("fs");

// exports.get = (req, res) => {
//   const arrProfs = []
//   for (let i = 0; i < professoras.length; i++) {
//     const semCpf = {}
//     semCpf.id = professoras[i].id
//     semCpf.nome = professoras[i].nome
//     semCpf.especialidade = professoras[i].especialidade
//     semCpf.signo = professoras[i].signo
//     arrProfs.push(semCpf)
//   }
//   res.status(200).send(arrProfs)
// }

//GET Professoras e não mostrar CPF
exports.get = (req, res) => {
  // console.log(req.url);
  // res.status(200).send(alunas);
  Professoras.find(function(err, professoras) {
    //função callback, fica esperando o retorno do banco
    if (err) res.status(500).send(err);
    const profSemCpf = professoras.map(({ nome, especialidade, signo }) => ({
      nome,
      especialidade,
      signo
    }));
    res.status(200).send(profSemCpf);
  });
};

// exports.get = (req, res) => {
//   const profSemCpf = Professoras.map(item => {
//     item.cpf = "*********";
//     return item;
//   });

/* const profSemCpf = professoras.map(item => {
    delete item.cpf
    return item
  }) */

//   res.status(200).send(profSemCpf);
// };

// GET pelo ID
exports.getById = (req, res) => {
  const professoraId = req.params.id;
  Professoras.findById(professoraId, function(err, professora) {
    if (err) return res.status(500).send(err.message);
    if (!professora) {
      return res.status(404).send({
        message: `Infelizmente não foi possível localizar a aluna de id ${professoraId}`
      });
    }
    res.status(200).send(professora);
  });
};

// exports.getById = (req, res) => {
//   const id = req.params.id;
//   const prof = Professoras.find(prof => prof.id == id);
//   delete prof.cpf;
//   res.status(200).send(prof);
// };

//POST

exports.post = (req, res) => {
  let professoras = new Professoras(req.body);

  professoras.save(function(err) {
    if (err) res.status(500).send(err);

    res.status(201).send(professoras);
  });
};

// exports.post = (req, res) => {
//   const { id, nome, especialidade, signo, cpf } = req.body;
//   professoras.push({ id, nome, especialidade, signo, cpf });

//   fs.writeFile(
//     "./src/model/professoras.json",
//     JSON.stringify(professoras),
//     "utf8",
//     function(err) {
//       if (err) {
//         return res.status(500).send({ message: err });
//       }
//       console.log("The file was saved!");
//     }
//   );

//   return res.status(201).send(professoras);
// };

//PUT
exports.updateProfs = (req, res) => {
  const profId = req.params.id;
  Professoras.findByIdAndUpdate({ _id: profId }, { $set: req.body }, function(
    err,
    professora
  ) {
    if (err) res.status(500).send(err);
    if (!professora) {
      return res.status(404).send({
        message: `Não foi possível localizar a publicação de ID: ${profId}`
      });
    }

    res.status(200).send({
      status: "ativo",
      mensagem: `Professora ${professora.nome} atualizada com sucesso!`
    });
  });
};
