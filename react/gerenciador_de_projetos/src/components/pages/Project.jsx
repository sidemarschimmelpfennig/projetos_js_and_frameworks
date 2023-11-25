import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import {  v4 as uuidv4 } from "uuid"

import styles from "./Project.module.css"
import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm"
import Message from "../layout/Message"
import ServiceForm from "../services/ServiceForm"
import ServiceCard from "../services/ServiceCard"


function Project(){
   //-------------- var for general page --------------------------- for github/sidemarschimmelpfennig
   const { id } = useParams();
   const [project, setProject] = useState([]);
   const [services, setServices] = useState([])
   const [showProjectForm, setShowProjectForm] = useState(false);
   const [showServiceForm, setShowServiceForm] = useState(false);
   const [message, setMessage] = useState("");
   const [type, setType] = useState();
    //---------------- for function edit ||  close in Project ------------ for github/sidemarschimmelpfennig
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }     
    //-----------function edit post ---------------------------- for github/sidemarschimmelpfennig

    function editPost(project){
        
    //------------------validation for value from project------------------ for github/sidemarschimmelpfennig 
        if(project.budget < project.cost){
            setMessage("O orçamento nao pode ser menor que o custo do projeto!")
            setType("error")
            return (false)
        }
 
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project),
        })
        .then( response => response.json())
        .then((data) =>{
             setProject(data)
             setShowProjectForm(!showProjectForm)
             setMessage("Projeto atualizado!")
             setType("sucess")
        })
        
    }

    //-----------function Create Service --------------------- for github/sidemarschimmelpfennig

    function createService(project){  

        const lastService = project.services[project.services.length - 1 ]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)      
   
        //----------- if for costs validation ---------------------for github/sidemarschimmelpfennig
        if (newCost > parseFloat(project.budget)){
            setMessage("Orçamento maior que o valor do projeto");
            setType("error")
            project.services.pop() 
            return(false);
        }
        //---------- Add Service -------------------------------- for github/sidemarschimmelpfennig
        project.cost = newCost;
       
        //----------- fetch from set Service message show at service|| no service ------------------ for github/sidemarschimmelpfennig
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project),
        } )
        .then((response) => response.json())
        .then((data) => {
            setServices(data.services)
            setShowServiceForm(false)
            setMessage('Serviço adicionado!')
            setType('success')
        }).catch(console.log)
        
        }

    //---------------Remove Service ------------------- from github/sidemarschimmelpfennig
    function removeService(id, cost){
        const serviceUpdated = project.services.filter(
            (service) => service.id !== id, 
        ) 

        const projectUpdated = project

        projectUpdated.services = serviceUpdated

        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

            fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
               method: "PATCH",
               headers: {
                   "Content-Type" : "application/json"
               },
               body: JSON.stringify(projectUpdated)

            })
            .then((response) => response.json())
            .then((data) =>{
                setProject(projectUpdated)
                setServices(serviceUpdated)
                setMessage("Serviço deletado com sucesso!")
             } )
            .catch(err => console.log(err))

    }


    //---------useEffects for response services ------------ from github/sidemarschimmelpfennig
   useEffect(() => {
       setTimeout(() =>{
       fetch(`http://localhost:5000/projects/${id}`, {
           method: 'GET',
           headers: {
               "Content-Type" : "application/json",
           }
       })
       .then((response) => response.json())
       .then((data) => {
           setProject(data)
           setServices(data.services)
       })
       .catch(console.log)
    }, 300)
   }, [id])
   
   return(
    <>
        {project.name ? (
        <div className={styles.project_details}>
        <Container customClass="column">
            {message && <Message type={type} msg={message}/>}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name} </h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>
                            {!showProjectForm ? "Editar Projeto" : "Fechar"  }
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total do Orçamento:</span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R$ {project.cost}
                                </p>
                        
                            </div>
                        ): (
                        <div className={styles.project_info}>
                            <ProjectForm
                            handleSubmit={editPost}
                            btnText="Concluir Edição"
                            projectData={project}
                            />
                        </div>)}
                </div>
                <div className={styles.services_container}>
                        <h2>Adicione um serviço:</h2>
                        <button
                        className={styles.btn} 
                        onClick={toggleServiceForm}>
                        
                        {!showServiceForm ? "Adicionar serviço":"Fechar"}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}
                                />   
                            )}
                        </div>  
                    </div>
                    <h2>Serviços:</h2>
                    
                    <Container customClass="start">
                   
                    {
                        services.length > 0 && (
                        services.map((service) => (
                        <ServiceCard
                          id={service.id}
                          name={service.name}
                          cost={service.cost}
                          description={service.description}
                          key={service.id}
                          handleRemove={removeService}
                        />
                            
                        )))
                        }
                        {services.length === 0 && 
                        <p>Não ha serviços cadastrados</p>
                        }
                    </Container>                  
                </Container>
            </div>
        ) : (
            <Loading/>
        )}
        
   
    </>
   );

}

export default Project