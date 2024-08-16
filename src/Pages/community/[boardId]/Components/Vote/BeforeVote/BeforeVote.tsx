import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MdOutlineHowToVote } from 'react-icons/md';
import BeforeVoteList from '@/Pages/community/[boardId]/Components/Vote/BeforeVote/BeforeVoteList.tsx';
import { useNavigate } from 'react-router-dom';

interface Props {
    postId: string;
    voteItems: {
        voteItemId: number;
        voteItem: string;
        voteCount: number;
    }[];
}

export default function BeforeVote({ postId, voteItems }: Props) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const isLoggedIn = !!queryClient.getQueryData(['loggedIn user']);

    const [selectedVoteItemId, setSelectedVoteItemId] = useState(-1);

    const updateSelectedVoteItem = (voteItemId: number) => {
        setSelectedVoteItemId(voteItemId);
    };

    const handleVoteButtonClick = async () => {
        if (!isLoggedIn) {
            Swal.fire({
                icon: 'warning',
                html: '<p class="leading-relaxed">로그인 후 투표에 참여할 수 있습니다.<br/>로그인 하시겠습니까?</p>',
                showCancelButton: true,
                confirmButtonText: '로그인',
                cancelButtonText: '취소',
                customClass: {
                    cancelButton: 'text-black font-bold bg-slate-100',
                    confirmButton: 'text-white font-bold bg-violet-600',
                },
            }).then(result => {
                if (result.isConfirmed) {
                    navigate('/sign_in');
                }
            });
            return;
        }
        if (selectedVoteItemId === -1) {
            window.alert('투표 항목을 선택해주세요.');
        } else {
            try {
                await axios.post(`/api/vote/${postId}/votes`, {
                    items: [selectedVoteItemId],
                });
                await queryClient.invalidateQueries({
                    queryKey: ['post', postId],
                });
            } catch (error) {
                //에러처리
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
