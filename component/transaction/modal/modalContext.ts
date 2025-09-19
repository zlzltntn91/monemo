import React, {createContext} from 'react';

interface ModalContextType {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType>({
    isVisible: false,
    setIsVisible: (v) => {
    }
});

export default ModalContext;