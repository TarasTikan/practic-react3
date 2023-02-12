import { Component } from "react";
import { Overlay, ModalWindow, BtnModal } from "./Modal.styled";
export class Modal extends Component {
    componentDidMount () {
        window.addEventListener('keydown', this.closeEscModal)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.closeEscModal)
    }
    closeEscModal = (e) => {
        if(e.code === 'Escape') {
            this.props.closeModal()           
        }
    }
    render() {
        const {src, alt} = this.props.showModal
        const {closeModal} = this.props
        return (
            <Overlay>
                <ModalWindow>
                    <img src={`https://image.tmdb.org/t/p/w500/${src}`} alt={alt}/>
                    <BtnModal type="button" onClick={closeModal}>X</BtnModal>
                </ModalWindow>
            </Overlay>
        )
    }
}