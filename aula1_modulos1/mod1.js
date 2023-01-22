const nome = "pepe";
const sobrenome = "soto";
const idade = 33;

const falaNome = () => {
  console.log(nome, sobrenome);
};

// formas de exportar con nodejs
// usando module.exports
// module.exports.nome = nome;
// module.exports.sobrenome = sobrenome;
// module.exports.idade = idade;
// module.exports.funcion = falaNome;

// usando exports
// exports.nombre = ["pepe", "lalo"];
// exports.apellido = sobrenome;
// exports.edad = idade;
// exports.function = falaNome;

// usando this
this.Name = nome;
this.lastName = sobrenome;
this.age = idade;
this.function = falaNome;

console.log(module);
