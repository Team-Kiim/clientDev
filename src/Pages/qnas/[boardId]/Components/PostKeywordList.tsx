interface Props {
    categories: {
        parentCategory: string;
        childCategory: string;
    }[];
}

export default function PostKeywordList({ categories }: Props) {
    return (
        <ul className={'mb-5 mt-7 flex items-center gap-x-2.5'}>
            {categories.map(category => {
                return (
                    <li className={'rounded-xl bg-gray-100 px-3 py-2 text-[0.8rem] font-bold text-gray-700'}>
                        {category.childCategory}
                    </li>
                );
            })}
        </ul>
    );
}
