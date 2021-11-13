import { CgSpinnerAlt } from 'react-icons/cg';
import styled from 'styled-components';

export default function Spinner({ color, size }) {
    return (
        <SpinnerContainer>
            <CgSpinnerAlt className="spinner" size={size ? size : 25} color={color ? color : "#8C11BE"}/>
        </SpinnerContainer>
    )
}

const SpinnerContainer = styled.div`
    background: transparent;
    .spinner {
        animation: rotate 1s linear infinite;
    }
    
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`