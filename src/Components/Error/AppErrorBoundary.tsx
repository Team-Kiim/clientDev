import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import AppErrorFallback from '@/Components/Error/AppErrorFallback.tsx';

interface Props {
    children: ReactNode;
}

export default function AppErrorBoundary({ children }: Props) {
    const { pathname } = useLocation();
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            key={pathname}
            onReset={() => {
                reset();
            }}
            FallbackComponent={AppErrorFallback}
        >
            {children}
        </ErrorBoundary>
    );
}
