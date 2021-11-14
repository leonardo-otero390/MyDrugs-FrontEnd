import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import GlobalContext from "../../../../components/context/GlobalContext";
import { Fragment } from "react/cjs/react.production.min";
import PaymentSection from "./PaymentSection";
import OrderSection from "./OrderSection";
import Toggler from "./Toggler";

/* 
product expected schema
const product = {
    id,
    price,
    quantity,
    name
}
*/

export default function Summary() {
    const [ isActive, setIsActive ] = useState(false)
    const { cartProducts } = useContext(GlobalContext)

    return (
        <SummaryContainer
            initial="unactive"
            animate={ isActive ? "active" : "unactive" }
            variants={variants}
            onClick={() => { setIsActive(prev => !prev) }}
        >

            <Toggler parentIsActive={isActive} toggleState={setIsActive} />
            {
                cartProducts.length === 0
                    ? <Title>Sorry, you have nothing on your cart yet</Title>
                    : (
                        <ContentContainer
                            initial="unactive"
                            animate={isActive ? "active" : "unactive" }
                            variants={contentVarianst}
                        >
                            <Title>Order summary</Title>
                            <OrderSection />

                            <Title>Payment options</Title>                            
                            <PaymentSection />

                            <CheckoutButton
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={e => {
                                    e.stopPropagation()
                                }}
                            >
                                Check out
                            </CheckoutButton>

                        </ContentContainer>
                    )
            }
        </SummaryContainer>
    )
}

const variants = {
    active: {
        height: "500px",
        opacity: 1,
        cursor: "unset",
    },
    unactive: {
        height: "75px",
        y: 15,
        opacity: 0.7,
        cursor: "pointer"
    }
}

const contentVarianst = {
    active: {
        scale: 1,
        opacity: 1,
    },
    unactive: {
        scale: 0,
        opacity: 0,
    }
}

const ContentContainer = styled(motion.div)`
        display: flex;
        flex-direction: column;
`

const SummaryContainer = styled(motion.div)`
    position: fixed;
    bottom: 0;
    right: 20px;
    background-color: #191919;
    color: #fff;
    width: 300px;
    border-radius: 20px 20px 0px 0px;
    border: 2px solid #800080;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    padding: 20px;
`





const Title = styled.h1`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.2rem;
    line-height: 20px;
`



const CheckoutButton = styled(motion.button)`
    width: 90%;
    max-width: 300px;
    height: 32px;
    align-self: center;
    margin-top: 20px;
    background-color: #00ADF0;
    border-radius: 5px;
    border: none;
    outline: none;
    color: #fff;
    font-weight: 600;
`
