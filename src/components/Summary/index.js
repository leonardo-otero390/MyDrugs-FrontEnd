import { useEffect } from "react";
import styled from "styled-components";

/* 
const product = {
    price,
    amount,
    name
}
*/

export default function Summary({ products }) {
    useEffect(() => {
        let sum = 0
        products.forEach(product => {
            sum += (product.price * product.amount)
        });
    })

    return (
        <SummaryContainer>
            <OrderSection>
                <Title>Order summary</Title>

            </OrderSection>
            <PaymentSection>

            </PaymentSection>
        </SummaryContainer>
    )
}

const SummaryContainer = styled.div`
    max-width: 400px;
    position: fixed;
    bottom: 0;
    right: 20px;
    background-color: #191919;
    height: 600px;
`