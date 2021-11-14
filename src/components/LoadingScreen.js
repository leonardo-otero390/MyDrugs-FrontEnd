import Spinner from "./Spinner";
import styled from "styled-components";

export default function LoadingScreen() {
    return (
        <LoadingContainer>
            <Spinner size={64} color="#800080"/>
        </LoadingContainer>
    )
}

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #212121;
`