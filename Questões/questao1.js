const prompt = require('prompt-sync')({ sigint: true });

class questao1 {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    distancia(vertice) {
        return Math.sqrt(Math.pow(this.#x - vertice.x, 2) + Math.pow(this.#y - vertice.y, 2));
    }

    move(novoX, novoY) {
        this.#x = novoX;
        this.#y = novoY;
    }

    equals(vertice) {
        return this.#x === vertice.x && this.#y === vertice.y;
    }
}

module.exports = questao1;