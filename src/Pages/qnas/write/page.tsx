import QnAWriteForm from '@/Pages/qnas/write/Components/QnAWriteForm.tsx';

export default function Page() {
    return (
        <div className={'mx-[32rem]'}>
            <main>
                <h1 className={'mx-2 text-[1.65rem] font-bold'}>Q&A 작성</h1>
                <QnAWriteForm />
            </main>
        </div>
    );
}
