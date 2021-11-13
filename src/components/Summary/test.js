import { useState } from "react"
import styled from "styled-components"
import Summary from "."

export default function Tester() {
    const [ toggle, setToggle ] = useState(true)

    return (
        <Test>
            <button onClick={() => {
                    console.log("oi")
                    setToggle(prev => !prev)
                }
            }
            >Toggle</button>
            <Summary products={[product, product, product]} isActive={toggle} />
        </Test>
    )
}

const product = {
    price: 100,
    amount: 2,
    name: "caixa"
}

const Test = styled.div`
    width: 100vw;
    height: 100vh;
`