import axios from 'axios';
import dompurify from 'dompurify';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostTitleField from '@/Pages/Components/PostInputs/PostTitleField.tsx';
import PostContentField from '@/Pages/Components/PostInputs/PostContentField.tsx';
import VoteSection from '@/Pages/community/Components/Vote/VoteSection.tsx';
import FormOptionManager from '@/Pages/community/Components/FormOptionManager/FormOptionManager.tsx';
import getSingleCommunityPostInfo from '@/Pages/community/Utils/getSingleCommunityPostInfo.ts';

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
        if (isVoteAttached) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [isVoteAttached]);

    const onSubmit: SubmitHandler<FormData> = async data => {
        console.log(data);
        navigate(`/community/${postId}`, {
            replace: true,
        });
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