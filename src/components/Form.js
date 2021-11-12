import styled from "styled-components";

const SignForm = styled.form`
	h1 {
		color: #800080;
		font-family: Poppins;
		font-size: 42px;
		line-height: 63px;
		padding-bottom: 45px;
	}

	a {
		color: #800080;
		font-family: Poppins;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 27px;
	}
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: calc(100vh - 100px);
`;
const Input = styled.input`
	width: 250px;
	height: 52px;
	left: 620px;
	top: 383px;
	background: transparent;

	border: 2px solid #3498db;

	border: ${({ inputError }) => (inputError ? "2px solid orange" : null)};
	box-sizing: border-box;
	border-radius: 50px;

	color: #9c9c9c;
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 27px;

	text-align: center;

	margin: 6px;
`;

const SubmitButton = styled.button`
	width: 128px;
	height: 52px;
	left: 650px;
	top: 704px;

	border: 2px solid #2ecc71;
	box-sizing: border-box;
	border-radius: 50px;

	background: transparent;

	color: #9c9c9c;
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 27px;

	text-align: center;

	margin: 36px;

	cursor: pointer;
`;

const InputErrorMsg = styled.div`
	color: orange;
	font-family: Poppins;
	margin: 5px;
`;

export { SignForm, Input, SubmitButton, InputErrorMsg };
