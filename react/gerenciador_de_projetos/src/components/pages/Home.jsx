import LinkButton from "../layout/LinkButton"
import styles from "./Home.module.css"
import savings from "../../img/savings.svg"


function Home(){
    return(
        <section className={styles.home_container}>
            <h1>
                Bem-vindo ao <span>Custo</span>
            </h1>
            <p>Comece a gerir seus Projetos agora mesmo!!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={savings} alt="Carregar"></img>
        </section>
    )
}

export default Home