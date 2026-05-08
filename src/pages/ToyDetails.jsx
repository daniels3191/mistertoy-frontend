import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [params.toyId])


    function loadToy() {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/toy')
        // navigate(-1)
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1 >{toy.name}</h1>

            <h1>Price: {toy.price}</h1>
            <h1 style={{color: toy.inStock?  '' : 'red'}}>In Stock? {toy.inStock?  'Yes' : 'No'}</h1>

            <button onClick={onBack}>Back to list</button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                <Link to={`/toy/${toy.prevToyId}`}> Previous Toy</Link>
            </div>
        </section>
    )
}