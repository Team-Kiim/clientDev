import EmailUpdateForm from '@/Pages/user/account/Components/EmailUpdate/EmailUpdateForm.tsx';

export default function Page() {
    return (
        <>
            <div className={'mb-6 flex flex-col gap-y-7'}>
                <h1 className={'flex text-xl font-extrabold'}>계정 관리</h1>
                <div className={'flex flex-col gap-y-5'}>
                    <h3 className={'text-[0.95rem] font-bold'}>이메일 변경</h3>
                    <EmailUpdateForm />
                </div>
            </div>
        </>
    );
}
