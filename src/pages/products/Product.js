import { useState } from "react/cjs/react.development";
import { Card, ProductInfo, DinamicInfo, Button, CartQuantity } from "./styles";
import ItemCounter from "./ItemCounter";
import { useContext } from "react";
import GlobalContext from "../../components/context/GlobalContext";

export default function Product({ id, name, description, price, image }) {
	const { cartProducts, updateCartProducts } = useContext(GlobalContext);
	const [selected, setSelected] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const [quantityInCart, setQuantityInCart] = useState(0);

	function select(event) {
		if (event.target.tagName === "DIV" && selected) {
			setSelected(false);
			setQuantity(0);
		}

		if (quantity === 0 && event.target.tagName !== "BUTTON") {
			setQuantity(1);
			setSelected(true);
		}
	}

	function addToCart() {
		const indexThisProduct = cartProducts.findIndex(
			(product) => product.id === id
		);
		if (indexThisProduct >= 0) cartProducts.splice(indexThisProduct, 1);
		updateCartProducts([
			...cartProducts,
			{
				id,
				name,
				price,
				quantity: quantityInCart + quantity,
				image,
			},
		]);
		setQuantityInCart(quantityInCart + quantity);
		setQuantity(0);
		setSelected(false);
	}

	function removeProduct() {
		setQuantityInCart(0);
		const indexThisProduct = cartProducts.findIndex(
			(product) => product.id === id
		);
		if (indexThisProduct >= 0) cartProducts.splice(indexThisProduct, 1);
		updateCartProducts([...cartProducts]);
		setQuantityInCart(0);
		setQuantity(0);
		setSelected(false);
	}

	return (
		<Card selected={selected} onClick={(event) => select(event)}>
			<ProductInfo>
				<img src={image} alt="product" />
				<h1>{name}</h1>
				<p>{description}</p>
				<strong>{price}</strong>
			</ProductInfo>

			<DinamicInfo>
				{quantityInCart ? (
					<CartQuantity>{`${quantityInCart} alredy added`}</CartQuantity>
				) : null}

				{selected ? (
					<>
						<ItemCounter
							quantity={quantity}
							setQuantity={setQuantity}
							setSelected={setSelected}
						/>

						<Button children="Add to Cart" onClick={addToCart} />
					</>
				) : null}

				{quantityInCart ? (
					<Button children="Remove All" onClick={removeProduct} />
				) : null}
			</DinamicInfo>
		</Card>
	);
}