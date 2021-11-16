import styled from "styled-components";

const NoProductsMsg = styled.h1`
	font-family: Poppins;
	color: white;
	font-size: 30px;
`;

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
`;

const Card = styled.div`
	width: 250px;
	height: 350px;
	margin: 15px;
	padding: 15px 0;
	border: 1px solid ${({ selected }) => (selected ? "#800080" : " #c5c5c5")};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	font-family: Poppins;
	color: white;

	h1 {
		font-weight: 700;
	}

	strong {
		margin: 0 15px;
	}

	img {
		width: 80px;
		height: 80px;
		object-fit: contain;
		background-color: transparent;
	}

	p {
		text-align: center;
		font-size: 12px;
	}

	@media (max-width: 600px) {
		border: ${({ selected }) => (selected ? "1px solid #800080" : "none")};
		border-radius: 0;
		padding: 10px 5px;
		background-color: #191919;
		width: 100%;
		height: auto;
		margin: 15px 0;
		flex-direction: row;
	}
`;

const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	justify-content: space-around;

	@media (max-width: 600px) {
		width: 100%;
		align-items: center;
		flex-direction: row;

		font-size: 15px;
		text-align: center;

		h1 {
			margin: 0 10px;
		}

		p {
			font-size: 10px;
		}

		img {
			margin: 0 10px;
		}
	}
`;

const DinamicInfo = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	width: 100%;
	align-items: center;
	@media (max-width: 600px) {
		font-size: 15px;
		text-align: center;

		p {
			font-size: 10px;
		}

		button {
			margin-top: 10px;
			font-size: 10px;
		}
	}
`;

const Button = styled.button`
	background: ${({ children }) =>
		children === "Add to Cart" ? "#800080" : "transparent"};
	color: white;
	width: 95px;
	height: 25px;
	left: 53px;
	top: 360px;

	border: 1px solid
		${({ children }) => (children === "Add to Cart" ? "#800080" : "#c5c5c5")};
	box-sizing: border-box;
	border-radius: 20px;

	font-family: Poppins;

	margin-top: 15px;

	@media (max-width: 600px) {
		height: auto;
		margin: 0 1px;
	}
`;

const CartQuantity = styled.p`
	color: #800080;
`;

const Counter = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 20px;
	font-weight: 700;

	margin-top: 5px;
	svg {
		font-size: 25px;
	}

	@media (max-width: 600px) {
		justify-content: center;
		font-size: 10px;
		padding: 0;

		svg {
			font-size: 10px;
			margin: 0 10px;
		}
	}
`;

const MaxStock = styled.p`
	margin: 5px 0;
	color: orange;
`;

export {
	NoProductsMsg,
	Container,
	Card,
	ProductInfo,
	DinamicInfo,
	Button,
	CartQuantity,
	Counter,
	MaxStock,
};
