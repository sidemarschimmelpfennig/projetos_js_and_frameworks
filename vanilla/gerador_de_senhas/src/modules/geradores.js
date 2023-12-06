const rand = (min,max) => Math.floor(Math.random() * (max - min ) + min)

const geraMaiuscula = () => String.fromCharCode(rand(65,91))
const geraMinusculas = () => String.fromCharCode(rand(97, 123))
const geraNumeros = () => String.fromCharCode(rand(48,58))
const simbols = `,.!*/-+)(&¨%$#@[]{}=_ªº`
const geraSymbol = () => simbols[rand(0, simbols.length)]


export default (qtd, maiusculas, minusculas, numeros , symbols) =>{
    const passwordArray = []
    qtd = Number(qtd)
    for (let i = 0; i < qtd; i++) {
        maiusculas && passwordArray.push(geraMaiuscula())
        minusculas && passwordArray.push(geraMinusculas())
        numeros && passwordArray.push(geraNumeros())
        symbols && passwordArray.push(geraSymbol())
    }
    return passwordArray.join('').slice(0, qtd)
} 
