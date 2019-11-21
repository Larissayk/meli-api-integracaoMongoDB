//const alunas = require("../model/alunas.json");
const Alunas = require("../model/alunas"); //pegando o alunas.js que criamos na model
const fs = require("fs");

exports.get = (req, res) => {
  // console.log(req.url);
  // res.status(200).send(alunas);
  Alunas.find(function(err, alunas) {
    //função callback, fica esperando o retorno do banco
    if (err) res.status(500).send(alunas);
    res.status(200).send(alunas);
  });
};

exports.getById = (req, res) => {
  const alunaId = req.params.id;
  Alunas.findById(alunaId, function(err, aluna) {
    if (err) return res.status(500).send(err.message);
    if (!aluna) {
      return res.status(404).send({
        message: `Infelizmente não foi possível localizar a aluna de id ${alunaId}`
      });
    }
    res.status(200).send(aluna);
  });

  // const id = req.params.id;
  // if (id > 34 || id <= 0) {
  //   res.redirect(301, "https://en.wikipedia.org/wiki/Man-in-the-middle_attack");
  // }
  // res.status(200).send(alunas.find(aluna => aluna.id == id));
};

exports.getBooks = (req, res) => {
  const id = req.params.id;
  Alunas.findById(id, function(err, aluna) {
    if (err) return res.status(500).send(err.message);
    if (!aluna) {
      res.send("Nao encontrei essa aluna");
    }
    const livrosAluna = aluna.livros;
    const livrosLidos = livrosAluna.filter(livro => livro.leu == true);
    const tituloLivros = livrosLidos.map(livro => livro.titulo);
    res.send(tituloLivros);

    // const id = req.params.id;
    // const aluna = alunas.find(aluna => aluna.id == id);
    // if (!aluna) {
    //   res.send("Nao encontrei essa garota");
    // }
    // const livrosAluna = aluna.livros;
    // const livrosLidos = livrosAluna.filter(livro => livro.leu == "true");
    // const tituloLivros = livrosLidos.map(livro => livro.titulo);
    // res.send(tituloLivros);
  });
};

exports.getSp = (req, res) => {
  Alunas.find({ nasceuEmSp: true }, function(err, alunas) {
    //outra forma de buscar passando o filtro no método do mongo
    if (err) return res.status(500).send(err);
    console.log(alunas);
    const nasceuSP = alunas.map(aluna => aluna.nome);
    res.status(200).send(nasceuSP);
  });
  // Alunas.find(function(err, alunas) {  //função callback, fica esperando o retorno do banco
  //   if (err) res.status(500).send(err);
  //   const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp == true);
  //   console.log(nasceuSp);

  //   const meninasSp = nasceuSp.map(aluna => aluna.nome);
  //   console.log(meninasSp);

  //   res.status(200).send(meninasSp);
  // });
};

exports.getAge = (req, res) => {
  const id = req.params.id;
  Alunas.findById(id, function(err, aluna) {
    if (err) return res.status(500).send(err.message);
    if (!aluna) {
      res.send("Nao encontrei essa aluna");
    }
    const dataNasc = aluna.dateOfBirth;
    const arrData = dataNasc.split("/");
    const dia = arrData[0];
    const mes = arrData[1];
    const ano = arrData[2];
    const idade = calcularIdade(ano, mes, dia);
    res.status(200).send({ idade });

    // const id = req.params.id;
    // const aluna = alunas.find(item => item.id == id);
    // const dataNasc = aluna.dateOfBirth;
    // const arrData = dataNasc.split("/");
    // const dia = arrData[0];
    // const mes = arrData[1];
    // const ano = arrData[2];
    // const idade = calcularIdade(ano, mes, dia);
    // res.status(200).send({ idade });
  });
};

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;
  const hoje = now.getDate();

  let idade = anoAtual - anoDeNasc;

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1;
  }
  return idade;
}

//------------------------------------------------------------------------------------------------------------
//POST
exports.post = (req, res) => {
  let aluna = new Alunas(req.body);

  aluna.save(function(err) {
    if (err) res.status(500).send(err);

    res.status(201).send(aluna);
  });

  // const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
  // alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });

  // fs.writeFile(
  //   "./src/model/alunas.json",
  //   JSON.stringify(alunas),
  //   "utf8",
  //   function(err) {
  //     if (err) {
  //       return res.status(500).send({ message: err });
  //     }
  //     console.log("The file was saved!");
  //   }
  // );

  // return res.status(201).send(alunas);
};

exports.postBooks = (req, res) => {
  const id = req.params.id;
  Alunas.findById(id, function(err, aluna) {
    if (err) return res.status(500).send(err.message);
    if (!aluna) {
      return res.send("Nao encontrei essa aluna");
    }

    const livro = req.body;
    aluna.livros.push(livro);

    aluna.save(function(err) {
      if (err) res.status(500).send(err);

      res.status(201).send(aluna);
    });
  });
};

// const id = req.params.id;
// const aluna = alunas.find(aluna => aluna.id == id);
// if (!aluna) {
//   res.send("Nao encontrei essa garota");
// }
// const { titulo, leu } = req.body;
// alunas[aluna.id - 1].livros.push({ titulo, leu });

//   fs.writeFile(
//     "./src/model/alunas.json",
//     JSON.stringify(alunas),
//     "utf8",
//     function(err) {
//       if (err) {
//         return res.status(500).send({ message: err });
//       }
//       console.log("The file was saved!");
//     }
//   );

//   res.status(201).send(alunas[aluna.id - 1].livros);
// }

//PUT

exports.updateAlunas = (req, res) => {
  Alunas.update({ _id: req.params.id }, { $set: req.body }, function(err, alunas) {
    if (err) return res.status(500).send(err);
    res.status(204).send(`Registro da aluna foi atualizado com sucesso!`);
  });
};
