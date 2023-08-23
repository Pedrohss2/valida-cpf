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

( function() {
    let input = document.querySelector("#inputNumber");
    let button = document.querySelector(".button");
    let resposta = document.querySelector(".resposta");
    
    function marcaraDeFormatação() {
        if(input.value.length == 3 || input.value.length == 7) input.value += '.';
    
        if(input.value.length == 11) input.value += '-';
    }
    
    function ValidaCpf(cpfEnviado) {
        Object.defineProperty(this, 'cleanCpf', {
            enumerable: true,
    
            get: () =>{
                return cpfEnviado.replace(/\D+/g, '');
            }
        });
    }
    
    ValidaCpf.prototype.validateCpf = function() {
        if(typeof this.cleanCpf === 'undefined') return false;
        if(this.cleanCpf.length !== 11) return false;
        if(this.isSequancia()) return false;
    
        const cpfParsial = this.cleanCpf.slice(0, -2);
    
        const firstDigt = this.createDigit(cpfParsial);
        const secondDigit = this.createDigit(cpfParsial + firstDigt);
    
        const newCpf = cpfParsial + firstDigt + secondDigit;
    
        return newCpf === this.cleanCpf;
    }
    
    ValidaCpf.prototype.createDigit = function(cpfParsial)    {
        const arrayOfCpf = Array.from(cpfParsial);
        let regressive = arrayOfCpf.length + 1; 
    
        const cpfNumbers = arrayOfCpf.reduce( (accumulator, value) => {
            accumulator += (regressive *  Number(value));
            regressive--;
            return accumulator;
        }, 0);
    
        let digit = 11 - (cpfNumbers % 11);
    
        return digit > 9? '0': digit;
    }
    
    ValidaCpf.prototype.isSequancia = function() {
        const sequence =  this.cleanCpf[0].repeat(this.cleanCpf.length);
        return sequence === this.cleanCpf;
    }
    
    button.addEventListener('click', function() {
        let cpf = new ValidaCpf(input.value)
        try {
            let validates = cpf.validateCpf() == true ? 'CPF válido': 'CPF INVÁLIDO';  
            resposta.innerHTML =  validates;
        } catch(error) {
            console.log(error);
        }
    });
})
   
