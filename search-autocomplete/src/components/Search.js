import React,{useState, useEffect, useRef} from 'react'
import searchIcon from '../icons/search.svg'
import movieIcon from '../icons/movieWhite.svg'

const Search = () => {
    const [display, setDisplay] = useState(false)
    const [options, setOptions] = useState([])
    options.length = 8
    const [search, setSearch] = useState('')
    const wrapperRef = useRef(null)

    const api_key = `770e4fcc61712890309e30cd767d4eb5`
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`

    useEffect(() => {
        const getData = () => {
            fetch(url)
            .then(response => response.json())
            .then(movies =>{
                const temp = movies.results.map(movie => {return movie})
                setOptions(temp)
            })
            .catch(error => console.log(error))
        }
        if(search !== "" && search.length > 2){
            getData()
        }     
    }, [search])

    const setMovie = (selected) => {
        setSearch(selected)
        setDisplay(false)
    }
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside)
        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = event => {
        const {current: dropDown} = wrapperRef;
        if (dropDown && !dropDown.contains(event.target)) {
            setDisplay(false)
        }
    }

    
    return (
        <div className='nav' ref={wrapperRef}>
            <div className='form'  >
                <div  className='inputDiv' >
                    <img src={movieIcon} alt='movieIcon'/>
                    <input className='input'
                        placeholder='Enter the movie'
                        value = {search}
                        onChange = {(e) => setSearch(e.target.value)}
                        onClick={() => setDisplay(true)}
                    /> 
                </div> 
                <div className='btn'>
                    <button  type="submit" onClick={() => setDisplay(true)} ><img src={searchIcon} alt='alt'/></button>
                </div>
                
                {display && (<div className='optionList' >
                    {options.map(item =>{
                        return (
                        <div  className='option'
                                key={item.id}
                            onClick = {()=> setMovie(item.title)}>
                            <p className='title'>{item.title}</p>
                            <p>{item.vote_average} Raiting, {item.release_date ? item.release_date.split("-")[0]:false}</p>
                        </div>
                        )
                    })}
                </div>)}
            </div>  
        </div>
    )
}

export default Search
