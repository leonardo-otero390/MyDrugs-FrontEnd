import { Container, NoProductsMsg } from "./styles";
import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import Product from "./Product";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../components/context/GlobalContext";
import API from "../../services/API/requests";

export default function Products() {
	const [productsList, setProductsList] = useState([]);

	useEffect(() => {
		API.getProducts()
			.then((resp) => setProductsList(resp.data))
			.catch(() =>
				alert("Erro ao carregar produtos. Por favor, recarregue a página.")
			);
	}, []);

	const { setCartProducts, userData, getUserFromLocalStorage } =
		useContext(GlobalContext);

	useEffect(() => {
		const localStorage = getUserFromLocalStorage();
		if (localStorage?.user?.cart) {
			const storagedCart = localStorage?.user?.cart;
			setCartProducts(storagedCart);
		}

		if (userData.user?.cart) setCartProducts(userData.user.cart);
	}, [getUserFromLocalStorage, setCartProducts, userData.user]);

	return (
		<div>
			<TopBar />
			<PageHeader name={"SHOP"} />
			<Container>
				{productsList.length > 0 ? (
					productsList.map((product) =>
						product.stock_total > 0 ? (
							<Product
								key={product.id}
								id={product.id}
								name={product.name}
								description={product.description}
								price={`${Number(product.price).toFixed(2)}`}
								image={product.image}
								stock={product.stock_total}
							/>
						) : null
					)
				) : (
					<NoProductsMsg children="Nenhum produto disponível" />
				)}
			</Container>
		</div>
	);
}
