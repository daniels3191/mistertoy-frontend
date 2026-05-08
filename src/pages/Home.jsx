import { ToggleButton } from "../cmps/ToggleButton.jsx"

import { useState } from 'react'

export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Toy's R Us!</h1>
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src="https://t4.ftcdn.net/jpg/05/36/96/93/240_F_536969308_ISujy0XpgP9IjFUHZK2DcBPuPzcAi6lO.jpg" alt="" />}
        </section>
    )
}