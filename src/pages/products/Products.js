import { Container } from "./styles";
import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import Product from "./Product";
import productTest from "../../assets/images/productTest.png";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../components/context/GlobalContext";
import API from "../../services/API/requests";
import LoadingScreen from "../../components/LoadingScreen";

export default function Products() {
	const { setCartProducts, userData, getUserFromLocalStorage } =
		useContext(GlobalContext);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ products, setProducts ] = useState([])

	useEffect(() => {
		void function loadProducts() {
			API.getProducts()
				.then((res) => {
					setProducts(res.data)
					setIsLoading(false)
					console.log(res.data)
				})
				.catch(() => {
					alert("We are off for maintainence, kisses")
				})
		}()
	}, [setProducts, setIsLoading])

	useEffect(() => {
		const localStorage = getUserFromLocalStorage();
		if (localStorage?.user?.cart) {
			const storagedCart = localStorage?.user?.cart;
			setCartProducts(storagedCart);
		}

		if (userData.user?.cart) setCartProducts(userData.user.cart);
	}, []);

	if(isLoading) return <LoadingScreen />

	//products just for test
	//will be replaced by database products
	//and the page will be populated dinamically
	return (
		<div>
			<TopBar />
			<PageHeader name={"SHOP"} />
			<Container>
				{
					products.map(product => (
						<Product 
							key={product.id}
							id={product.id}
							name={product.name}
							description={product.description}
							price={product.price}
							image={product.image}
						/>
					))
				}
			</Container>
		</div>
	);
}
