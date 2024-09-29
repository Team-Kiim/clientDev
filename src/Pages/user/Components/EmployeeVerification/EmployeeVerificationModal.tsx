import { useState } from 'react';
import Modal from 'react-modal';
import { HiXMark } from 'react-icons/hi2';
import SetCorpInfoSection from '@/Pages/user/Components/EmployeeVerification/SetCorpInfo/SetCorpInfoSection.tsx';
import EmployeeVerificationForm from '@/Pages/user/Components/EmployeeVerification/EmployeeVerificationForm/EmployeeVerificationForm.tsx';
import type CorpInfo from '@/Types/corpInfo.ts';

interface Props {
    isModalOpen: boolean;
    closeModal(): void;
}

export default function EmployeeVerificationModal({ isModalOpen, closeModal }: Props) {
    const [currentViewName, setCurrentViewName] = useState('employeeVerificationView');

    const [isCorpInfoSelected, setIsCorpInfoSelected] = useState(false);

    const [selectedCorpInfo, setSelectedCorpInfo] = useState<CorpInfo>({
        corpName: '',
        corpEmailDomain: '',
    });

    const updateSelectedCorpInfo = (corpInfo: CorpInfo) => {
        setSelectedCorpInfo(corpInfo);
        setIsCorpInfoSelected(true);
    };

    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 flex w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white p-4'
            }
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            onAfterOpen={() => {
                document.body.style.overflowY = 'hidden';
            }}
            onAfterClose={() => {
                document.body.style.overflowY = 'auto';
                setIsCorpInfoSelected(false);
                setSelectedCorpInfo({
                    corpName: '',
                    corpEmailDomain: '',
                });
            }}
        >
            <div className={'flex justify-end'}>
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
            <div className={'flex flex-col gap-y-8'}>
                <h1 className={'mx-2 text-lg font-extrabold'}>현직자 인증</h1>
                <SetCorpInfoSection
                    selectedCorpInfo={selectedCorpInfo}
                    updateSelectedCorpInfo={updateSelectedCorpInfo}
                />
                <div className={'flex justify-end'}>
                    <p className={'text-[0.75rem] text-slate-500'}>
                        찾으시는 도메인이 없으신가요?{' '}
                        <button
                            className={'font-bold text-plump-purple-600 hover:underline hover:underline-offset-4'}
                            type={'button'}
                            onClick={() => {
                                setCurrentViewName('requestToAddDomainView');
                            }}
                        >
                            도메인 추가 요청
                        </button>
                    </p>
                </div>
                {isCorpInfoSelected && (
                    <EmployeeVerificationForm selectedCorpInfo={selectedCorpInfo} closeModal={closeModal} />
                )}
            </div>
        </Modal>
    );
}
