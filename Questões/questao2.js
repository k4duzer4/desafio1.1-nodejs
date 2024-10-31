const prompt = require('prompt-sync')({ sigint: true });
const Vertice = require('./questao1');  

class Triangulo {
    #vertice1;
    #vertice2;
    #vertice3;

    constructor(vertice1, vertice2, vertice3) {
        this.#vertice1 = vertice1;
        this.#vertice2 = vertice2;
        this.#vertice3 = vertice3;

        const ladoA = vertice1.distancia(vertice2);
        const ladoB = vertice2.distancia(vertice3);
        const ladoC = vertice3.distancia(vertice1);

        if (ladoA + ladoB <= ladoC || ladoA + ladoC <= ladoB || ladoB + ladoC <= ladoA) {
            throw new Error("Os vértices fornecidos não formam um triângulo.");
        }
    }

    get vertice1() {
        return this.#vertice1;
    }

    get vertice2() {
        return this.#vertice2;
    }

    get vertice3() {
        return this.#vertice3;
    }

    equals(outroTriangulo) {
        return (
            this.#vertice1.equals(outroTriangulo.vertice1) &&
            this.#vertice2.equals(outroTriangulo.vertice2) &&
            this.#vertice3.equals(outroTriangulo.vertice3)
        );
    }

    get perimetro() {
        const ladoA = this.#vertice1.distancia(this.#vertice2);
        const ladoB = this.#vertice2.distancia(this.#vertice3);
        const ladoC = this.#vertice3.distancia(this.#vertice1);
        return ladoA + ladoB + ladoC;
    }

    get area() {
        const ladoA = this.#vertice1.distancia(this.#vertice2);
        const ladoB = this.#vertice2.distancia(this.#vertice3);
        const ladoC = this.#vertice3.distancia(this.#vertice1);
        const s = this.perimetro / 2;
        return Math.sqrt(s * (s - ladoA) * (s - ladoB) * (s - ladoC));
    }

    tipo() {
        const ladoA = this.#vertice1.distancia(this.#vertice2);
        const ladoB = this.#vertice2.distancia(this.#vertice3);
        const ladoC = this.#vertice3.distancia(this.#vertice1);

        if (ladoA === ladoB && ladoB === ladoC) {
            return "Equilátero";
        } else if (ladoA === ladoB || ladoB === ladoC || ladoA === ladoC) {
            return "Isósceles";
        } else {
            return "Escaleno";
        }
    }

    clone() {
        return new Triangulo(this.#vertice1, this.#vertice2, this.#vertice3);
    }
}

// Função para criar um vértice com entrada do usuário
function criarVertice(numero) {
    const x = parseFloat(prompt(`Digite a coordenada x do vértice ${numero}: `));
    const y = parseFloat(prompt(`Digite a coordenada y do vértice ${numero}: `));
    return new Vertice(x, y);
}

// Função para criar um triângulo com entrada do usuário
function criarTriangulo() {
    console.log("Criação de um triângulo:");
    const vertice1 = criarVertice(1);
    const vertice2 = criarVertice(2);
    const vertice3 = criarVertice(3);
    return new Triangulo(vertice1, vertice2, vertice3);
}

try {
    const triangulo1 = criarTriangulo();
    const triangulo2 = criarTriangulo();
    const triangulo3 = criarTriangulo();

    console.log("\nTriângulo 1:");
    console.log("Perímetro:", triangulo1.perimetro);
    console.log("Área:", triangulo1.area);
    console.log("Tipo:", triangulo1.tipo());

    console.log("\nTriângulo 2:");
    console.log("Perímetro:", triangulo2.perimetro);
    console.log("Área:", triangulo2.area);
    console.log("Tipo:", triangulo2.tipo());

    console.log("\nTriângulo 3:");
    console.log("Perímetro:", triangulo3.perimetro);
    console.log("Área:", triangulo3.area);
    console.log("Tipo:", triangulo3.tipo());

    // Comparando os triângulos
    console.log("\nTriângulo 1 é igual ao Triângulo 2?", triangulo1.equals(triangulo2));
    console.log("Triângulo 1 é igual ao Triângulo 3?", triangulo1.equals(triangulo3));

    // Exemplo de clonagem
    const cloneTriangulo1 = triangulo1.clone();
    console.log("\nClone do Triângulo 1 é igual ao Triângulo 1?", cloneTriangulo1.equals(triangulo1));
} catch (error) {
    console.error("Erro:", error.message);
}
