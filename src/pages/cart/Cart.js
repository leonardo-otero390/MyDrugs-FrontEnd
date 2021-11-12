import styled from "styled-components";
import PageHeader from "../../components/PageHeader";
import TopBar from "../../components/TopBar";

export default function Cart() {
    return (
        <div>
            <TopBar />
            <PageHeader name="CART" />
            <section>
                <StyledTableHeaders>
                    <div><h2>Product</h2></div>
                    <div><h2>Quantity</h2></div>
                    <div><h2>Price</h2></div>
                </StyledTableHeaders>
                <StyledProductList>
                    <li>
                        <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntsqa5WFKMcDxTYJIM1taDmqlEay2jkwSsg&usqp=CAU" alt="pills"/>
                            <div>
                                <h3>Product name</h3>
                                <p>Product description, nothing too much important just a lorem ipsum to preencher tudo</p>
                            </div>
                        </div>
                    </li>
                </StyledProductList>
            </section>
        </div>
    );
}

const StyledTableHeaders = styled.div `
display:flex;
border-bottom: 1px solid #f2f2f2;
div{
    width:25%;
    height: 32px;
}
div:first-child {
    width:50%;
}
div h2{
    font-family: 'Poppins',sans-serif;
    font-size: 24px;
    color:#fff;
}
`
const StyledProductList = styled.ul `

`