import { BsCart2 } from "react-icons/bs"
import styled from "styled-components";

export default function PageHeader({name}) {
    return (
        <StyledTitleContainer>
            <div>
                <BsCart2 style={{
                    color: "#F2F2F2",
                    fontSize: "45px"
                }} />
                <StyledTitle><strong>{name}</strong></StyledTitle>
            </div>
            <hr />
        </StyledTitleContainer>
    );
}

const StyledTitle = styled.header`
font-family: 'Poppins',sans-serif;
font-size: 32px;
color: #F2F2F2;
@media(max-width:600px){
    font-size: 24px;
}
`
const StyledTitleContainer = styled.div`
width:400px;
margin-top:50px;
margin:50px auto;
div{
    display :flex;
    align-items : center;
    justify-content : center;
    gap:50px;
    margin-bottom:16px;
}
hr{
    border: 5px solid purple;
}
@media(max-width:600px){
    width:60%;
    hr{
        border: 3px solid purple;
    }
}
`