import {
	AiFillPlusCircle as PlusCircle,
	AiFillMinusCircle as MinusCircle,
} from "react-icons/ai";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../components/context/GlobalContext";

export default function ProductCard({
	index,
	name,
	description,
	image,
	quantity,
	price,
	id,
	setUpdate
}) {
	const [ quantityInCart, setQuantityInCart ] = useState(0)
	const { cartProducts, updateCartProducts } = useContext(GlobalContext);

	useEffect(() => {
		if (!cartProducts.length) return;
		const productAlredyAdded = cartProducts.find(
			(product) => product.id === id
		);
		if (productAlredyAdded) setQuantityInCart(productAlredyAdded.quantity);
	}, [cartProducts, id]);


	function addProduct() {
		console.log(">>>>>>ADDING FROM CART<<<<<<<<<<<")

		const indexThisProduct = cartProducts.findIndex(
			(product) => product.id === id
		);
		console.log("index this project: ",indexThisProduct)
		if (indexThisProduct >= 0) cartProducts.splice(indexThisProduct, 1);
		const alteredProduct = { id, quantity: quantityInCart + 1 };

		updateCartProducts(
			[
				...cartProducts,
				{
					id,
					name,
					price,
					quantity: quantityInCart + 1,
					image
				}
			]
			, alteredProduct);
		setQuantityInCart(prev => prev + 1)
	}

	function removeProduct() {
		console.log(">>>>>>>>>>REMOVE FROM CART<<<<<<<")

		const indexThisProduct = cartProducts.findIndex(
			(product) => product.id === id
		);
		if (indexThisProduct >= 0) cartProducts.splice(indexThisProduct, 1);
		
		if (quantityInCart === 1) {
			const alteredProduct = { id };
			const confirmRemove = window.confirm("Do you really want to remove?");
			if (!confirmRemove) return;
			else {
				cartProducts.splice(indexThisProduct, 1);
				updateCartProducts([...cartProducts], alteredProduct);
				setUpdate(prev => prev + 1)
				return;
			}
		} else {
			const alteredProduct = { id, quantity: quantityInCart - 1 };

			updateCartProducts(
				[
					...cartProducts,
					{
						id,
						name,
						price,
						quantity: quantityInCart - 1,
						image
					}
				]
				, alteredProduct);
			setQuantityInCart(prev => prev - 1)

		}

	}
	const totalPrice = 'U$ ' + ((price.replace('U$', '')) * quantity).toFixed(2);
	return (
		<StyledProductCard>
			<StyledProductInfo>
				<img src={image} alt={name} />
				<div>
					<h3>
						<strong>{name}</strong>
					</h3>
					<p>{description}</p>
				</div>
			</StyledProductInfo>
			<StyledCounter>
				<button onClick={removeProduct}>
					<MinusCircle
						style={{
							color: "#F2F2F2",
							fontSize: "32px",
						}}
					/>
				</button>
				<h1>
					<strong>{quantityInCart}</strong>
				</h1>
				<button onClick={addProduct}>
					<PlusCircle
						style={{
							color: "#F2F2F2",
							fontSize: "32px",
						}}
					/>
				</button>
			</StyledCounter>
			<StyledPrice>
				<h1>
					<strong>{price}</strong>
				</h1>
			</StyledPrice>
			<StyledPrice>
				<h1>
					<strong>{(Number(price)*quantityInCart).toFixed(2)}</strong>
				</h1>
			</StyledPrice>
		</StyledProductCard>
	);
}
const StyledProductInfo = styled.ul`
	display: flex;
	width: 40%;
	img {
		width: 150px;
		margin-right: 16px;
	}
	div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	h3 {
		font-family: "Poppins", sans-serif;
		font-size: 18px;
		color: #fff;
	}
	p {
		font-family: "Poppins", sans-serif;
		font-size: 14px;
		color: #fff;
	}
`;

const StyledCounter = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 10%;
	button {
		background: none;
		border: none;
	}
	h1 {
		font-family: "Poppins", sans-serif;
		font-size: 32px;
		color: #fff;
	}
`;

const StyledProductCard = styled.li`
	display: flex;
	justify-content:space-between;
	margin: 16px 0;
`;

const StyledPrice = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	h1 {
		font-family: "Poppins", sans-serif;
		font-size: 32px;
		color: #fff;
	}
`;
