import axios from 'axios';
import dompurify from 'dompurify';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostTitleField from '@/Components/PostInputFields/PostTitleField.tsx';
import PostContentField from '@/Components/PostInputFields/PostContentField.tsx';
import VoteSection from '@/Pages/community/Components/Vote/VoteSection.tsx';
import FormOptionManager from '@/Pages/community/Components/FormOptionManager/FormOptionManager.tsx';
import getSingleCommunityPostInfo from '@/Pages/community/Utils/getSingleCommunityPostInfo.ts';
import Swal from 'sweetalert2';

interface Props {
    postId: string;
}

interface FormData {
    title: string;
    bodyContent: string;
    voteTopic?: string;
    firstVoteItem?: string;
    secondVoteItem?: string;
    additionalVoteItems?: {
        label: string;
    }[];
}

export default function CommunityPostEditForm({ postId }: Props) {
    const navigate = useNavigate();

    const { data: communityPostData } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: getSingleCommunityPostInfo,
        retryOnMount: true,
    });

    const { title, bodyContent, voteResponse } = communityPostData;

    const isVoteDeletable = !voteResponse;

    const [isVoteAttached, toggleIsVoteAttached] = useReducer(state => !state, !!voteResponse);

    const [isVoteEditable, setIsVoteEditable] = useState(!voteResponse);

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title,
            bodyContent,
            voteTopic: voteResponse?.title,
            firstVoteItem: voteResponse?.voteItemResponseList[0].voteItem,
            secondVoteItem: voteResponse?.voteItemResponseList[1].voteItem,
            additionalVoteItems:
                voteResponse && voteResponse.voteItemResponseList.length !== 2
                    ? voteResponse.voteItemResponseList.map(voteItemResponse => {
                          const { voteItem } = voteItemResponse;
                          return { label: voteItem };
                      })
                    : [],
        },
    });

    useEffect(() => {
        if (isVoteAttached) {
            formMethods.register('voteTopic');
            formMethods.register('firstVoteItem');
            formMethods.register('secondVoteItem');
            formMethods.register('additionalVoteItems');
        } else {
            formMethods.unregister(['voteTopic', 'firstVoteItem', 'secondVoteItem', 'additionalVoteItems']);
        }
    }, [isVoteAttached]);

    useEffect(() => {
        if (isVoteAttached && isVoteDeletable) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [isVoteAttached]);

    const onSubmit: SubmitHandler<FormData> = async data => {
        const { title, bodyContent, voteTopic, firstVoteItem, secondVoteItem, additionalVoteItems } = data;

        const $postImageList = document.querySelectorAll('img');
        const postImageIdList: number[] = [];

        for (const $postImage of $postImageList) {
            const postImageId = Number($postImage.src.split('#').at(-1));
            if (postImageId) {
                postImageIdList.push(postImageId);
            }
        }

        try {
            const result = await axios
                .patch('/api/community-post/modify', {
                    modifyCommunityPostInfoRequest: {
                        id: postId,
                        title,
                        bodyContent: dompurify.sanitize(bodyContent),
                        fileIdList: postImageIdList,
                    },
                    modifyVoteRequest: {
                        title: voteTopic,
                        items: [
                            firstVoteItem,
                            secondVoteItem,
                            ...additionalVoteItems
                                .map(voteItem => voteItem.label)
                                .filter(voteItem => voteItem.length !== 0),
                        ],
                    },
                })
                .then(response => response.data);

            const createdCommunityPostId = result.id;
            navigate(`/community/${createdCommunityPostId}`, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                html: '<p class="leading-relaxed">게시글 수정에 실패하였습니다.<br/>잠시 후 다시 시도해주세요.</p>',
                confirmButtonText: '확인',
                customClass: {
                    confirmButton: 'text-white font-bold bg-violet-600',
                },
            }).then(() => {});
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'relative flex w-full gap-x-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex w-[46rem] flex-col gap-y-10'}>
                    <PostTitleField />
                    <PostContentField postId={postId} />
                    {isVoteAttached && <VoteSection isVoteEditable={isVoteEditable} />}
                </div>
                <div className={'sticky top-16 flex w-[22rem] flex-col gap-y-10 self-start'}>
                    <FormOptionManager
                        isVoteAdded={isVoteAttached}
                        isVoteDeletable={isVoteDeletable}
                        toggleIsVoteAdded={toggleIsVoteAttached}
                        makeVoteEditable={() => {
                            setIsVoteEditable(true);
                        }}
                    />
                    <div className={'flex w-full justify-end gap-x-4'}>
                        <button
                            className={
                                'rounded-lg bg-slate-100 px-5 py-2.5 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                            }
                            type={'button'}
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            취소
                        </button>
                        <button
                            className={
                                'rounded-lg bg-violet-600 px-5 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-violet-700 disabled:cursor-default disabled:opacity-75'
                            }
                            type={'submit'}
                        >
                            수정
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
