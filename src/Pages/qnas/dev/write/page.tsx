import DevQnAWriteForm from '@/Pages/qnas/dev/write/Components/DevQnAWriteForm.tsx';

export default function Page() {
    return (
        <div className={'mx-[32rem]'}>
            <main>
                <h1 className={'mx-2 text-[1.65rem] font-bold'}>개발 Q&A 작성</h1>
                <DevQnAWriteForm />
            </main>
        </div>
    );
}
