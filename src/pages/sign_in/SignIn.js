import {
	Input,
	InputErrorMsg,
	SignForm,
	SubmitButton,
} from "../../components/Form";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { cpfRegex, emailRegex } from "../sign_up/regex";
import API from "../../services/API/requests";
import { useNavigate } from "react-router";
import { serverError } from "../../services/API/statusCode";
import GlobalContext from "../../components/context/GlobalContext";

export default function SignIn() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const { setUserData, getUserFromLocalStorage, setLocalStorage } =
		useContext(GlobalContext);

	const [input, setInput] = useState({
		user: "",
		password: "",
	});

	const [inputError, setInputError] = useState({
		invalidCredentials: false,
		emptyFields: false,
	});

	useEffect(() => {
		const localStoragedUser = getUserFromLocalStorage();

		if (localStoragedUser?.user?.token) {
			setLoading(false);
			setUserData(localStoragedUser);
			navigate("/");
		}
	}, [getUserFromLocalStorage, navigate, setUserData]);

	function submitForm(event) {
		event.preventDefault();
		setLoading(true);

		const body = {
			cpf: input.user.match(cpfRegex) ? input.user : "",
			email: input.user.match(emailRegex) ? input.user : "",
			password: input.password,
		};

		if (input.user && input.password)
			API.signIn(body)
				.then((resp) => {
					setLoading(false);
					setUserData(resp.data);
					console.log("setting local storage")
					setLocalStorage(resp.data);
					navigate("/");
				})
				.catch((error) => {
					if (!error.response) alert(`Application error: ${error.message}`);
					else if (error.response.status === serverError) alert(`Server error`);
					else setInputError({ ...inputError, invalidCredentials: true });
					setLoading(false);
				});
		else setInputError({ ...inputError, emptyFields: true });
	}
	return (
		<>
			<TopBar />
			<SignForm onSubmit={submitForm}>
				<h1>Login</h1>
				<Input
					type="text"
					placeholder="E-mail or CPF"
					onChange={(event) => {
						setInput({ ...input, user: event.target.value });
						setInputError({ ...inputError, invalidCredentials: false });
					}}
				/>

				<Input
					type="password"
					placeholder="Password"
					onChange={(event) => {
						setInput({ ...input, password: event.target.value });
						setInputError({ ...inputError, invalidCredentials: false });
					}}
				/>

				{inputError.invalidCredentials ? (
					<InputErrorMsg>Invalid credentials</InputErrorMsg>
				) : null}
				{inputError.emptyFields ? (
					<InputErrorMsg>Please fill in all fields</InputErrorMsg>
				) : null}

				<SubmitButton disabled={loading} type="submit">
					Enter
				</SubmitButton>
				<Link to="/sign-up">No account yet?</Link>
			</SignForm>
		</>
	);
}
