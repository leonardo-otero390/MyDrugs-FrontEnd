import styled from "styled-components";
import { BsCart2, BsPersonCircle } from "react-icons/bs";
import { IoLogOutSharp } from "react-icons/io5";
import WhiteLogo from "../assets/images/WhiteLogo.png";
import { Link } from "react-router-dom";
import API from "../services/API/requests";

export default function TopBar() {
	const token = JSON.parse(localStorage.getItem('myDrugs_user'));
	function requestLogOut() {
		if (window.confirm('Are you sure you want to log out?')) {
			API.logOut({ token })
			.then(() => localStorage.removeItem('myDrugs_user'))
			.catch(() => alert("Wasn't possible to log out"))
		}
	}
	return (
		<StyledNav>
			<img src={WhiteLogo} alt="logo" />
			<div>
				<h1>
					<strong>SHOP</strong>
				</h1>
				<Link to={"/cart"}>
					<BsCart2
						style={{
							color: "#F2F2F2",
							fontSize: "45px",
						}}
					/>
				</Link>
				<Link to={"/sign-in"}>
					<BsPersonCircle
						style={{
							color: "#F2F2F2",
							fontSize: "45px",
						}}
					/>
				</Link>
				{token?<button onClick={requestLogOut}>
					<IoLogOutSharp
						style={{
							color: "purple",
							fontSize: "45px",
						}}
					/>
				</button>: ""}
			</div>
		</StyledNav>
	);
}

const StyledNav = styled.nav`
	display: flex;
	height: 100px;
	justify-content: space-between;
	align-items: center;
	padding: 0 50px;
	background-color: #191919;

	img {
		width: 55px;
		height: 55px;
	}
	div {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	div h1 {
		font-family: "Poppins", sans-serif;
		font-size: 18px;
		color: #f2f2f2;
	}
	button{
		background:none;
		border:none;
	}
`;