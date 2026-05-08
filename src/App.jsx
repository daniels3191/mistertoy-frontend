import { BrowserRouter as Router } from 'react-router-dom'
// const Router = ReactRouterDOM.HashRouter
import { Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'


import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { store } from './store/store.js'

export function App() {

    return (
      <Provider store={store}>
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/toy/:toyId" element={<ToyDetails />} />
                        <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                        <Route path="/toy/edit" element={<ToyEdit />} />
                        <Route path="/toy" element={<ToyIndex />} />
                       

                    </Routes>
                </main>
            </section>
        </Router>
        </Provider>
    )
}