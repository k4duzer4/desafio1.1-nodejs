const prompt = require('prompt-sync')({ sigint: true });

class Aluno {
    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
        this.P1 = null; 
        this.P2 = null; 
    }

    get notaFinal() {
        if (this.P1 !== null && this.P2 !== null) {
            return ((this.P1 + this.P2) / 2).toFixed(1);
        } else if (this.P1 !== null) {
            return (this.P1 / 2).toFixed(1);
        } else if (this.P2 !== null) {
            return (this.P2 / 2).toFixed(1);
        } else {
            return "0.0";
        }
    }

    get formattedP1() {
        return this.P1 !== null ? this.P1.toFixed(1) : "-";
    }

    get formattedP2() {
        return this.P2 !== null ? this.P2.toFixed(1) : "-";
    }
}

class Turma {
    constructor() {
        this.alunos = [];
    }

    inserirAluno(aluno) {
        if (this.alunos.some(a => a.matricula === aluno.matricula)) {
            console.log("Aluno com essa matrícula já está na turma.");
            return false;
        }
        this.alunos.push(aluno);
        return true;
    }

    removerAluno(matricula) {
        const index = this.alunos.findIndex(aluno => aluno.matricula === matricula);
        if (index !== -1) {
            this.alunos.splice(index, 1);
            console.log("Aluno removido com sucesso.");
        } else {
            console.log("Aluno não encontrado.");
        }
    }

    lancarNota(matricula, prova, nota) {
        const aluno = this.alunos.find(aluno => aluno.matricula === matricula);
        if (aluno) {
            if (prova === 'P1') {
                aluno.P1 = nota;
            } else if (prova === 'P2') {
                aluno.P2 = nota;
            }
            console.log(`Nota lançada com sucesso para ${aluno.nome}.`);
        } else {
            console.log("Aluno não encontrado.");
        }
    }

    imprimirAlunos() {
        console.log("—---------------------------------------");
        console.log("Matricula   Nome              P1   P2   NF");
        console.log("—---------------------------------------");

        this.alunos
            .sort((a, b) => a.nome.localeCompare(b.nome))  // Ordena alfabeticamente pelo nome
            .forEach(aluno => {
                console.log(
                    `${aluno.matricula}   ${aluno.nome.padEnd(17)}   ${aluno.formattedP1}   ${aluno.formattedP2}   ${aluno.notaFinal}`
                );
            });

        console.log("—---------------------------------------");
    }
}

function criarAluno() {
    const matricula = prompt("Digite a matrícula do aluno: ");
    const nome = prompt("Digite o nome do aluno: ");
    return new Aluno(matricula, nome);
}

function lancarNotaParaAluno(turma) {
    const matricula = prompt("Digite a matrícula do aluno para lançar nota: ");
    const prova = prompt("Digite qual prova (P1 ou P2): ");
    const nota = parseFloat(prompt("Digite a nota: "));
    turma.lancarNota(matricula, prova, nota);
}

const turma = new Turma();

let continuar = 's';

while (continuar.toLowerCase() === 's') {
    const opcao = prompt("\nEscolha uma opção: 1 - Adicionar aluno, 2 - Remover aluno, 3 - Lançar nota, 4 - Imprimir alunos: ");
    switch (opcao) {
        case '1':
            const aluno = criarAluno();
            turma.inserirAluno(aluno);
            break;
        case '2':
            const matricula = prompt("Digite a matrícula do aluno a ser removido: ");
            turma.removerAluno(matricula);
            break;
        case '3':
            lancarNotaParaAluno(turma);
            break;
        case '4':
            turma.imprimirAlunos();
            break;
        default:
            console.log("Opção inválida.");
            break;
    }
    continuar = prompt("Deseja realizar outra operação? (s/n): ");
}
