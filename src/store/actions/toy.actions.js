import { store } from '../store.js'
import { toyService } from '../../services/toy.service.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY } from '../toy.reducer.js'

export function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

	return toyService.query()
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function removeToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function saveToy(toy, isToggle = false) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy, isToggle)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            if (isToggle && toy.isDone) {
                store.dispatch({ type: SET_USER_BALANCE })
            }
            return savedToy
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function getFilteredToys(state) {
    const filterBy = state.toyModule.filterBy
    let toys = [...state.toyModule.toys]

    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        toys = toys.filter(toy => regExp.test(toy.name))
    }

    if (filterBy.price) {
        toys = toys.filter(toy => toy.price >= filterBy.price)
    }
    if (filterBy.status) {
        toys = toys.filter(toy => filterBy.status === 'inStock'? toy.inStock : !toy.inStock)
    }

    return toys
}