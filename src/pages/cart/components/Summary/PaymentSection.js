import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function PaymentSection() {
    const [ paymentOption, setPaymentOption ] = useState(0)

    return (
        <PaymentSectionContainer
            onClick={e => { e.stopPropagation() }}
        >
            <OptionLine onClick={() => setPaymentOption(0)}>
                <OptionName>Boleto</OptionName>
                <OptionMarker 
                    initial="unactive"
                    animate={ paymentOption === 0 ? "active" : "unactive" }
                    variants={MarkerVariants}
                />
            </OptionLine>

            <OptionLine onClick={() => setPaymentOption(1)} >
                <OptionName>Card</OptionName>
                <OptionMarker
                    initial="unactive"
                    animate={ paymentOption === 1 ? "active" : "unactive" }
                    variants={MarkerVariants}
                />
            </OptionLine>

            <OptionLine onClick={e => setPaymentOption(2)}>
                <OptionName>Pix</OptionName>
                <OptionMarker 
                    initial="unactive"
                    animate={ paymentOption === 2 ? "active" : "unactive" }
                    variants={MarkerVariants}
                />
            </OptionLine>
        </PaymentSectionContainer>
        )
}

const MarkerVariants = {
    active: {
        scale: 1,
        opacity: 1,
    },
    unactive: {
        scale: 0,
        opacity: 0,
    }
}

const PaymentSectionContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;  
    max-height: 200px;
    overflow-y: auto;
    padding-right: 10px;

    ::-webkit-scrollbar {
        width: 5px;               /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: inherit;        /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
        background-color: #800080;    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
    }
`

const OptionLine = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 10px;
`

const OptionName = styled.p`
    font-size: 18px;
`

const OptionMarker = styled(motion.div)`
    background-color: #800080;
    width: 18px;
    height: 18px;
    border-radius: 2px;
`