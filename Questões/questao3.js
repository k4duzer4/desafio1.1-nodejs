const prompt = require('prompt-sync')({ sigint: true });
const Vertice = require('./questao1');  

class Poligono {
    #vertices;

    constructor(vertices) {
        if (vertices.length < 3) {
            throw new Error("Um poligono precisa ter pelo menos 3 vertices.");
        }
        this.#vertices = vertices;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }

    addVertice(novoVertice) {
        for (const vertice of this.#vertices) {
            if (vertice.equals(novoVertice)) {
                return false;
            }
        }
        this.#vertices.push(novoVertice);
        return true;
    }

    get perimetro() {
        let perimetro = 0;
        const numVertices = this.#vertices.length;

        for (let i = 0; i < numVertices; i++) {
            const verticeAtual = this.#vertices[i];
            const verticeProximo = this.#vertices[(i + 1) % numVertices];
            perimetro += verticeAtual.distancia(verticeProximo);
        }

        return perimetro;
    }
}

function criarVertice(numero) {
    const x = parseFloat(prompt(`Digite o x do vértice ${numero}: `));
    const y = parseFloat(prompt(`Digite o y do vértice ${numero}: `));
    return new Vertice(x, y);
}

function criarPoligono() {
    console.log("Criacao de um polígono com pelo menos 3 vetices:");
    const vertices = [];
    for (let i = 1; i <= 3; i++) {
        vertices.push(criarVertice(i));
    }
    const poligono = new Poligono(vertices);

    let adicionarMais = prompt("Deseja adicionar mais vertices? (s/n): ");
    let verticeNumero = 4;

    while (adicionarMais.toLowerCase() === 's') {
        const novoVertice = criarVertice(verticeNumero);
        if (poligono.addVertice(novoVertice)) {
            console.log(`Vertice ${verticeNumero} adicionado com sucesso.`);
            verticeNumero++;
        } else {
            console.log("Vertice já existe no polígono e não foi adicionado.");
        }
        adicionarMais = prompt("Deseja adicionar mais vertices? (s/n): ");
    }

    return poligono;
}

try {
    const poligono = criarPoligono();

    console.log("\nPoligono criado com sucesso!");
    console.log("Quantidade de vertices:", poligono.qtdVertices);
    console.log("Perimetro do poligono:", poligono.perimetro);
} catch (error) {
    console.error("Erro:", error.message);
}
