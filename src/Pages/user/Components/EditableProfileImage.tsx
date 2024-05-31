import axios from 'axios';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiImageEditLine } from 'react-icons/ri';

interface Props {
    profileImageName: string;
    profileImagePath: string;
}

export default function EditableProfileImage({ profileImageName, profileImagePath }: Props) {
    const [profileImagePathToChange, setProfileImagePathToChange] = useState('');
    console.log(profileImagePath);

    const inputRef = useRef<HTMLInputElement>(null);

    const queryClient = useQueryClient();

    const { mutate: changeProfileImageMutate } = useMutation({
        mutationFn: () => {
            const file = inputRef.current.files[0];
            const fileBlob = new Blob([file], {
                type: 'application/octet-stream',
            });
            return axios.post(
                '/api/member/enroll-profile-image',
                {
                    file: fileBlob,
                },
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
        },
        onSuccess: async () => {
            await queryClient
                .invalidateQueries({
                    queryKey: ['user'],
                })
                .then(() => {
                    setProfileImagePathToChange('');
                });
            await queryClient.invalidateQueries({
                queryKey: ['loggedIn user'],
            });
        },
        onError: () => {
            setProfileImagePathToChange(profileImagePath);
        },
    });

    return (
        <div className={'flex w-[10rem] flex-col gap-y-3'}>
            <div className={'relative'}>
                <input
                    className={'hidden'}
                    type={'file'}
                    multiple={false}
                    ref={inputRef}
                    onChange={event => {
                        const file = event.target.files[0];
                        if (file) {
                            const fileType = event.target.files[0].type;
                            if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') {
                                const imageURL = URL.createObjectURL(file);
                                setProfileImagePathToChange(imageURL);
                            }
                        }
                    }}
                    accept={'.jpg, .jpeg, .png'}
                />
                <img
                    className={'size-36 rounded-full object-cover'}
                    src={profileImagePathToChange || profileImagePath}
                    alt={profileImageName}
                />
                <button
                    className={
                        'absolute -bottom-1 -right-1 rounded-full border-4 border-white bg-gray-800 p-2 text-white transition-all active:scale-95'
                    }
                    type={'button'}
                    onClick={() => {
                        inputRef.current.value = null;
                        inputRef.current.click();
                    }}
                >
                    <RiImageEditLine className={'size-6'} />
                </button>
            </div>
            {profileImagePathToChange !== '' && (
                <div className={'flex justify-center gap-x-2'}>
                    <button
                        className={'rounded-lg px-2 py-1.5 transition-all hover:bg-violet-50'}
                        type={'button'}
                        onClick={() => {
                            changeProfileImageMutate();
                        }}
                    >
                        <span className={'font-bold text-violet-700'}>확인</span>
                    </button>
                    <button
                        className={'rounded-lg px-2 py-1.5 transition-all hover:bg-gray-100'}
                        type={'button'}
                        onClick={() => {
                            setProfileImagePathToChange('');
                        }}
                    >
                        <span className={'font-bold'}>취소</span>
                    </button>
                </div>
            )}
        </div>
    );
}
