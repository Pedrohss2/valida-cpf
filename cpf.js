// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/


let input = document.querySelector("#inputNumber");
let button = document.querySelector(".button");
let resposta = document.querySelector(".resposta");

function mascaraDeFormatação() {
    if(input.value.length == 3 || input.value.length == 7) input.value += '.';
    if(input.value.length == 11) input.value += '-';
}

class ValidaCpf {
    constructor(cpf) {
        this.cpf = cpf.replace(/\D+/g, '');
    }

    valida() {
        if(typeof this.cpf !== 'string') return false;
        if(!this.cpf) return false;
        if(this.cpf.length !== 11) return false;
        if(!this.geraCpf()) return false;
        if(this.sequencia()) return false;

        return this.geraCpf(); //Retornado a função que gera o cpf
    }

    geraCpf() {
        const cpfSemDigito = this.cpf.slice(0, -2);
        const digito1 = this.criaDigit(cpfSemDigito); 
        const digito2 = this.criaDigit(cpfSemDigito + digito1) ;
        const novoCpf = cpfSemDigito + digito1 + digito2;

       return novoCpf === this.cpf;
    }

    criaDigit(cpfSemDigito) {
        let total = 0;
        let regressivo = cpfSemDigito.length + 1;

        for(let stringNmerica of cpfSemDigito) {
            total += regressivo * Number(stringNmerica)
            regressivo--;
        }
       
        let digito = 11 - (total % 11);
        return digito <= 9 ? digito: '0';
    }

    sequencia() {
        return this.cpf.charAt(0).repeat(11) === this.cpf;
    }
}
    
// Adiconando um evento de click para executar o código
button.addEventListener('click', function() {
    const cpf = new ValidaCpf(input.value);
    try {
        let validates = cpf.valida() == true ? 'CPF válido': 'CPF INVÁLIDO';  
        resposta.innerHTML =  validates;
    } catch(error) {
        console.log(error);
    }
});
