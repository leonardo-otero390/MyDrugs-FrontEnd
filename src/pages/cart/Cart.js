import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import CartsProducts from "./components/CartsProducts.js"
export default function Cart() {
    return (
        <div>
            <TopBar />
            <PageHeader name="CART" />
            < CartsProducts />
        </div>
    );
}