import { Container } from "./styles";
import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import Product from "./Product";
import productTest from "../../assets/images/productTest.png";
import { useContext, useEffect } from "react";
import GlobalContext from "../../components/context/GlobalContext";

export default function Products() {
	const { setCartProducts, userData, getUserFromLocalStorage } =
		useContext(GlobalContext);

	useEffect(() => {
		const localStorage = getUserFromLocalStorage();
		if (localStorage?.user?.cart) {
			const storagedCart = localStorage?.user?.cart;
			setCartProducts(storagedCart);
		}

		if (userData.user?.cart) setCartProducts(userData.user.cart);
	}, []);

	//products just for test
	//will be replaced by database products
	//and the page will be populated dinamically
	return (
		<div>
			<TopBar />
			<PageHeader name={"SHOP"} />
			<Container>
				<Product
					id={1}
					name={"PRODUCT 1 NAME"}
					description={
						"Product description, nothing too much important just a lorem ipsum to preencher tudo"
					}
					price={"U$ 9.00"}
					image={productTest}
				/>
				<Product
					id={2}
					name={"PRODUCT 2 NAME"}
					description={
						"Product description, nothing too much important just a lorem ipsum to preencher tudo"
					}
					price={"U$ 9.00"}
					image={productTest}
				/>
				<Product
					id={3}
					name={"PRODUCT 3 NAME"}
					description={
						"Product description, nothing too much important just a lorem ipsum to preencher tudo"
					}
					price={"U$ 9.00"}
					image={productTest}
				/>
				<Product
					id={4}
					name={"PRODUCT 4 NAME"}
					description={
						"Product description, nothing too much important just a lorem ipsum to preencher tudo"
					}
					price={"U$ 9.00"}
					image={productTest}
				/>
				<Product
					id={5}
					name={"PRODUCT 5 NAME"}
					description={
						"Product description, nothing too much important just a lorem ipsum to preencher tudo"
					}
					price={"U$ 9.00"}
					image={productTest}
				/>
				<Product
					id={6}
					name={"PRODUCT 6 NAME"}
					description={
						"Product description, nothing too much important just a lorem ipsum to preencher tudo"
					}
					price={"U$ 9.00"}
					image={productTest}
				/>
			</Container>
		</div>
	);
}
