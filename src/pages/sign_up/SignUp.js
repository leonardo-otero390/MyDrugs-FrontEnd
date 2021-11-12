import {
	Input,
	InputErrorMsg,
	SignForm,
	SubmitButton,
} from "../../components/Form";
import TopBar from "../../components/TopBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/API/requests";
import { cpfRegex, emailRegex, strongPassWordRegex } from "./regex";
import { conflict } from "../../services/API/statusCode";

export default function SingUp() {
	const navigate = useNavigate();

	const [input, setInput] = useState({
		name: "",
		cpf: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [inputError, setInputError] = useState({
		name: null,
		cpf: null,
		email: null,
		password: null,
		confirmPassword: null,
		passwordMatch: null,
		conflict: null,
	});

	function submitForm(event) {
		event.preventDefault();
		const inputErrors = Object.values(inputError).some((key) => key === true);
		if (!inputErrors) {
			API.signUp(input)
				.then(() => {
					navigate("/sign-in");
				})
				.catch((error) => {
					const status = error.response.status;
					if (status == conflict)
						setInputError({ ...inputError, conflict: true });
				});
		}
	}
	return (
		<>
			<TopBar />
			<SignForm onSubmit={submitForm}>
				<h1>Sign Up</h1>
				<Input
					type="text"
					placeholder="Nome"
					onChange={(event) => {
						setInput({ ...input, name: event.target.value });
						setInputError({
							...inputError,
							name: event.target.value.length < 3,
							conflict: false,
						});
					}}
					inputError={!!inputError.name}
				/>
				{inputError.name ? (
					<InputErrorMsg>Name must have at leat 3 letters</InputErrorMsg>
				) : null}
				<Input
					type="text"
					placeholder="CPF"
					onChange={(event) => {
						setInput({ ...input, cpf: event.target.value });
						setInputError({
							...inputError,
							cpf: !(
								event.target.value.match(cpfRegex)?.length &&
								event.target.value.length === 11
							),
							conflict: false,
						});
					}}
					inputError={!!inputError.cpf}
				/>
				{inputError.cpf ? <InputErrorMsg>Invalid CPF</InputErrorMsg> : null}
				<Input
					type="email"
					placeholder="E-mail"
					onChange={(event) => {
						setInput({ ...input, email: event.target.value });
						setInputError({
							...inputError,
							email: !event.target.value.match(emailRegex)?.length,
							conflict: false,
						});
					}}
					inputError={!!inputError.email}
				/>
				{inputError.email ? (
					<InputErrorMsg>Invalid e-mail</InputErrorMsg>
				) : null}

				<Input
					type="password"
					placeholder="Password"
					onChange={(event) => {
						setInput({ ...input, password: event.target.value });
						setInputError({
							...inputError,
							passwordMatch: event.target.value !== input.confirmPassword,
							password: !event.target.value.match(strongPassWordRegex)?.length,
							conflict: false,
						});
					}}
					inputError={!!inputError.password}
				/>
				{inputError.password ? (
					<InputErrorMsg>Pick a stronger password</InputErrorMsg>
				) : null}
				<Input
					type="password"
					placeholder="Confirm password"
					onChange={(event) => {
						setInput({
							...input,
							confirmPassword: event.target.value,
						});
						setInputError({
							...inputError,
							passwordMatch: input.password !== event.target.value,
							conflict: false,
						});
					}}
					inputError={!!(input.confirmPassword && inputError.passwordMatch)}
				/>
				{input.confirmPassword && inputError.passwordMatch ? (
					<InputErrorMsg>Passwords don't match</InputErrorMsg>
				) : null}
				{inputError.conflict ? (
					<InputErrorMsg>User alredy registered</InputErrorMsg>
				) : null}
				<SubmitButton type="submit">Register</SubmitButton>

				<Link to="/sign-in">Already have an account?</Link>
			</SignForm>
		</>
	);
}
