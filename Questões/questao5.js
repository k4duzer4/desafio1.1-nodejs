const prompt = require('prompt-sync')({ sigint: true });
const { DateTime } = require('luxon');

function validarNome(nome) {
    if (nome.length < 5) {
        console.log("Erro: O nome deve ter pelo menos 5 caracteres.");
        return false;
    }
    return true;
}

function validarCPF(cpf) {
    const cpfStr = cpf.toString();
    if (cpfStr.length !== 11 || !/^\d+$/.test(cpfStr)) {
        console.log("Erro: O CPF deve ter exatamente 11 dígitos.");
        return false;
    }
    return true;
}

function validarDataNascimento(dataStr) {
    const data = DateTime.fromFormat(dataStr, 'dd/MM/yyyy');
    const hoje = DateTime.now();

    if (!data.isValid || data > hoje) {
        console.log("Erro: Data de nascimento inválida ou maior que a data atual.");
        return false;
    }

    const idade = hoje.year - data.year;
    if (hoje.month < data.month || (hoje.month === data.month && hoje.day < data.day)) {
        idade--;
    }

    if (idade < 18) {
        console.log("Erro: O cliente deve ter pelo menos 18 anos.");
        return false;
    }
    return true;
}

function validarRenda(renda) {
    if (renda < 0) {
        console.log("Erro: A renda mensal deve ser maior ou igual a 0.");
        return false;
    }
    return true;
}

function validarEstadoCivil(estadoCivil) {
    if (!['C', 'S', 'V', 'D', 'c', 's', 'v', 'd'].includes(estadoCivil)) {
        console.log("Erro: Estado civil deve ser C, S, V ou D.");
        return false;
    }
    return true;
}

function validarDependentes(dependentes) {
    if (dependentes < 0 || dependentes > 10) {
        console.log("Erro: O número de dependentes deve estar entre 0 e 10.");
        return false;
    }
    return true;
}

function formatarCPF(cpf) {
    return cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarRenda(renda) {
    return renda.toFixed(2).replace('.', ',');
}

function formatarData(dataStr) {
    const data = DateTime.fromFormat(dataStr, 'dd/MM/yyyy');
    return data.toFormat('dd/MM/yyyy');
}

function coletarDadosCliente() {
    let nome;
    do {
        nome = prompt("Digite o nome do cliente: ");
    } while (!validarNome(nome));

    let cpf;
    do {
        cpf = prompt("Digite o CPF do cliente (11 dígitos): ");
    } while (!validarCPF(cpf));

    let dataNascimento;
    do {
        dataNascimento = prompt("Digite a data de nascimento do cliente (DD/MM/AAAA): ");
    } while (!validarDataNascimento(dataNascimento));

    let renda;
    do {
        renda = parseFloat(prompt("Digite a renda mensal do cliente (valor ≥ 0): ").replace(',', '.'));
    } while (!validarRenda(renda));

    let estadoCivil;
    do {
        estadoCivil = prompt("Digite o estado civil do cliente (C, S, V ou D): ");
    } while (!validarEstadoCivil(estadoCivil));

    let dependentes;
    do {
        dependentes = parseInt(prompt("Digite o número de dependentes do cliente (0 a 10): "), 10);
    } while (!validarDependentes(dependentes));

    console.log("\nDados do Cliente:");
    console.log(`Nome: ${nome}`);
    console.log(`CPF: ${formatarCPF(cpf)}`);
    console.log(`Data de Nascimento: ${formatarData(dataNascimento)}`);
    console.log(`Renda Mensal: R$ ${formatarRenda(renda)}`);
    console.log(`Estado Civil: ${estadoCivil}`);
    console.log(`Dependentes: ${dependentes}`);
}

coletarDadosCliente();
