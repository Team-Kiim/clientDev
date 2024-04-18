import QnATypeDecider from '@/Pages/qnas/write/Components/QnATypeDecider.tsx';
import QnAWriteForm from '@/Pages/qnas/write/Components/QnAWriteForm.tsx';

export default function Page() {
    return (
        <div className={'mx-[29rem] my-3 flex w-[50rem] flex-col gap-y-3'}>
            <QnATypeDecider />
            <QnAWriteForm />
        </div>
    );
}
