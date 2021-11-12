import { AiFillPlusCircle as PlusCircle, AiFillMinusCircle as MinusCircle } from "react-icons/ai";
import styled from "styled-components";

export default function ProductCard() {
    return (
            <StyledProductCard>
                    <StyledProductInfo>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntsqa5WFKMcDxTYJIM1taDmqlEay2jkwSsg&usqp=CAU" alt="pills" />
                        <div>
                            <h3><strong>Pills</strong></h3>
                            <p>Product description, nothing too much important just a lorem ipsum to preencher tudo</p>
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
                        <h1><strong>1</strong></h1>
                        <button>
                            <PlusCircle
                                style={{
                                    color: "#F2F2F2",
                                    fontSize: "32px",
                                }}
                            />
                        </button>
                    </StyledCounter>
                    <StyledPrice>
                        <h1><strong>U$ 99,99</strong></h1>
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