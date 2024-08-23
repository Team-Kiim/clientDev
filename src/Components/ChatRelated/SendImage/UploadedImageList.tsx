import { GoX } from 'react-icons/go';

interface UploadedImageInfo {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

interface Props {
    uploadedImageInfoList: UploadedImageInfo[];
    onUploadedImageClick(imageInfo: UploadedImageInfo): void;
    onDeleteImageButtonClick(imageInfo: UploadedImageInfo): void;
}

export default function UploadedImageList({
    uploadedImageInfoList,
    onUploadedImageClick,
    onDeleteImageButtonClick,
}: Props) {
    return (
        <div className={'flex flex-col gap-y-2'}>
            <span className={'w-fit text-[0.9rem] font-bold'}>업로드된 이미지 목록</span>
            <div className={'relative h-72 rounded-lg border border-slate-200 '}>
                {uploadedImageInfoList.length !== 0 ? (
                    <ul className={'grid h-full w-full auto-rows-min grid-cols-4 gap-3 overflow-y-auto rounded-lg p-3'}>
                        {uploadedImageInfoList.map(uploadedImageInfo => {
                            return (
                                <li className={'relative h-fit rounded-lg'} key={uploadedImageInfo.id}>
                                    <img
                                        className={'cursor-pointer rounded-lg'}
                                        src={uploadedImageInfo.localImageUrl}
                                        alt={uploadedImageInfo.imageFile.name}
                                        onClick={() => {
                                            onUploadedImageClick(uploadedImageInfo);
                                        }}
                                    />
                                    <button
                                        className={
                                            'absolute -right-2 -top-2 rounded-full border-2 border-white bg-neutral-800 p-1'
                                        }
                                        type={'button'}
                                        onClick={() => {
                                            onDeleteImageButtonClick(uploadedImageInfo);
                                        }}
                                    >
                                        <GoX className={'size-4 text-white'} />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p
                        className={
                            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.8rem] font-bold text-slate-400'
                        }
                    >
                        업로드 된 이미지가 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}
