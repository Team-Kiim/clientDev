import { PiHashStraight } from 'react-icons/pi';

interface Hashtag {
    id: number;
    content: string;
}

interface Props {
    hashtagList: Hashtag[];
}

export default function PostHashtagList({ hashtagList }: Props) {
    return (
        <div className={'flex w-full items-center gap-x-2'}>
            <div className={'tooltip tooltip-bottom flex items-center'} data-tip={'해시태그'}>
                <PiHashStraight className={'size-6 text-slate-800'} />
            </div>
            <ul className={'flex min-w-0 flex-1 flex-wrap gap-2'}>
                {hashtagList.map(hashtag => (
                    <li
                        key={hashtag.id}
                        className={'rounded-xl bg-slate-100 px-3 py-2 text-[0.8rem] font-bold text-slate-800'}
                    >
                        {hashtag.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}
