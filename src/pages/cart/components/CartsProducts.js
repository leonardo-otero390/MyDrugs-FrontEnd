import { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../../../components/context/GlobalContext";
import ProductCard from "./ProductCard";

export default function CartsProducts() {
	const { cartProducts } = useContext(GlobalContext);
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
					<h2>Price</h2>
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
	border-bottom: 1px solid #f2f2f2;
	div {
		width: 25%;
		height: 32px;
		display: flex;
		justify-content: center;
	}
	div:first-child {
		justify-content: flex-start;
		width: 50%;
	}
	div h2 {
		font-family: "Poppins", sans-serif;
		font-size: 24px;
		color: #fff;
	}
`;
