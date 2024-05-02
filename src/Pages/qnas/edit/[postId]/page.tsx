import { Suspense } from 'react';
import QnATypeDecider from '@/Pages/qnas/edit/[postId]/Components/QnATypeDecider.tsx';
import QnAEditForm from '@/Pages/qnas/edit/[postId]/Components/QnAEditForm.tsx';

export default function Page() {
    return (
        <div className={'flex w-full min-w-[1500px] justify-center'}>
            <div className={'my-3 flex w-[50rem] flex-col gap-y-3'}>
                <Suspense>
                    <QnATypeDecider />
                    <QnAEditForm />
                </Suspense>
            </div>
        </div>
    );
}
