import { useState, useEffect, useContext } from "react";
import GlobalContext from "../../../../components/context/GlobalContext";
import styled from "styled-components";


export default function OrderSection() {
    const [ totalPrice, setTotalPrice ] = useState(0);
    const { selectedProducts } = useContext(GlobalContext)

    useEffect(() => {
        let unmounted;
        let sum = 0;

        selectedProducts.forEach(product => {
            sum += (product.price * product.quantity)
        });

        if(!unmounted) setTotalPrice(sum)

        return () => { unmounted = true }
    }, [ setTotalPrice, selectedProducts ])

    return (
        <OrderSectionContainer
            onClick={e => { e.stopPropagation() }}
        >
            {
                selectedProducts.map((product, index) => (
                    <ProductLine key={index}>
                        <ProductInfo>{`${product.quantity}x ${product.name}`}</ProductInfo>
                        <ProductInfo>{`${product.price * product.quantity}`}</ProductInfo>
                    </ProductLine>
                ))
            }
            <ProductsBalance>
                <p>TOTAL</p>
                <p>{totalPrice}</p>
            </ProductsBalance>
        </OrderSectionContainer>
    )
}

const OrderSectionContainer = styled.section`
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