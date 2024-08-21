import { faker } from '@faker-js/faker';

interface Props {
    memberSent: boolean;
    imageSrcList: string[];
    onImageClick(indexOfClickedImage: number, imageSrcList: string[]): void;
}

export default function ImageChatBubbleListItem({ memberSent, imageSrcList, onImageClick }: Props) {
    return (
        <li className={`chat ${memberSent ? 'chat-start' : 'chat-end'} [&_img]:cursor-pointer`}>
            <div className={'avatar chat-image'}>
                <div className={'size-9 rounded-full'}>
                    <img src={faker.image.avatarGitHub()} alt={'testImage'} />
                </div>
            </div>
            <div className={'chat-header mb-1 flex items-center text-[0.75rem]'}>
                <span className={'mx-2 font-bold'}>kkangasdf12</span>
            </div>
            {imageSrcList.length === 1 ? (
                <div
                    className={`grid max-w-[240px] grid-cols-1 flex-col justify-center gap-x-1 gap-y-1 rounded-xl bg-white p-0 text-[0.8rem] text-black`}
                >
                    {imageSrcList.map(imageSrc => {
                        return (
                            <img
                                key={imageSrc}
                                className={'rounded-xl'}
                                src={imageSrc}
                                alt={'img'}
                                onClick={() => {
                                    onImageClick(0, imageSrcList);
                                }}
                            />
                        );
                    })}
                </div>
            ) : imageSrcList.length === 2 ? (
                <div
                    className={`grid max-w-[240px] grid-cols-2 flex-col justify-center gap-x-1 gap-y-1 rounded-xl bg-white p-0 text-[0.8rem] text-black`}
                >
                    <img
                        className={'rounded-l-xl'}
                        src={imageSrcList[0]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(0, imageSrcList);
                        }}
                    />
                    <img
                        className={'rounded-r-xl'}
                        src={imageSrcList[1]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(1, imageSrcList);
                        }}
                    />
                </div>
            ) : imageSrcList.length === 3 ? (
                <div
                    className={`grid max-w-[240px] grid-cols-2 flex-col justify-center gap-x-1 gap-y-1 rounded-xl bg-white p-0 text-[0.8rem] text-black`}
                >
                    <img
                        className={'rounded-tl-xl'}
                        src={imageSrcList[0]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(0, imageSrcList);
                        }}
                    />
                    <img
                        className={'rounded-tr-xl'}
                        src={imageSrcList[1]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(1, imageSrcList);
                        }}
                    />
                    <img
                        className={'col-span-2 rounded-b-xl'}
                        src={imageSrcList[2]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(2, imageSrcList);
                        }}
                    />
                </div>
            ) : imageSrcList.length === 4 ? (
                <div
                    className={`grid max-w-[240px] grid-cols-2 flex-col justify-center gap-x-1 gap-y-1 rounded-xl bg-white p-0 text-[0.8rem] text-black`}
                >
                    <img
                        className={'rounded-tl-xl'}
                        src={imageSrcList[0]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(0, imageSrcList);
                        }}
                    />
                    <img
                        className={'rounded-tr-xl'}
                        src={imageSrcList[1]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(1, imageSrcList);
                        }}
                    />
                    <img
                        className={'rounded-bl-xl'}
                        src={imageSrcList[2]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(2, imageSrcList);
                        }}
                    />
                    <img
                        className={'rounded-br-xl'}
                        src={imageSrcList[3]}
                        alt={'img'}
                        onClick={() => {
                            onImageClick(3, imageSrcList);
                        }}
                    />
                </div>
            ) : (
                <div
                    className={`grid max-w-[240px] grid-cols-2 flex-col justify-center gap-x-1 gap-y-1 rounded-xl bg-white p-0 text-[0.8rem] text-black`}
                >
                    {imageSrcList.map((imageSrc, index) => {
                        switch (index) {
                            case 0:
                                return (
                                    <img
                                        key={index}
                                        className={'rounded-tl-xl'}
                                        src={imageSrc}
                                        alt={'img'}
                                        onClick={() => {
                                            onImageClick(0, imageSrcList);
                                        }}
                                    />
                                );
                            case 1:
                                return (
                                    <img
                                        key={index}
                                        className={'rounded-tr-xl'}
                                        src={imageSrc}
                                        alt={'img'}
                                        onClick={() => {
                                            onImageClick(1, imageSrcList);
                                        }}
                                    />
                                );
                            case imageSrcList.length - 2:
                                return (
                                    <img
                                        key={index}
                                        className={'rounded-bl-xl'}
                                        src={imageSrc}
                                        alt={'img'}
                                        onClick={() => {
                                            onImageClick(imageSrcList.length - 2, imageSrcList);
                                        }}
                                    />
                                );
                            case imageSrcList.length - 1:
                                return (
                                    <img
                                        key={index}
                                        className={'rounded-br-xl'}
                                        src={imageSrc}
                                        alt={'img'}
                                        onClick={() => {
                                            onImageClick(imageSrcList.length - 1, imageSrcList);
                                        }}
                                    />
                                );
                            default:
                                return (
                                    <img
                                        key={index}
                                        src={imageSrc}
                                        alt={'img'}
                                        onClick={() => {
                                            onImageClick(index, imageSrcList);
                                        }}
                                    />
                                );
                        }
                    })}
                </div>
            )}
            <div className={'chat-footer'}>
                <time className={'text-[0.65rem] opacity-80'}>
                    {2024}년 {12}월 {2}일 · 오후 {12}:{45}
                </time>
            </div>
        </li>
    );
}
