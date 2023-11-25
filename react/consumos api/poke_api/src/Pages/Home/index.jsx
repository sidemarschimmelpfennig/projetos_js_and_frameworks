import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import { Grid } from '@mui/material'
import axios from 'axios'
import NavBar from '../../Components/NavBar'
import PokeCard from '../../Components/PokeCard'

 export default function Home() {
    const [pokemons, setPokemons] = useState([ ])
    useEffect(( ) =>{
        getPokemons()
    }, []
    )

    const getPokemons = () =>{
        var endPoints = []
        for (let i = 1; i < 51; i++) {
            if (endPoints === null){
                getPokemons()
            }
            endPoints.push( `https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        console.log(endPoints)
        const Response = axios.all(endPoints.map((endPoint)=> axios.get(endPoint))).then((res) => setPokemons(res))
        return Response;
    }
    const pokeapiFilter = (name ) =>{
        var Filter = []
        for (var i in pokemons){
            if (pokemons[i].data.name.includes(name)){
                Filter.push(pokemons[i])
            }
        } 
        setPokemons(Filter)
    }



    return (
     <div style={{backgroundColor:'#d3d3d3'}}>
        <NavBar filterPokemon={pokeapiFilter}/>
        <Container maxWidth='false' >
            <Grid container spacing={2} >
                {pokemons.map((pokemon, key)=>(
                    <Grid item xs={2.4}  key={key}>
                        <PokeCard name={pokemon.data.name} image={pokemon.data.sprites.front_default}/>
                    </Grid>
                ))
                }
            </Grid>
        </Container>
     </div>
   )
 }
  