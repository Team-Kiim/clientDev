import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export default function ModalBackground({ children, className }: Props) {
    return (
        <div
            className={`absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center rounded-xl bg-neutral-800/30 ${className}`}
        >
            {children}
        </div>
    );
}
