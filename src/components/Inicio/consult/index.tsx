import React, { ReactNode } from 'react';

interface ElementComponentProps {
    children: ReactNode;
}

const ElementComponent: React.FC<ElementComponentProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default ElementComponent;
