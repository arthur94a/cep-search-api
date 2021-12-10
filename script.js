const cepValue = document.getElementById('cep');
const cepBtn = document.getElementById('cepBtn')
const city = document.querySelector('.adr-city')
const district = document.querySelector('.adr-district')
const street = document.querySelector('.adr-street')
const invalidSearch = document.querySelector('.invalid-search')
const divInfo = document.querySelector('.adr-info')

cepValue.addEventListener('keydown', event => {
    const key = event.keyCode;
    if (key == 13) {
        return handleClick(event);
    }
});

cepBtn.addEventListener('click', handleClick)

function handleClick(event) {
    event.preventDefault();
    const cep = cepValue.value;
    if (cep === '') {
        invalidSearch.innerText = 'insira um CEP';
        divInfo.innerText = '';
        city.innerText = '';
        district.innerText = '';
        street.innerText = '';
    } else if (cep.length != 8 ) {
        invalidSearch.innerText = 'CEP Invalido!';
        divInfo.innerText = '';
        city.innerText = '';
        district.innerText = '';
        street.innerText = '';
    } else {
        invalidSearch.innerText = '';
        buscaCep(cep);
    }
}

function buscaCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(r => r.json())
        .then(body => {
            new Promise(function (resolve, reject) {
                if (body.localidade != undefined) {
                    resolve(
                        invalidSearch.innerText = '',
                        divInfo.innerText = 'Endereço:',
                        city.innerText = body.localidade + ', ' + body.uf,
                        district.innerText = body.bairro,
                        street.innerText = body.logradouro
                    );
                } else {
                    reject(
                        invalidSearch.innerText = 'CEP Invalido!',
                        divInfo.innerText = '',
                        city.innerText = '',
                        district.innerText = '',
                        street.innerText = '',
                        console.log('Endereço inexistente')
                    )
                }
            });

        })
}