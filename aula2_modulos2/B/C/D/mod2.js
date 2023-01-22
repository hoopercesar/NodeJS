class Perro {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }
  latir() {
    return `${this.nome} está latindo. ele tem ${this.idade} anos`;
  }
}

module.exports = Perro;
