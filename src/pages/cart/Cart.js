import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import CartsProducts from "./components/CartsProducts.js"
import Summary from "./components/Summary";
import styled from "styled-components";
import { Fragment } from "react/cjs/react.production.min";

export default function Cart() {
    return (
        <Fragment>
            <TopBar />
            <CartContainer>
                <PageHeader name="CART" />
                <CartsProducts />
                <Summary />
            </CartContainer>
        </Fragment>
    );
}

const CartContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 0px 40px 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`