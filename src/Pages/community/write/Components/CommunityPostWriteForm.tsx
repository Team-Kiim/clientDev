import axios from 'axios';
import dompurify from 'dompurify';
import Swal from 'sweetalert2';
import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostTitleField from '@/Components/PostInputFields/PostTitleField.tsx';
import PostContentField from '@/Components/PostInputFields/PostContentField.tsx';
import VoteSection from '@/Pages/community/Components/Vote/VoteSection.tsx';
import PostHashTagField from '@/Components/PostInputFields/PostHashTagField.tsx';
import FormOptionManager from '@/Pages/community/Components/FormOptionManager/FormOptionManager.tsx';
import useHashtagField from '@/Hooks/PostInputFieldHooks/useHashtagField.ts';

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

export default function CommunityPostWriteForm({ postId }: Props) {
    const navigate = useNavigate();

    const [isVoteAdded, toggleIsVoteAdded] = useReducer(state => !state, false);

    const isFormSubmittedRef = useRef(false);

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            bodyContent: '',
        },
    });

    const { hashtagInfoList, addHashtag, deleteHashtag, deleteAllHashtags } = useHashtagField([]);

    useEffect(() => {
        if (isVoteAdded) {
            formMethods.register('voteTopic');
            formMethods.register('firstVoteItem');
            formMethods.register('secondVoteItem');
            formMethods.register('additionalVoteItems');
        } else {
            formMethods.unregister(['voteTopic', 'firstVoteItem', 'secondVoteItem', 'additionalVoteItems']);
        }
    }, [isVoteAdded]);

    useEffect(() => {
        return () => {
            if (isFormSubmittedRef.current) {
                return;
            } else {
                axios.delete(`/api/community-post/cancel/${postId}`).catch();
            }
        };
    }, []);

    useEffect(() => {
        if (isVoteAdded) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [isVoteAdded]);

    const onSubmit: SubmitHandler<FormData> = async data => {
        const { title, bodyContent, voteTopic, firstVoteItem, secondVoteItem, additionalVoteItems } = data;

        const $postImageList = document.querySelectorAll('img');

        const postImageSrcList: string[] = [];

        for (const $postImage of $postImageList) {
            if ($postImage.currentSrc.includes('https://koffeechat.site')) {
                postImageSrcList.push(window.decodeURI($postImage.currentSrc));
            }
        }

        try {
            await axios
                .post(`/api/community-post/${postId}`, {
                    saveCommunityPostInfoRequest: {
                        title,
                        bodyContent: dompurify.sanitize(bodyContent),
                        fileUrlList: postImageSrcList,
                        tagContentList:
                            hashtagInfoList.length !== 0 ? hashtagInfoList.map(hashTagInfo => hashTagInfo.content) : [],
                    },
                    saveVoteRequest: isVoteAdded
                        ? {
                              title: voteTopic,
                              items: [
                                  firstVoteItem,
                                  secondVoteItem,
                                  ...additionalVoteItems
                                      .map(voteItem => voteItem.label)
                                      .filter(voteItem => voteItem.length !== 0),
                              ],
                          }
                        : null,
                })
                .then(response => response.data);

            isFormSubmittedRef.current = true;
            navigate(`/community/${postId}`, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                html: '<p class="leading-relaxed">게시글 작성에 실패하였습니다.<br/>잠시 후 다시 시도해주세요.</p>',
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
                    {isVoteAdded && <VoteSection isVoteEditable={true} />}
                </div>
                <div className={'sticky top-16 flex w-[22rem] flex-col gap-y-10 self-start'}>
                    <PostHashTagField
                        hashTagInfoList={hashtagInfoList}
                        addHashTag={addHashtag}
                        deleteHashTag={deleteHashtag}
                        deleteAllHashTags={deleteAllHashtags}
                    />
                    <FormOptionManager
                        isVoteAdded={isVoteAdded}
                        isVoteDeletable={true}
                        toggleIsVoteAdded={toggleIsVoteAdded}
                    />
                    <div className={'flex w-full justify-end gap-x-4'}>
                        <button
                            className={
                                'rounded-lg bg-slate-100 px-4 py-2.5 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
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
                                'rounded-lg bg-plump-purple-600 px-4 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-plump-purple-700 disabled:cursor-default disabled:opacity-75'
                            }
                            type={'submit'}
                        >
                            작성
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
