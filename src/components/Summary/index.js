import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion"
/* 
const product = {
    price,
    amount,
    name
}
*/

export default function Summary({ products, isActive }) {
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(isActive)
    const [ paymentOption, setPaymentOption ] = useState(0)

    useEffect(() => {
        let sum = 0
        products.forEach(product => {
            sum += (product.price * product.amount)
        });
        setTotalPrice(sum)
        setIsLoading(false)
    }, [setIsLoading, setTotalPrice, products])



    return (
        <SummaryContainer
            initial="unactive"
            animate={ isActive ? "active" : "unactive" }
            variants={variants}
        >
            <OrderSection>
                <Title>Order summary</Title>
                {
                    products.map(product => (
                        <ProductLine>
                            <ProductInfo>{`${product.amount}x ${product.name}`}</ProductInfo>
                            <ProductInfo>{`${product.price * product.amount}`}</ProductInfo>
                        </ProductLine>
                    ))
                }
                <ProductsBalance>
                    <p>TOTAL</p>
                    <p>{totalPrice}</p>
                </ProductsBalance>
            </OrderSection>
            <PaymentSection>
                <Title>Payment options</Title>
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

                    <OptionLine onClick={() => setPaymentOption(2)}>
                        <OptionName>Pix</OptionName>
                        <OptionMarker 
                            initial="unactive"
                            animate={ paymentOption === 2 ? "active" : "unactive" }
                            variants={MarkerVariants}
                        />
                    </OptionLine>
            </PaymentSection>
        </SummaryContainer>
    )
}

const variants = {
    active: {
        height: "400px",
        opacity: 1,
        padding: "20px",
    },
    unactive: {
        height: "0px",
        opacity: 0,
        padding: 0,
        y: 15
    }
}

const MarkerVariants = {
    active: {
        scale: 1,
        opacity: 1
    },
    unactive: {
        scale: 0,
        opacity: 0,
    }
}

const SummaryContainer = styled(motion.div)`
    position: fixed;
    bottom: 0;
    right: 20px;
    background-color: #191919;
    color: #fff;
    width: 300px;
    border-radius: 20px 20px 0px 0px;
    border: 2px solid #800080;
`

const OrderSection = styled.section`
    display: flex;
    flex-direction: column;
`

const PaymentSection = styled.section`
    display: flex;
    flex-direction: column;`

const Title = styled.h1`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
`

const ProductLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`

const ProductInfo = styled.p`
    display: flex;
    flex-direction: column;`

const ProductsBalance = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bolder;
    font-size: 20px;
    margin: 10px 0px 30px 0px;
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