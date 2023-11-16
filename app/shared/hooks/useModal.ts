import { useState } from "react";
import { ModalType } from "../types/ModalType";

export function useModal(name: ModalType) {
    const [modal, setModal] = useState<string | undefined>();

    const openModal = () => {
        setModal(name)
    }

    const onClose = () => {
        setModal(undefined)
    }

    return {
        show: modal === name,
        openModal,
        onClose,
        modal
    }
}