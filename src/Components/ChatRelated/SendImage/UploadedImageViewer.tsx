import { GoImage } from 'react-icons/go';

interface UploadedImageInfo {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

interface Props {
    uploadImageInfoToView: UploadedImageInfo;
}

export default function UploadedImageViewer({ uploadImageInfoToView }: Props) {
    return (
        <div className={'flex flex-col gap-y-2'}>
            <div className={'flex flex-col gap-y-1'}>
                <span className={'w-fit text-[0.9rem] font-bold'}>이미지 미리보기</span>
            </div>
            <div className={'h-[30rem] w-full overflow-y-auto rounded-lg'}>
                {uploadImageInfoToView ? (
                    <img
                        className={'w-full rounded-lg'}
                        src={uploadImageInfoToView.localImageUrl}
                        alt={'uploaded_image'}
                    />
                ) : (
                    <div className={'flex flex-col items-center'}>
                        <GoImage className={'size-96 text-slate-300'} />
                        <p className={'text-[0.8rem] font-bold text-slate-400'}>
                            업로드 된 이미지 목록에서 각 이미지를 클릭해주세요.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
