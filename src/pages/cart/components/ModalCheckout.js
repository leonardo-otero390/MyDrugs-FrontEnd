import styled from "styled-components";
import { useContext, useState } from "react";
import ReactModal from "react-modal";
import GlobalContext from "../../../components/context/GlobalContext";
import {
	Input as StyledInput,
	SubmitButton as StyledButton,
	SignForm as StyledForm,
} from "../../../components/Form";
import API from "../../../services/API/requests";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		background: "#191919",
		border: "1px solid purple",
		borderRadius: "25px",
	},
};

export default function ModalCheckout({
	closeModal,
	isOpen,
	paymentOption,
	onRequestClose,
	type,
	children,
}) {
	const [CEP, setCEP] = useState("");
	const [addressNumber, setAddressNumber] = useState("");
	const { userData, cartId, setUpdate } = useContext(GlobalContext);
	const transitionTimingsInMS = 300;

	function submitForm(event) {
		event.preventDefault();
		const { email, id, name } = userData.user;
		const body = {
			userId: id,
			cartId,
			name,
			email,
			cep: CEP,
			addressNumber,
			paymentId: paymentOption,
		};
		const token = userData.token;
		console.log("token: ", token);
		API.checkout(token, {
			...body,
			paymentId: 1,
		})
			.then(() => {
				closeModal();
				setUpdate((prev) => prev + 1);
				window.location.href = "/";
			})
			.catch(() => {
				alert("Wasn't possible to submit");
			});
	}

	return (
		<ReactModal
			isOpen={isOpen}
			appElement={document.querySelector("#root")}
			ariaHideApp={true}
			role={"dialog"}
			contentLabel={"Deleting post alert"}
			onRequestClose={onRequestClose}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			shouldFocusAfterRender={true}
			shouldReturnFocusAfterClose={true}
			portalClassName={"ReactModalPortal"}
			overlayClassName={"ReactModal__Overlay"}
			className={"ReactModal__Content"}
			closeTimeoutMS={transitionTimingsInMS}
			overlayElement={(props, contentElement) => (
				<OverlayTransition transitionTimingsInMS={transitionTimingsInMS}>
					<Overlay {...props}>{contentElement}</Overlay>
				</OverlayTransition>
			)}
			contentElement={(props, children) => (
				<ContentContainer type={type} {...props}>
					<StyledForm
						style={{ width: "fit-content", height: "fit-content" }}
						onSubmit={submitForm}
					>
						<h1>Enter information to ship the product</h1>
						<StyledInput
							required
							type="number"
							placeholder="CEP"
							onChange={(event) => {
								setCEP(event.target.value);
							}}
						/>
						<StyledInput
							required
							type="number"
							placeholder="Address"
							onChange={(event) => {
								setAddressNumber(event.target.value);
							}}
						/>
						<StyledButton type="submit">send</StyledButton>
					</StyledForm>
					<StyledButton onClick={closeModal}>close</StyledButton>
				</ContentContainer>
			)}
		>
			{children}
		</ReactModal>
	);
}

const OverlayTransition = styled.div`
	.ReactModal__Overlay {
		opacity: 0;
		transition: opacity
			${({ transitionTimingsInMS }) => transitionTimingsInMS || 0}ms ease;
	}
	.ReactModal__Overlay--after-open {
		opacity: 1;
	}
	.ReactModal__Overlay--before-close {
		opacity: 0;
	}
`;

const Overlay = styled.div`
	background-color: rgba(255, 255, 255, 0.9);
	position: fixed;
	z-index: 100;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	& :focus {
		outline: none;
	}
`;

const ContentContainer = styled.div`
	font-size: 20px;
	width: 100%;
	max-width: 611px;
	padding: 45px 30px;
	background-color: rgba(51, 51, 51, 1);
	border-radius: ${(props) => (props.type === "confirm" ? "50px" : "15px")};
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (max-width: 611px) {
		border-radius: 0;
		padding: 30px 15px;
	}
`;
