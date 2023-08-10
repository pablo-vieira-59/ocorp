export class ValidatorField {
    static ValidateInputField(currentValidFields :string[], elementId: string, required: string[], email?: string[], mustMatch?: string[][], minSize?: string[][], cnpj?: string[], cpf?: string[]): any {
        var inputElement = document.getElementById(elementId) as HTMLInputElement;
        
        if(!inputElement){
            return currentValidFields;
        }

        var inputid = inputElement.id;
        var inputValue = inputElement.value as string;       

        var validationElement = document.getElementById(inputid + "-validation") as HTMLElement;
        if (validationElement != null && validationElement != undefined) {
            validationElement.remove();
        }

        var errors: string[] = []

        // Executa validação de campos obrigatorios
        if (required.includes(inputid)) {
            if (inputValue.trim().length == 0) {
                errors.push("Campo obrigatorio.");
            }
        }

        // Executa validação de email
        if (email?.includes(inputid)) {
            inputValue = inputValue.trim();

            if (!(inputValue.includes(".") && inputValue.includes("@"))) {
                errors.push("Digite um e-mail válido.");
            }
        }

        // Executa validação de Must Match
        // A = Id do componente a validar
        // B = Id do componente a comparar
        // [A,B] = Estrutura do Array
        if (mustMatch) {
            var keys = mustMatch.map(x => x[0]);
            var idx = keys.indexOf(inputid);
            if (idx != -1) {
                // Obtem nome do Id do B
                var element = document.getElementById(mustMatch[idx][1]) as HTMLInputElement;
                var toMatchValue = element.value;

                // Verifica se o valor de A é igual ao valor de B
                if (inputValue != toMatchValue) {
                    errors.push("Valores não são iguals.");
                }
            }
        }

        // Executa validação de Tamanho minimo
        if (minSize) {
            var keys = minSize.map(x => x[0]);
            if (keys.includes(inputid)) {
                var idx = keys.indexOf(inputid);
                var size = Number(minSize[idx][1]);

                if (inputValue.length < size) {
                    errors.push("O tamanho minimo é de " + size + ".")
                }
            }
        }

        // Executa validação de CNPJ
        if (cnpj?.includes(inputid)) {
            var isValid = this.ValidateCNPJ(inputValue);

            if (!isValid) {
                errors.push("Digite um CNPJ válido.")
            }
        }

        // Executa validação de CPF
        if (cpf?.includes(inputid)) {
            var isValid = this.ValidateCPF(inputValue);

            if (!isValid) {
                errors.push("Digite um CPF válido.")
            }
        }

        var idx = currentValidFields.indexOf(inputElement.id);

        // Caso seja inválido Altera classe e coloca mensagem
        if (errors.length != 0) {
            ValidatorField.SetElementAsInvalid(inputElement.id, errors[0]);

            if (idx != -1) {
                currentValidFields.splice(idx, 1);
            }

            return currentValidFields;
        }

        // Caso seja valido
        ValidatorField.SetElementAsValid(inputElement.id);
		if (idx == -1) {
			currentValidFields.push(inputElement.id);
		}
		
        return currentValidFields;
    }

    static ValidateCPF(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        // Validação dos dígitos verificadores
        const digitos = cpf.split('').map(Number);
        const soma1 = digitos.slice(0, 9).reduce((acumulador, valor, indice) => acumulador + (valor * (10 - indice)), 0);
        const resto1 = (soma1 * 10) % 11;
        const digitoVerificador1 = (resto1 === 10 || resto1 === 11) ? 0 : resto1;

        if (digitoVerificador1 !== digitos[9]) {
            return false;
        }

        const soma2 = digitos.slice(0, 10).reduce((acumulador, valor, indice) => acumulador + (valor * (11 - indice)), 0);
        const resto2 = (soma2 * 10) % 11;
        const digitoVerificador2 = (resto2 === 10 || resto2 === 11) ? 0 : resto2;

        if (digitoVerificador2 !== digitos[10]) {
            return false;
        }

        return true;
    }

    static ValidateCNPJ(cnpj: string): boolean {
        cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cnpj.length !== 14) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        // Validação dos dígitos verificadores
        const digitos = cnpj.split('').map(Number);

        // Calcula o primeiro dígito verificador
        let soma1 = 0;
        let peso = 5;
        for (let i = 0; i < 12; i++) {
            soma1 += digitos[i] * peso;
            peso--;
            if (peso === 1) {
                peso = 9;
            }
        }
        let digitoVerificador1 = soma1 % 11;
        if (digitoVerificador1 < 2) {
            digitoVerificador1 = 0;
        } else {
            digitoVerificador1 = 11 - digitoVerificador1;
        }

        if (digitoVerificador1 !== digitos[12]) {
            return false;
        }

        // Calcula o segundo dígito verificador
        let soma2 = 0;
        peso = 6;
        for (let i = 0; i < 13; i++) {
            soma2 += digitos[i] * peso;
            peso--;
            if (peso === 1) {
                peso = 9;
            }
        }
        let digitoVerificador2 = soma2 % 11;
        if (digitoVerificador2 < 2) {
            digitoVerificador2 = 0;
        } else {
            digitoVerificador2 = 11 - digitoVerificador2;
        }

        if (digitoVerificador2 !== digitos[13]) {
            return false;
        }

        return true;
    }

    static SetElementAsInvalid(elementId :string, message :string){
        var element = document.getElementById(elementId) as HTMLInputElement;

        if(element == null){
            return;
        }

        this.ClearClasses(element);
        
        element.className += ' is-invalid';

        var hasErrorElement = document.getElementById(element.id + "-validation");

        if(hasErrorElement != null && hasErrorElement != undefined) return;

        element.insertAdjacentHTML('afterend', "<small class=\"form-text text-danger\" id=\"" + element.id + "-validation\"><i class=\"bi bi-exclamation-triangle me-2\"></i>" + message + "<br></small>");
    }

    static SetElementAsValid(elementId :string){
        var element = document.getElementById(elementId) as HTMLInputElement;

        if(element == null){
            return;
        }

        this.ClearClasses(element);

        element.className += ' is-valid';
        
    }

    static ClearClasses(element :HTMLInputElement){
        if(element.className.includes("form-select")){
            element.className = "form-select";
        }
        if(element.className.includes("form-control")){
            element.className = "form-control";
        }

        
    }
}

