import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getFilteredToys, loadToys, removeToy } from "../store/actions/toy.actions.js"

export function ToyIndex() {

    // const [toys, setToys] = useState(null)

    // Special hook for accessing search-params:
    // const [searchParams, setSearchParams] = useSearchParams()
    // const defaultFilter = toyService.getFilterFromSearchParams(searchParams)

    // const [filterBy, setFilterBy] = useState(defaultFilter)
    const toys = useSelector(getFilteredToys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const isLoading = useSelector(state => state.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        if (!confirm('Are you sure?')) return

        removeToy(toyId)
            .then(() => {
                showSuccessMsg(`Toy removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove toy ' + toyId)
            })
    }


    if (!toys) return <div>Loading...</div>
    return (
        <section className="toy-index">
            <ToyFilter/>
            <div>
                <Link to="/toy/edit" className="btn" >Add Toy</Link>
            </div>
            <h2>Toys List</h2>
            <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
            <hr />
        </section>
    )
}