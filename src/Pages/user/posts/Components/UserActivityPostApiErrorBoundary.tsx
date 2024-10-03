import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import UserActivityPostErrorFallback from '@/Pages/user/posts/Components/UserActivityPostErrorFallback.tsx';

interface Props {
    children: ReactNode;
}

export default function UserActivityPostApiErrorBoundary({ children }: Props) {
    const { pathname, search } = useLocation();
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary key={pathname + search} onReset={reset} FallbackComponent={UserActivityPostErrorFallback}>
            {children}
        </ErrorBoundary>
    );
}
