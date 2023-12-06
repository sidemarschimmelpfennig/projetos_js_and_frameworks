import GeraCPF from './modules/GeraCPF'
import './assets/css/style.css'

(function(){
    const gerar = new GeraCPF()
    const cpfGerado = document.querySelector('.cpf-gerado')
    cpfGerado.innerHTML =  gerar.geraNovoCPF()
})()
