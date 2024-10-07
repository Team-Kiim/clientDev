import axios from 'axios';
import dompurify from 'dompurify';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PostTitleField from '@/Components/PostInputFields/PostTitleField.tsx';
import PostContentField from '@/Components/PostInputFields/PostContentField.tsx';
import WhiteboardSection from '@/Pages/qnas/Components/Whiteboard/WhiteboardSection.tsx';
import SkillCategorySection from '@/Pages/qnas/Components/SkillCategory/SkillCategorySection.tsx';
import PostHashTagField from '@/Components/PostInputFields/PostHashTagField.tsx';
import FormOptionManager from '@/Pages/qnas/Components/FormOptionManager/FormOptionManager.tsx';
import fetchQnAPostById from '@/Pages/qnas/Utils/fetchQnAPostById.ts';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import useHashtagField from '@/Hooks/PostInputFieldHooks/useHashtagField.ts';

interface Props {
    postId: string;
}

interface FormData {
    title: string;
    bodyContent: string;
}

export default function QnAPostEditForm({ postId }: Props) {
    const navigate = useNavigate();

    const { data: qnaPostData } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: fetchQnAPostById,
        retryOnMount: true,
        refetchOnMount: true,
    });

    const { title, bodyContent, skillCategoryList } = qnaPostData;

    const [isWhiteboardAdded, toggleIsWhiteboardAdded] = useReducer(state => !state, !!qnaPostData.visualData);

    const [canvasDataJSONString, setCanvasDataJSONString] = useState(qnaPostData.visualData ?? JSON.stringify([]));

    const [selectedSkillCategoryList, setSelectedSkillCategoryList] = useState<
        {
            parentSkillCategory: string;
            childSkillCategory: string;
        }[]
    >(skillCategoryList);

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title,
            bodyContent,
        },
    });

    const { hashtagInfoList, addHashtag, deleteHashtag, deleteAllHashtags } = useHashtagField(
        qnaPostData.tagInfoDtoList,
    );

    useEffect(() => {
        if (isWhiteboardAdded) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        } else {
            setCanvasDataJSONString(JSON.stringify([]));
        }
    }, [isWhiteboardAdded]);

    const onSubmit: SubmitHandler<FormData> = async data => {
        if (selectedSkillCategoryList.length === 0) {
            toast.error(<p className={'text-[0.9rem]'}>카테고리를 선택해주세요.</p>, TOAST_OPTIONS);
            return;
        }

        const { title, bodyContent } = data;

        const $postImageList = document.querySelectorAll('img');
        const postImageIdList: number[] = [];

        for (const $postImage of $postImageList) {
            const postImageId = Number($postImage.src.split('#').at(-1));
            if (postImageId) {
                postImageIdList.push(postImageId);
            }
        }

        try {
            await axios.patch(`/api/dev-post/${postId}`, {
                title,
                bodyContent: dompurify.sanitize(bodyContent),
                skillCategoryList: selectedSkillCategoryList.map(skillCategory => {
                    const { parentSkillCategory, childSkillCategory } = skillCategory;

                    return {
                        parentSkillCategory,
                        childSkillCategory,
                    };
                }),
                fileIdList: postImageIdList,
                visualData: canvasDataJSONString === '[]' ? null : canvasDataJSONString,
                tagContentList:
                    hashtagInfoList.length !== 0 ? hashtagInfoList.map(hashTagInfo => hashTagInfo.content) : [],
            });

            navigate(`/qnas/${postId}`, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                html: '<p class="leading-relaxed">게시글 수정에 실패하였습니다.<br/>잠시 후 다시 시도해주세요.</p>',
                confirmButtonText: '확인',
                customClass: {
                    confirmButton: 'text-white font-bold bg-plump-purple-600',
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
                    {isWhiteboardAdded && (
                        <WhiteboardSection
                            canvasDataJSONString={canvasDataJSONString}
                            updateCanvasDataJSONString={newCanvasDataJSONString => {
                                setCanvasDataJSONString(newCanvasDataJSONString);
                            }}
                        />
                    )}
                </div>
                <div className={'sticky top-16 flex w-[22rem] flex-col gap-y-10 self-start'}>
                    <div className={'flex flex-col gap-y-5'}>
                        <SkillCategorySection
                            selectedSkillCategoryList={selectedSkillCategoryList}
                            updateSelectedSkillCategoryList={newSkillCategoryList => {
                                setSelectedSkillCategoryList(newSkillCategoryList);
                            }}
                        />
                        <PostHashTagField
                            hashTagInfoList={hashtagInfoList}
                            addHashTag={addHashtag}
                            deleteHashTag={deleteHashtag}
                            deleteAllHashTags={deleteAllHashtags}
                        />
                    </div>
                    <FormOptionManager
                        isWhiteboardAdded={isWhiteboardAdded}
                        toggleIsWhiteboardAdded={toggleIsWhiteboardAdded}
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
                            수정
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
