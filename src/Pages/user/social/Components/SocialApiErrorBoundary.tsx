import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import SocialApiErrorFallback from '@/Pages/user/social/Components/SocialApiErrorFallback.tsx';

interface Props {
    children: ReactNode;
}

export default function SocialApiErrorBoundary({ children }: Props) {
    const { pathname, search } = useLocation();
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary key={pathname + search} onReset={reset} FallbackComponent={SocialApiErrorFallback}>
            {children}
        </ErrorBoundary>
    );
}
