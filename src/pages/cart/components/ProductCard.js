import { AiFillPlusCircle as PlusCircle, AiFillMinusCircle as MinusCircle } from "react-icons/ai";
import styled from "styled-components";
import { useContext } from "react";
import GlobalContext from "../../../components/context/GlobalContext";

export default function ProductCard({ name, description, image, quantity, price }) {

    const { selectedProducts, setSelectedProducts } = useContext(GlobalContext);

    function addProduct() {
        const thisProduct = selectedProducts.find((p) => p.name === name);
        const aux = {...thisProduct};
        aux.quantity ++;
        const otherProducts = selectedProducts.find((p) => p.name !== name);
        if (!otherProducts) setSelectedProducts([aux]); else setSelectedProducts([...otherProducts,aux]);
    }

    return (
        <StyledProductCard>
            <StyledProductInfo>
                <img src={image} alt={name} />
                <div>
                    <h3><strong>{name}</strong></h3>
                    <p>{description}</p>
                </div>
            </StyledProductInfo>
            <StyledCounter>
                <button>
                    <MinusCircle
                        style={{
                            color: "#F2F2F2",
                            fontSize: "32px",
                        }}
                    />
                </button>
                <h1><strong>{quantity}</strong></h1>
                <button onClick={addProduct}>
                    <PlusCircle
                        style={{
                            color: "#F2F2F2",
                            fontSize: "32px",
                        }}
                    />
                </button>
            </StyledCounter>
            <StyledPrice>
                <h1><strong>U$ {price}</strong></h1>
            </StyledPrice>
        </StyledProductCard>
    );
}
const StyledProductInfo = styled.ul`
display:flex;
width:50%;
img{
    width:150px;
    margin-right:16px;
}
div{
    display:flex;
    flex-direction: column;
    justify-content:space-between;
}
h3{
    font-family: 'Poppins',sans-serif;
    font-size: 18px;
    color:#fff;
}
p{
    font-family: 'Poppins',sans-serif;
    font-size: 14px;
    color:#fff;
}
`

const StyledCounter = styled.div`
display:flex;
justify-content:space-around;
align-items:center;
width:25%;
button{
    background:none;
    border:none;
}
h1{
    font-family: 'Poppins',sans-serif;
    font-size: 32px;
    color:#fff;
}
`

const StyledProductCard = styled.li`
display:flex;
margin:16px 0;
`

const StyledPrice = styled.div`
width:25%;
display:flex;
justify-content:center;
align-items:center;
h1{
    font-family: 'Poppins',sans-serif;
    font-size: 32px;
    color:#fff;
}

`