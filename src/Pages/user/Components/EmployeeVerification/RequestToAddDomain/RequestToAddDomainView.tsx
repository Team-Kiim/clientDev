import { HiArrowSmallLeft, HiXMark } from 'react-icons/hi2';
import { MdDomainAdd } from 'react-icons/md';
import RequestToAddDomainForm from '@/Pages/user/Components/EmployeeVerification/RequestToAddDomain/RequestToAddDomainForm.tsx';

interface Props {
    backToEmployeeVerificationView(): void;
    closeModal(): void;
}

export default function RequestToAddDomainView({ backToEmployeeVerificationView, closeModal }: Props) {
    return (
        <>
            <div className={'mb-5 flex justify-between'}>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-slate-100'}
                    type={'button'}
                    onClick={() => {
                        backToEmployeeVerificationView();
                    }}
                >
                    <HiArrowSmallLeft className={'size-7'} />
                </button>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-slate-100'}
                    type={'button'}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <HiXMark className={'size-7'} />
                </button>
            </div>
            <div className={'flex w-full flex-col gap-y-8'}>
                <div className={'mx-2 flex gap-x-2'}>
                    <MdDomainAdd className={'size-6'} />
                    <h1 className={'text-lg font-extrabold'}>도메인 추가 요청</h1>
                </div>
                <RequestToAddDomainForm closeModal={closeModal} />
            </div>
        </>
    );
}
