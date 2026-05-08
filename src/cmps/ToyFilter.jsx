import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'
import { SET_FILTER_BY } from '../store/toy.reducer'


export function ToyFilter() {

    const filterBy = useSelector(state => state.toyModule.filterBy)
    const dispatch = useDispatch()

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedApplyFilter =
        useRef(utilService.debounce(filterBy => {
            dispatch({ type: SET_FILTER_BY, filterBy })
        }, 500)).current

    useEffect(() => {
        // Notify parent
        debouncedApplyFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }



    function handleStatus({ target }) {
        const { value: status } = target
        const filterBy = { ...filterByToEdit, status }

        setFilterByToEdit(filterBy)
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

        // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { name, price, status } = filterByToEdit
    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={name} onChange={handleChange}
                    type="search" placeholder="By Name" id="name" name="name"
                />
                <label htmlFor="importance">Price: </label>
                <input value={price} onChange={handleChange}
                    type="number" placeholder="By Price" id="price" name="price"
                />
                <label htmlFor="status">Status: </label>
                <select value={status} onChange={handleStatus} id="status">
                    <option value="">All</option>
                    <option value="inStock">In Stock</option>
                    <option value="oustOfStuck">Out Of Stock</option>
                </select>

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}