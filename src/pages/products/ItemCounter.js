import styled from "styled-components";
import {
	AiFillPlusCircle as AddButton,
	AiFillMinusCircle as RemoveButton,
} from "react-icons/ai";

export default function ItemCounter({ amount, setAmount, setSelected }) {
	function removeItem() {
		if (amount === 1) setSelected(false);
		setAmount(amount - 1);
	}

	function addItem() {
		setSelected(true);
		setAmount(amount + 1);
	}
	return (
		<Counter>
			<RemoveButton onClick={removeItem} />
			{amount}
			<AddButton onClick={addItem} />
		</Counter>
	);
}

const Counter = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 20px;
	font-weight: 700;

	svg {
		font-size: 30px;
	}
`;
