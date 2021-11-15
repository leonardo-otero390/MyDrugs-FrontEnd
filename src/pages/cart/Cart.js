import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import CartsProducts from "./components/CartsProducts.js"
import Summary from "./components/Summary";
import { useState } from 'react';
import ModalCheckout from "./components/ModalCheckout.js";

export default function Cart() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [paymentOption, setPaymentOption] = useState(0)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <ModalCheckout closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                paymentOption={paymentOption} />
            <TopBar />
            <PageHeader name="CART" />
            <CartsProducts />
            <Summary openModal={openModal} payment={{ paymentOption, setPaymentOption }} />
        </div>
    );
}