import axios from 'axios';
import dompurify from 'dompurify';
import Swal from 'sweetalert2';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostTitleField from '@/Pages/Components/PostInputs/PostTitleField.tsx';
import PostContentField from '@/Pages/Components/PostInputs/PostContentField.tsx';
import WhiteboardSection from '@/Pages/qnas/Components/Whiteboard/WhiteboardSection.tsx';
import SkillCategorySection from '@/Pages/qnas/Components/SkillCategory/SkillCategorySection.tsx';
import FormOptionManager from '@/Pages/qnas/Components/FormOptionManager/FormOptionManager.tsx';

interface Props {
    postId: number;
}

interface FormData {
    title: string;
    bodyContent: string;
}

export default function QnAPostWriteForm({ postId }: Props) {
    const navigate = useNavigate();

    const [isWhiteboardAdded, toggleIsWhiteboardAdded] = useReducer(state => !state, false);

    const [canvasDataJSONString, setCanvasDataJSONString] = useState(JSON.stringify([]));

    const [selectedSkillCategoryList, setSelectedSkillCategoryList] = useState<
        { parentSkillCategory: string; childSkillCategory: string }[]
    >([]);

    const isFormSubmittedRef = useRef(false);

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            bodyContent: '',
        },
    });

    useEffect(() => {
        return () => {
            if (isFormSubmittedRef.current) {
                return;
            } else {
                axios.delete(`/api/dev-post/cancel/${postId}`).catch();
            }
        };
    }, []);

    useEffect(() => {
        if (isWhiteboardAdded) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [isWhiteboardAdded]);

    const onSubmit: SubmitHandler<FormData> = async data => {
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
            const result = await axios
                .post('/api/dev-post/post', {
                    id: postId,
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
                })
                .then(response => response.data);

            const createdQnAPostId = result.id;
            isFormSubmittedRef.current = true;
            navigate(`/qnas/${createdQnAPostId}`, { replace: true });
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
                    <SkillCategorySection
                        selectedSkillCategoryList={selectedSkillCategoryList}
                        updateSelectedSkillCategoryList={newSkillCategoryList => {
                            setSelectedSkillCategoryList(newSkillCategoryList);
                        }}
                    />
                    <FormOptionManager
                        isWhiteboardAdded={isWhiteboardAdded}
                        toggleIsWhiteboardAdded={toggleIsWhiteboardAdded}
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
                            작성
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}