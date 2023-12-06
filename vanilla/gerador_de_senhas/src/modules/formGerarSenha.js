import geraSenha from './geradores'

const senhaGerada = document.querySelector('.senha-gerada')
const qtdCaracteres = document.querySelector('.qtd-caracteres')
const maiuscula = document.querySelector('.chk-maiusculas')
const minuscula = document.querySelector('.chk-minusculas')
const symbols = document.querySelector('.chk-symbol')
const numeros = document.querySelector('.chk-numeros')
const gerarSenha = document.querySelector('.gerar-senha')


export default () =>{
    gerarSenha.addEventListener('click', ()=>{
         senhaGerada.innerHTML = gera()
    })
}


function gera () {
    const response = geraSenha(
        qtdCaracteres.value,
        maiuscula.checked,
        minuscula.checked,
        numeros.checked,
        symbols.checked,
         )
    return response || `Nada Selecionado`
}