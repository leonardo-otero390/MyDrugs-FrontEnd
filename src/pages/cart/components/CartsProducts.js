import { useContext, useEffect } from "react";
import styled from "styled-components";
import GlobalContext from "../../../components/context/GlobalContext";
import ProductCard from "./ProductCard";

export default function CartsProducts() {
	const { cartProducts,setCartProducts, userData, getUserFromLocalStorage } =
		useContext(GlobalContext);

	useEffect(() => {
		const localStorage = getUserFromLocalStorage();
		if (localStorage?.user?.cart) {
			const storagedCart = localStorage?.user?.cart;
			setCartProducts(storagedCart);
		}

		if (userData.user?.cart) setCartProducts(userData.user.cart);
	}, []);
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
				{cartProducts.map(
					({ name, description, image, quantity, price }, index) => (
						<ProductCard
							key={index}
							index={index}
							name={name}
							description={description}
							image={image}
							quantity={quantity}
							price={price}
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
