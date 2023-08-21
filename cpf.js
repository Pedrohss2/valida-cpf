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

function ValidaCpf(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,

        get: function() {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}
ValidaCpf.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequancia()) return false;

    const cpfParsial = this.cpfLimpo.slice(0, -2);

    const digito1 = this.criaDigito(cpfParsial);
    const digito2 = this.criaDigito(cpfParsial + digito1);

    const novoCpf = cpfParsial + digito1 + digito2;

    return novoCpf === this.cpfLimpo;
}

ValidaCpf.prototype.criaDigito = function(cpfParsial)    {
    const arrayOfCpf = Array.from(cpfParsial);
    let regressivo = arrayOfCpf.length + 1;

    const valor = arrayOfCpf.reduce( (ac, val) => {
        ac += (regressivo *  Number(val));
        regressivo--;
        return ac;
    }, 0);

    let digito = 11 - (valor % 11);
    return digito > 9? '0': digito;
}

ValidaCpf.prototype.isSequancia = function() {
    const sequencia =  this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
}

const cpf = new ValidaCpf('705.484.450-26');
console.log(cpf.valida())

try {
    let valida = cpf.valida() == true ? 'CPF válido, você pode comprar igual um louco e ficar devendo :)': 'CPF INVÁLIDO';  
    console.log(valida)
} catch(error) {
    console.log(error);
}
