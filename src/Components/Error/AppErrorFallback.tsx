import { AxiosError } from 'axios';
import UnauthorizedErrorPage from '@/Pages/ErrorPages/UnauthorizedErrorPage.tsx';
import ForbiddenErrorPage from '@/Pages/ErrorPages/ForbiddenErrorPage.tsx';
import InternalServerErrorPage from '@/Pages/ErrorPages/InternalServerErrorPage.tsx';

interface Props {
    error: AxiosError;
    resetErrorBoundary(...args: any[]): any;
}

export default function AppErrorFallback({ error, resetErrorBoundary }: Props) {
    const httpStatusCode = error.response.status;

    switch (httpStatusCode) {
        case 401:
            return <UnauthorizedErrorPage />;

        case 403:
            return <ForbiddenErrorPage />;

        case 500:
            return (
                <InternalServerErrorPage
                    retry={() => {
                        resetErrorBoundary();
                    }}
                />
            );

        default:
            return null;
    }
}
