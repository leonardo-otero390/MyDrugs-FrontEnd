import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import GlobalContext from "../context/GlobalContext";
import Spinner from "../Spinner";
import { Fragment } from "react/cjs/react.production.min";

/* 
product expected schema
const product = {
    id,
    price,
    amount,
    name
}
*/

export default function Summary({ isActive }) {
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(isActive)
    const [ paymentOption, setPaymentOption ] = useState(0)
    const { selectedProducts } = useContext(GlobalContext)

    useEffect(() => {
        let unmounted;
        let sum = 0
        selectedProducts.forEach(product => {
            sum += (product.price * product.amount)
        });

        if(!unmounted) {            
            setTotalPrice(sum)
            setIsLoading(false)
        }

        return () => { unmounted = true }
    }, [setIsLoading, setTotalPrice, selectedProducts])

    return (
        <SummaryContainer
            initial="unactive"
            animate={ isActive ? "active" : "unactive" }
            variants={variants}
        >
            {
                isLoading
                    ? <Spinner color="800080" size={32}/>
                    : selectedProducts.length === 0
                        ? <Title>Sorry, you have nothing on your cart yet</Title>
                        : (
                            <Fragment>
                                <Title>Order summary</Title>
                                <OrderSection>
                                    {
                                        selectedProducts.map(product => (
                                            <ProductLine key={product.id}>
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
                                <Title>Payment options</Title>
                                <PaymentSection>
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
                                <CheckoutButton
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    Check out
                                </CheckoutButton>
                            </Fragment>
                        )
            }

        </SummaryContainer>
    )
}

const variants = {
    active: {
        height: "500px",
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
        opacity: 1,
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
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
`

const OrderSection = styled.section`
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

const PaymentSection = styled.section`
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

const Title = styled.h1`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.2rem;
    line-height: 20px;
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
    color: #800080;
    text-shadow: 2px 2px 2px #80008090;
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
