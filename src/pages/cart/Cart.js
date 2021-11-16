import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import CartsProducts from "./components/CartsProducts.js"
import Summary from "./components/Summary";
import ModalCheckout from "./components/ModalCheckout";
import { useState } from "react";

export default function Cart() {
    const [ openModal, setOpenModal ] = useState(false);

    function closeModal() {
        setOpenModal(false)
    }

    return (
        <div>
            <TopBar />
            <PageHeader name="CART" />
            <CartsProducts />
            <Summary 
                openModal={ () => { setOpenModal(true) } }
            />
            <ModalCheckout 
                isOpen={openModal}
                closeModal={closeModal}
                onRequestClose={closeModal}
            />
        </div>
    );
}