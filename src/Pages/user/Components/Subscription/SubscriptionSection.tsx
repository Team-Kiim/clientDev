import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
    isMemberSubscribed: boolean;
}

export default function SubscriptionSection({ isMemberSubscribed }: Props) {
    const { VITE_SERVER_URL } = import.meta.env;

    const queryClient = useQueryClient();

    const [previousSubscriptionState, setPreviousSubscriptionState] = useState(isMemberSubscribed);

    const { mutate: mutateSubscriptionState } = useMutation({
        mutationFn: () => {
            const subscriptionStateToUpdate = true;
            return Promise.resolve(subscriptionStateToUpdate);
        },

        onSuccess: () => {
            const updatedSubscriptionState = true;
            setPreviousSubscriptionState(updatedSubscriptionState);
        },

        onError: () => {
            // setQueryData
        },

        onSettled: () => {
            console.log('settled');
        },
    });

    const debouncedMutateSubscriptionState = useCallback(debounce(mutateSubscriptionState, 250), []);

    const subscriptionStateToggle = async () => {
        debouncedMutateSubscriptionState();
    };

    return (
        <div className={'flex justify-end'}>
            <button
                className={
                    'rounded-3xl border border-black bg-black px-3.5 py-2 text-[0.85rem] font-extrabold text-white transition-all hover:bg-black/70'
                }
                type={'button'}
                onClick={() => {
                    subscriptionStateToggle();
                }}
            >
                {isMemberSubscribed ? '구독' : '구독 해제'}
            </button>
        </div>
    );
}
