import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import CartsProducts from "./components/CartsProducts.js"
import Summary from "./components/Summary";

export default function Cart() {
    return (
        <div>
            <TopBar />
            <PageHeader name="CART" />
            <CartsProducts />
            <Summary />
        </div>
    );
}