import axios from 'axios';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { MdOutlineHowToVote } from 'react-icons/md';
import BeforeVoteList from '@/Pages/community/[boardId]/Components/Vote/BeforeVote/BeforeVoteList.tsx';
import useRequireLoginAlert from '@/Hooks/Alert/useRequireLoginAlert.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

interface Props {
    postId: string;
    voteItems: {
        voteItemId: number;
        voteItemText: string;
        voteCount: number;
    }[];
}

export default function BeforeVote({ postId, voteItems }: Props) {
    const queryClient = useQueryClient();

    const isLoggedIn = !!useAuth().user;

    const { showRequireLoginAlert } = useRequireLoginAlert({
        message: '로그인 후 투표에 참여할 수 있습니다.',
        from: window.location.pathname,
    });

    const [selectedVoteItemId, setSelectedVoteItemId] = useState(-1);

    const updateSelectedVoteItem = (voteItemId: number) => {
        setSelectedVoteItemId(voteItemId);
    };

    const handleVoteButtonClick = async () => {
        if (!isLoggedIn) {
            showRequireLoginAlert();
            return;
        }
        if (selectedVoteItemId === -1) {
            toast.warning(<p className={'text-[0.85rem]'}>투표 항목을 선택해주세요.</p>, TOAST_OPTIONS);
        } else {
            try {
                await axios.post(`/api/vote/${postId}/votes`, {
                    items: [selectedVoteItemId],
                });
                queryClient
                    .invalidateQueries({
                        queryKey: ['post', postId],
                    })
                    .catch();
            } catch {
                toast.error(
                    <p className={'text-[0.85rem] leading-relaxed'}>
                        현재 투표를 할 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
                    </p>,
                    TOAST_OPTIONS,
                );
            }
        }
    };

    return (
        <>
            <div>
                <BeforeVoteList
                    selectedVoteItemId={selectedVoteItemId}
                    updateSelectedVoteItem={updateSelectedVoteItem}
                    voteItems={voteItems}
                />
            </div>
            <div className={'flex justify-end'}>
                <div className={'tooltip tooltip-bottom'} data-tip={'투표하기'}>
                    <button
                        className={'rounded-full p-1.5 transition-all hover:bg-slate-50'}
                        type={'button'}
                        onClick={handleVoteButtonClick}
                    >
                        <MdOutlineHowToVote className={'size-6'} />
                    </button>
                </div>
            </div>
        </>
    );
}
