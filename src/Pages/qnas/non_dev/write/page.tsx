import NonDevQnAWriteForm from '@/Pages/qnas/non_dev/write/Components/NonDevQnAWriteForm.tsx';

export default function Page() {
    return (
        <div className={'mx-[28rem]'}>
            <main>
                <h1 className={'mx-2 text-[1.65rem] font-bold'}>비개발 Q&A 작성</h1>
                <NonDevQnAWriteForm />
            </main>
        </div>
    );
}
