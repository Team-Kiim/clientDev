import axios from 'axios';
import dompurify from 'dompurify';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/Components/PostInputs/TitleInput.tsx';
import TextEditor from '@/Pages/Components/PostInputs/TextEditor.tsx';
import VoteSection from '@/Pages/community/Components/Vote/VoteSection.tsx';

interface Props {
    postId: number;
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

    const [isVoteActive, setIsVoteActive] = useState(false);

    const isFormSubmittedRef = useRef<boolean>(false);

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            bodyContent: '',
        },
    });

    console.log(formMethods.formState.errors);

    useEffect(() => {
        if (isVoteActive) {
            formMethods.register('voteTopic');
            formMethods.register('firstVoteItem');
            formMethods.register('secondVoteItem');
            formMethods.register('additionalVoteItems');
        } else {
            formMethods.unregister('voteTopic');
            formMethods.unregister('firstVoteItem');
            formMethods.unregister('secondVoteItem');
            formMethods.unregister('additionalVoteItems');
        }
    }, [isVoteActive]);

    useEffect(() => {
        return () => {
            if (isFormSubmittedRef.current) {
                return;
            }
            axios.delete(`/api/community-post/cancel/${postId}`).then().catch();
        };
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        const currentImages = document.querySelectorAll('img');
        const currentImageIdList: number[] = [];
        for (const $currentImage of currentImages) {
            const currentImageId = Number($currentImage.src.split('#')[1]);
            currentImageIdList.push(currentImageId);
        }

        try {
            const result = await axios
                .post('/api/community-post/post', {
                    id: postId,
                    title: data.title,
                    bodyContent: dompurify.sanitize(data.bodyContent),
                    fileIdList: currentImageIdList,
                })
                .then(response => response.data);

            const createdPostId = result.id;
            isFormSubmittedRef.current = true;
            navigate(`/community/${createdPostId}`, { replace: true });
        } catch (error) {
            //TODO
            // 에러처리
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mt-3 flex flex-col gap-y-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex flex-col gap-y-10'}>
                    <TitleInput />
                    <TextEditor postId={postId} />
                    <div className={'flex w-full flex-col gap-y-2'}>
                        <div className={'flex w-full gap-x-2'}>
                            <h3 className={'mx-1 text-[0.95rem] font-bold'}>투표</h3>
                            <input
                                className={'toggle'}
                                type={'checkbox'}
                                checked={isVoteActive}
                                onChange={() => {
                                    setIsVoteActive(!isVoteActive);
                                }}
                            />
                        </div>
                        {isVoteActive && <VoteSection />}
                    </div>
                </div>
                <div className={'mb-10 flex w-full justify-end gap-x-5'}>
                    <button
                        className={'rounded-lg bg-slate-100 px-5 py-3 text-[0.95rem] transition-all hover:bg-slate-200'}
                        type={'button'}
                        onClick={() => {
                            navigate('/community');
                        }}
                    >
                        <span className={'font-bold'}>취소</span>
                    </button>
                    <button
                        className={
                            'rounded-lg bg-violet-600 px-5 py-3 text-[0.95rem] transition-all hover:bg-violet-700'
                        }
                    >
                        <span className={'font-bold text-white'}>작성</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
