import { useContext, useState } from 'react';
import Modal from 'react-modal';
import GlobalContext from '../../../components/context/GlobalContext';
import {
    Input as StyledInput,
    SubmitButton as StyledButton,
    SignForm as StyledForm
} from '../../../components/Form';
import API from '../../../services/API/requests';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#191919',
        border: '1px solid purple',
        borderRadius: '25px'
    },
};

export default function ModalCheckout({ closeModal, modalIsOpen, paymentOption }) {
    const [CEP, setCEP] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const { userData, cartId } = useContext(GlobalContext);
    function submitForm(event) {
        event.preventDefault();
        const { email, id, name } = userData.user;

        const body = {
            userId: id,
            cartId,
            name,
            email,
            cep: CEP,
            addressNumber,
            paymentId: paymentOption
        }

        API.checkout({ token: userData.token, body })
            .then(() => closeModal())
            .catch(alert("Wasn't possible to submit"));
        console.log(body);
    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <StyledForm
                style={{ width: 'fit-content', height: 'fit-content' }}
                onSubmit={submitForm}>
                <h1 >Enter information to ship the product</h1>
                <StyledInput required type='number' placeholder="CEP" onChange={(event) => {
                    setCEP(event.target.value);
                }} />
                <StyledInput required type='number' placeholder="Address" onChange={(event) => {
                    setAddressNumber(event.target.value);
                }} />
                <StyledButton type="submit">send</StyledButton>
            </StyledForm>
            <StyledButton onClick={closeModal}>close</StyledButton>
        </Modal>
    );
}