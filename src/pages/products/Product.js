import { useState } from "react";
import {
	Card,
	ProductInfo,
	DinamicInfo,
	Button,
	CartQuantity,
	MaxStock,
} from "./styles";
import ItemCounter from "./ItemCounter";
import { useContext, useEffect } from "react";
import GlobalContext from "../../components/context/GlobalContext";

export default function Product({
	id,
	name,
	description,
	price,
	image,
	stock,
}) {
	const { cartProducts, updateCartProducts } = useContext(GlobalContext);
	const [selected, setSelected] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const [quantityInCart, setQuantityInCart] = useState(0);
	const [maxStock, setMaxStock] = useState(false);

	useEffect(() => {
		// console.log(cartProducts);
		if (!cartProducts.length) return;
		const productAlredyAdded = cartProducts.find(
			(product) => product.id === id
		);
		if (productAlredyAdded) setQuantityInCart(productAlredyAdded.quantity);
		if (productAlredyAdded?.quantity === stock) setMaxStock(true);
		else setMaxStock(false);
	}, [cartProducts, id]);

	function select(event) {
		if (event.target.tagName === "DIV" && selected) {
			setSelected(false);
			setQuantity(0);
			setMaxStock(false);
		}

		if (quantity === 0 && event.target.tagName !== "BUTTON" && !maxStock) {
			setQuantity(1);
			setSelected(true);
		}
	}

	function addToCart() {
		const indexThisProduct = cartProducts.findIndex(
			(product) => product.id === id
		);
		if (indexThisProduct >= 0) cartProducts.splice(indexThisProduct, 1);
		const alteredProduct = { id, quantity: quantityInCart + quantity };
		updateCartProducts(
			[
				...cartProducts,
				{
					id,
					name,
					price,
					quantity: quantityInCart + quantity,
					image,
				},
			],
			alteredProduct
		);
		setQuantityInCart(quantityInCart + quantity);
		setQuantity(0);
		setSelected(false);
	}

	function removeProducts() {
		setQuantityInCart(0);
		const indexThisProduct = cartProducts.findIndex(
			(product) => product.id === id
		);
		if (indexThisProduct >= 0) cartProducts.splice(indexThisProduct, 1);
		const alteredProduct = { id };
		updateCartProducts([...cartProducts], alteredProduct);
		setQuantityInCart(0);
		setQuantity(0);
		setSelected(false);
		setMaxStock(false);
	}

	return (
		<Card selected={selected} onClick={(event) => select(event)}>
			<ProductInfo>
				<img src={image} alt="product" />
				<h1>{name}</h1>
				<p>{description}</p>
				<strong>{`U$ ${price}`}</strong>
			</ProductInfo>

			<DinamicInfo>
				{quantityInCart ? (
					<CartQuantity>{`${quantityInCart} alredy added`}</CartQuantity>
				) : null}

				{selected ? (
					<>
						{/* {!maxStock ? ( */}
						<ItemCounter
							quantity={quantity}
							quantityInCart={quantityInCart}
							setQuantity={setQuantity}
							setSelected={setSelected}
							stock={stock}
							maxStock={maxStock}
							setMaxStock={setMaxStock}
						/>
						{/* ) : null} */}

						<Button children="Add to Cart" onClick={addToCart} />
					</>
				) : null}

				{maxStock ? (
					<MaxStock children="(This is the max quantity in stock)" />
				) : null}

				{quantityInCart ? (
					<Button children="Remove All" onClick={removeProducts} />
				) : null}
			</DinamicInfo>
		</Card>
	);
}
