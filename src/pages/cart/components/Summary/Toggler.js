import styled from "styled-components";
import { motion } from "framer-motion";
import { BsCartCheckFill } from "react-icons/bs";

export default function Toggler({ parentIsActive, toggleState }) {

    return (
        <TogglerContainer
            initial="active"
            animate={ parentIsActive ? "unactive" : "active" }
            variants={ variants }
        >
            <TogglerText>Checkout menu</TogglerText>
            <BsCartCheckFill size={22} color="#fff" />
        </TogglerContainer>
    )
}

const variants = {
    active: {
        opacity: 1,
        scale: 1.25,
    },
    unactive: {
        opacity: 0,
        scale: 0,
    }
}

const TogglerContainer = styled(motion.div)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const TogglerText = styled.p`
    height: 100%;
`