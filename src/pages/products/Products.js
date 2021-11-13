import styled from "styled-components";
import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";
import Product from "./Product";

export default function Products() {
	return (
		<div>
			<TopBar />
			<PageHeader name={"SHOP"} />
			<Container>
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
			</Container>
		</div>
	);
}

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
`;
