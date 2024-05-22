interface Props {
    keywords: string[];
}

export default function PostKeywordList({ keywords }: Props) {
    return (
        <ul className={'mb-5 mt-7 flex items-center gap-x-2.5'}>
            {keywords.map(keyword => {
                return (
                    <li className={'rounded-xl bg-gray-100 px-3 py-2 text-[0.8rem] font-bold text-gray-700'}>
                        {keyword}
                    </li>
                );
            })}
        </ul>
    );
}
