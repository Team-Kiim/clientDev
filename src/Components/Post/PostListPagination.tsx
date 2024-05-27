import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface Props {
    numberOfPosts: number;
}

export default function PostListPagination({ numberOfPosts }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');

    return (
        <div>
            <Pagination
                totalItemsCount={numberOfPosts}
                onChange={(targetPage: number) => {
                    searchParams.set('page', String(targetPage));
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    setSearchParams(searchParams);
                }}
                activePage={currentPage}
                itemsCountPerPage={16}
                pageRangeDisplayed={10}
                prevPageText={<MdKeyboardArrowLeft className={'size-5'} />}
                firstPageText={<MdKeyboardDoubleArrowLeft className={'size-5'} />}
                nextPageText={<MdKeyboardArrowRight className={'size-5'} />}
                lastPageText={<MdKeyboardDoubleArrowRight className={'size-5'} />}
                innerClass={'my-5 flex justify-center gap-x-0.5'}
                linkClass={
                    'flex w-fit items-center justify-center rounded-md px-3 py-2 text-[15px] font-bold text-black transition-all [&:not(&.active)]:hover:bg-gray-100'
                }
                itemClassFirst={'item-center flex flex-col justify-center'}
                linkClassFirst={'!h-8 !w-8 !p-0'}
                itemClassPrev={'item-center mr-1 flex flex-col justify-center'}
                linkClassPrev={'!h-8 !w-8 !p-0'}
                itemClassLast={'item-center flex flex-col justify-center'}
                linkClassLast={'!h-8 !w-8 !p-0'}
                itemClassNext={'item-center flex flex-col justify-center'}
                linkClassNext={'!h-8 !w-8 !p-0'}
                activeLinkClass={
                    'flex w-fit items-center justify-center rounded-md bg-violet-50 px-3 py-2 text-[15px] font-bold text-violet-700'
                }
            />
        </div>
    );
}
