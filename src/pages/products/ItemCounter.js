import { Counter } from "./styles";
import {
	AiFillPlusCircle as AddButton,
	AiFillMinusCircle as RemoveButton,
} from "react-icons/ai";

export default function ItemCounter({
	quantity,
	quantityInCart,
	setQuantity,
	setSelected,
	stock,
	maxStock,
	setMaxStock,
}) {
	function removeItem() {
		if (quantity === 1) setSelected(false);
		setQuantity(quantity - 1);

		if (maxStock) setMaxStock(false);
	}

	function addItem() {
		setSelected(true);
		if (quantity + quantityInCart < stock) setQuantity(quantity + 1);
		else setMaxStock(true);
	}
	return (
		<Counter>
			<RemoveButton onClick={removeItem} />
			{quantity}
			<AddButton onClick={addItem} />
		</Counter>
	);
}
