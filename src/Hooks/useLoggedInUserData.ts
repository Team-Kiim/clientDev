import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@/Types/User.ts';

export default function useLoggedInUserData(): User | null {
    const { data, isLoading, isPending } = useQuery({
        queryKey: ['loggedIn user'],
        queryFn: () => {
            return axios
                .get('/api/member/profile')
                .then(response => response.data)
                .catch(() => null);
        },
    });

    if (isLoading || isPending) {
        return null;
    }

    return data;
}
