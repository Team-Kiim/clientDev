import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

const useRequireLoginAlert = ({ message, from }: { message: string; from: string }) => {
    const navigate = useNavigate();

    const showRequireLoginAlert = () => {
        withReactContent(Swal)
            .fire({
                html: (
                    <p className={'text-sm leading-relaxed text-slate-500'}>
                        {message}
                        <br />
                        로그인 하시겠습니까?
                    </p>
                ),
                title: (
                    <div className={'flex items-center gap-x-2'}>
                        <HiOutlineExclamationCircle className={'size-6 text-rose-500'} />
                        <h1 className={'font-bold'}>로그인 필요</h1>
                    </div>
                ),
                showCancelButton: true,
                confirmButtonText: '로그인',
                cancelButtonText: '취소',
                customClass: {
                    cancelButton: 'text-black font-bold bg-slate-100 rounded-xl text-sm',
                    confirmButton: 'font-bold bg-plump-purple-600 rounded-xl text-sm',
                    popup: 'rounded-xl pt-8 pb-5 px-4 w-[24rem] !flex !flex-col gap-y-1',
                    htmlContainer: '!text-slate-500  text-start !px-0 !text-start !text-sm',
                    actions: 'w-full justify-end my-0',
                    title: 'text-start font-extrabold text-slate-800 text-[1.2rem] p-0',
                },
            })
            .then(result => {
                if (result.isConfirmed) {
                    navigate('/sign_in', {
                        state: {
                            from,
                        },
                    });
                }
            });
    };

    return {
        showRequireLoginAlert,
    };
};

export default useRequireLoginAlert;
