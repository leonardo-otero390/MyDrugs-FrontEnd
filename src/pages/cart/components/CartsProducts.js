import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GlobalContext from "../../../components/context/GlobalContext";
import ProductCard from "./ProductCard";
import LoadingScreen from "../../../components/LoadingScreen";
import API from "../../../services/API/requests";

export default function CartsProducts() {
	const [ isLoading, setIsLoading ] = useState(true)
	const { cartProducts, userData } = useContext(GlobalContext);
	const [ productsToRender, setProductsToRender ] = useState([])
	const [ update, setUpdate ] = useState(0)

	useEffect(() => {
		if(userData?.token) {
			console.log(userData.token)
			API.getCart(userData.token)
				.then(res => {
					console.log("RES: ",res)
					setProductsToRender(res.products)
					setIsLoading(false)
				})
				.catch(e => {
					console.log(e)
					alert("ERRO")
				})
		} else {
			setProductsToRender(cartProducts);
			setIsLoading(false);
		}
	}, [setProductsToRender, userData, update]);

	if(isLoading) return <LoadingScreen />

	return (
		<section>
			<StyledTableHeaders>
				<div>
					<h2>Product</h2>
				</div>
				<div>
					<h2>Quantity</h2>
				</div>
				<div>
					<h2>Price per un</h2>
				</div>
				<div>
					<h2>Total price</h2>
				</div>
			</StyledTableHeaders>
			<ul>
				{productsToRender.map(
					({ name, description, image, quantity, price, id }, index) => (
						<ProductCard
							key={id}
							index={index}
							name={name}
							description={description}
							image={image}
							quantity={quantity}
							price={Number(price).toFixed(2)}
							id={id}
							setUpdate={setUpdate}
						/>
					)
				)}
			</ul> 
		</section>
	);
}

const StyledTableHeaders = styled.div`
	display: flex;
	justify-content:space-between;
	border-bottom: 1px solid #f2f2f2;
	div {
		width: 20%;
		height: 32px;
		display: flex;
		justify-content: center;
	}
	div:nth-child(2) {
		width: 10%;
	}
	div:first-child {
		justify-content: flex-start;
		width: 40%;
	}
	div h2 {
		font-family: "Poppins", sans-serif;
		font-size: 24px;
		color: #fff;
	}
`;
