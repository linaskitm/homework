import React,{useState, useEffect} from 'react'
import searchIcon from '../icons/search.svg'
import movieIcon from '../icons/movie.svg'

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
        <div className='nav'>
            <div className='inputDiv' >
                <img src={movieIcon} alt='movieIcon'/>
                <input className='input'
                
                    placeholder='Enter the movie'
                    value = {search}
                    onChange = {(e) => setSearch(e.target.value)}
                    onClick={() => setDisplay(!display)}
                />
                <button className='btn' type="submit" onClick={() => setDisplay(true)} ><img src={searchIcon} alt=''/></button>
            </div>    
                
                {display && (<div className='optionList' >
                    {options.map(item =>{
                        return (
                        <div  className='option'
                                key={item.id}
                            onClick = {()=> setMovie(item.title)}>
                            <p>{item.title}</p>
                            <p>{item.vote_average} Raiting, {item.release_date ? item.release_date.split("-")[0]:false}</p>
                        </div>
                    )})}
                    
                    </div>)}
                    
        
        </div>
    )
}

export default Search
