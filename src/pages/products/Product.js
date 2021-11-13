import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import productTest from "../../assets/images/productTest.png";
import ItemCounter from "./ItemCounter";

export default function Product() {
	const [selected, setSelected] = useState(false);
	const [amount, setAmount] = useState(0);

	function select() {
		if (amount === 0) {
			setAmount(1);
			setSelected(true);
		}
	}

	return (
		<Card selected={selected} onClick={select}>
			<img src={productTest} alt="product" />
			<h1>PRODUCT NAME</h1>
			{selected ? (
				<ItemCounter
					amount={amount}
					setAmount={setAmount}
					setSelected={setSelected}
				/>
			) : null}
			<strong>U$ 9.00</strong>
		</Card>
	);
}

const Card = styled.div`
	width: 200px;
	height: 300px;
	margin: 15px;
	border: 1px solid ${({ selected }) => (selected ? "green" : " #c5c5c5")};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	font-family: Poppins;
	color: white;

	img {
		margin: 15px;
		width: 80px;
		height: 80px;
		object-fit: contain;
		background-color: transparent;
	}

	strong {
		margin: 15px;
	}
`;
