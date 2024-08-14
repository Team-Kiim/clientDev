import { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import SocialApiErrorFallback from '@/Pages/user/social/Components/SocialApiErrorFallback.tsx';
import { useLocation } from 'react-router-dom';

interface Props {
    children: ReactNode;
    relationshipType: string;
}

export default function SocialApiErrorBoundary({ relationshipType, children }: Props) {
    const { pathname } = useLocation();
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            key={pathname}
            onReset={() => {
                reset();
            }}
            fallbackRender={props => {
                return <SocialApiErrorFallback relationshipType={relationshipType} {...props} />;
            }}
        >
            {children}
        </ErrorBoundary>
    );
}
