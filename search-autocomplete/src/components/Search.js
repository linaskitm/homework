import React,{useState, useEffect, useRef} from 'react'

const Search = () => {
    const [display, setDisplay] = useState(false)
    const [options, setOptions] = useState([])
    options.length = 6
    const [search, setSearch] = useState('')

    const api = `770e4fcc61712890309e30cd767d4eb5`
    const url = `https://api.themoviedb.org/3/search/movie?api_key=770e4fcc61712890309e30cd767d4eb5&query=${search}`

    useEffect(() => {
        const getData = () => {
            fetch(url)
            .then((response) => response.json())
            .then(movies =>{
                const temp = movies.results.map(movie => {
                    return movie
                })
                setOptions(temp)
            })
        }
        if(search !== "" && search.length > 2){
            getData()
        }       
    }, [search])

     const setMovie = (selected) => {
         setSearch(selected)
         setDisplay(false)
     }

     
    return (
        <div>
            
                <input
                    value = {search}
                    onChange = {(e) => setSearch(e.target.value)}
                    onClick={() => setDisplay(!display)}
                />
                {display && (<div>
                    {options.map(item =>{
                        return (
                        <div onClick = {()=> setMovie(item.title)}>
                            <span>{item.title}</span>
                            <p>{item.vote_average} Raiting, {item.release_date?item.release_date.split("-")[0]:false}</p>
                        </div>
                    )})}
                    
                    </div>)}
                    <button type="submit" onClick={() => setDisplay(true)} >show</button>
        
        </div>
    )
}

export default Search
