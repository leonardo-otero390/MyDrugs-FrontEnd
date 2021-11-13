import { Counter } from "./styles";
import {
	AiFillPlusCircle as AddButton,
	AiFillMinusCircle as RemoveButton,
} from "react-icons/ai";

export default function ItemCounter({ quantity, setQuantity, setSelected }) {
	function removeItem() {
		if (quantity === 1) setSelected(false);
		setQuantity(quantity - 1);
	}

	function addItem() {
		setSelected(true);
		setQuantity(quantity + 1);
	}
	return (
		<Counter>
			<RemoveButton onClick={removeItem} />
			{quantity}
			<AddButton onClick={addItem} />
		</Counter>
	);
}
