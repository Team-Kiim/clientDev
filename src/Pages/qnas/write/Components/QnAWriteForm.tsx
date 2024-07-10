import axios from 'axios';
import dompurify from 'dompurify';
import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/Components/PostInputs/TitleInput.tsx';
import TextEditor from '@/Pages/Components/PostInputs/TextEditor.tsx';
import CategorySelector from '@/Pages/qnas/write/Components/Category/CategorySelector.tsx';
import WhiteboardViewer from '@/Pages/qnas/Components/Whiteboard/WhiteboardViewer.tsx';
import WhiteboardEditorModal from '@/Pages/qnas/Components/Whiteboard/WhiteboardEditorModal.tsx';

interface Props {
    postId: number;
}

interface FormData {
    title: string;
    bodyContent: string;
}

export default function QnAWriteForm({ postId }: Props) {
    const navigate = useNavigate();

    const [canvasDataJSONString, setCanvasDataJSONString] = useState(JSON.stringify([]));

    const [isWhiteboardEditorModalOpen, setIsWhiteboardEditorModalOpen] = useState(false);

    const isFormSubmittedRef = useRef(false);

    const [selectedCategories, setSelectedCategories] = useState<
        {
            parentCategory: string;
            childCategory: string;
        }[]
    >([]);

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
            }
            axios.delete(`/api/dev-post/cancel/${postId}`).then().catch();
        };
    }, []);

    const updateSelectedCategories = (newCategory: { parentCategory: string; childCategory: string }) => {
        for (const category of selectedCategories) {
            // 선택된 카테고리가 이미 존재하는 경우
            if (isEqual(category, newCategory)) {
                setSelectedCategories(
                    selectedCategories.filter(category => {
                        return !isEqual(category, newCategory);
                    }),
                );
                return;
            }
        }
        setSelectedCategories([...selectedCategories, newCategory]);
    };

    const onSubmit: SubmitHandler<FormData> = async data => {
        const currentImages = document.querySelectorAll('img');
        const currentImageIdList: number[] = [];
        for (const $currentImage of currentImages) {
            const currentImageId = Number($currentImage.src.split('#')[1]);
            currentImageIdList.push(currentImageId);
        }

        try {
            const response = await axios
                .post('/api/dev-post/post', {
                    id: postId,
                    title: data.title,
                    bodyContent: dompurify.sanitize(data.bodyContent),
                    skillCategoryList: selectedCategories.map(category => {
                        return {
                            parentSkillCategory: category.parentCategory,
                            childSkillCategory: category.childCategory,
                        };
                    }),
                    fileIdList: currentImageIdList,
                })
                .then(response => response.data);

            const createdPostId = response.id;
            isFormSubmittedRef.current = true;
            navigate(`/qnas/${createdPostId}`, { replace: true });
        } catch (error) {
            //TODO
            // 에러처리
        }
    };

    return (
        <>
            <FormProvider {...formMethods}>
                <form className={'mt-3 flex flex-col gap-y-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className={'flex flex-col gap-y-10'}>
                        <TitleInput />
                        <CategorySelector
                            updateSelectedCategories={updateSelectedCategories}
                            selectedCategories={selectedCategories}
                        />
                        <TextEditor postId={postId} />
                        <WhiteboardViewer
                            canvasData={JSON.parse(canvasDataJSONString)}
                            openWhiteboardEditorModal={() => {
                                setIsWhiteboardEditorModalOpen(true);
                            }}
                        />
                    </div>
                    <div className={'mb-10 flex w-full justify-end gap-x-5'}>
                        <button
                            className={
                                'rounded-lg bg-slate-100 px-5 py-3 text-[0.95rem] transition-all hover:bg-slate-200'
                            }
                            type={'button'}
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            <span className={'font-bold'}>취소</span>
                        </button>
                        <button
                            className={
                                'rounded-lg bg-violet-600 px-5 py-3 text-[0.95rem] transition-all hover:bg-violet-700'
                            }
                            type={'submit'}
                        >
                            <span className={'font-bold text-white'}>작성</span>
                        </button>
                    </div>
                </form>
            </FormProvider>
            <WhiteboardEditorModal
                isWhiteboardEditorModalOpen={isWhiteboardEditorModalOpen}
                closeWhiteboardEditorModal={() => {
                    setIsWhiteboardEditorModalOpen(false);
                }}
                canvasDataJSONString={canvasDataJSONString}
                updateCanvasDataJSONString={(newCanvasDataJSONString: string) => {
                    setCanvasDataJSONString(newCanvasDataJSONString);
                }}
            />
        </>
    );
}
