import QnAWriteForm from '@/Pages/qnas/write/Components/QnAWriteForm.tsx';

export default function Page() {
    return (
        <div className={'flex w-full min-w-[1500px] justify-center'}>
            <div className={'my-3 flex w-[50rem] flex-col gap-y-3'}>
                <QnAWriteForm />
            </div>
        </div>
    );
}
