import styled from "styled-components";
import { BsCart2, BsPersonCircle } from "react-icons/bs"

export default function TopBar() {
    return (
        <StyledNav>
            <img src="../../assets/WhiteLogo.png" alt="logo" />
            <div>
                <h1><strong>SHOP</strong></h1>
                <BsCart2 style={{
                    color: "#F2F2F2",
                    fontSize: "45px"
                }} />
                <BsPersonCircle style={{
                    color: "#F2F2F2",
                    fontSize: "45px"
                }} />
            </div>
        </StyledNav>
    );
}

const StyledNav = styled.nav`
display:flex;
height:100px;
justify-content:space-between;
align-items:center;
padding: 0 50px;
background-color: #191919;

img{
    width:55px;
    height:55px;
}
div{
    display:flex;
    align-items:center;
    gap:20px;
}
div h1{
    font-family: 'Poppins',sans-serif;
        font-size: 18px;
        color: #F2F2F2;
    }

`