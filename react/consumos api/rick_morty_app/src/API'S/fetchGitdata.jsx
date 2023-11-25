import react from react

const fetchGitdata = async () =>{
    const url = 'https://raw.githubusercontent.com/sidemarschimmelpfennig/data_assets/main/rick_morty/data.json'
    const response = await fetch(url)
    const Data = await response.json()
    return Data
}

export default fetchGitdata()
