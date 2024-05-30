import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useLoggedInStatus(): boolean | null {
    const {
        data: isUserLoggedIn,
        isLoading,
        isPending,
    } = useQuery({
        queryKey: ['loggedIn status'],
        queryFn: () => {
            return axios
                .get('/api/member/profile')
                .then(() => true)
                .catch(() => false);
        },
    });

    if (isLoading || isPending) {
        return null;
    }

    return isUserLoggedIn;
}
