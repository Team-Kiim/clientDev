import { Link, useLocation, useParams } from 'react-router-dom';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { LiaUser, LiaUserLockSolid } from 'react-icons/lia';
import { PiClipboardTextLight } from 'react-icons/pi';

const getCurrentSideNavItem = (pathname: string): string => {
    const splitPathname = pathname.split('/');
    if (splitPathname.length === 2) {
        return 'profile';
    } else if (splitPathname.length === 3) {
        const lastElementOfSplitPathname = splitPathname.at(-1);
        if (
            lastElementOfSplitPathname === 'profile' ||
            lastElementOfSplitPathname === 'account' ||
            lastElementOfSplitPathname === 'post' ||
            lastElementOfSplitPathname === 'chat'
        ) {
            return lastElementOfSplitPathname;
        } else {
            return 'profile';
        }
    } else if (splitPathname.length === 4) {
        return splitPathname.at(-1);
    }
};

export default function SideNavbar() {
    const nickname = useParams().nickname ?? '';

    const { pathname } = useLocation();

    const currentSideNavItem = getCurrentSideNavItem(pathname);
    console.log(currentSideNavItem);

    return (
        <nav className={'w-[10rem] py-4'}>
            <ul className={'flex flex-col gap-y-3'}>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-violet-50 hover:text-violet-700 ${currentSideNavItem === 'profile' ? 'bg-violet-50 text-violet-700' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user${nickname === '' ? '/' : `/${nickname}/`}profile`}>
                        <div className={'flex items-center gap-x-4'}>
                            <LiaUser className={'size-7'} />
                            <span>프로필 정보</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-violet-50 hover:text-violet-700 ${currentSideNavItem === 'post' ? 'bg-violet-50 text-violet-700' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user${nickname === '' ? '/' : `/${nickname}/`}post`}>
                        <div className={'flex items-center gap-x-4'}>
                            <PiClipboardTextLight className={'size-7'} />
                            <span>게시글 관리</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-violet-50 hover:text-violet-700 ${currentSideNavItem === 'chat' ? 'bg-violet-50 text-violet-700' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user${nickname === '' ? '/' : `/${nickname}/`}chat`}>
                        <div className={'flex items-center gap-x-4'}>
                            <HiOutlineChatBubbleOvalLeftEllipsis className={'size-7'} />
                            <span>채팅 관리</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-violet-50 hover:text-violet-700 ${currentSideNavItem === 'account' ? 'bg-violet-50 text-violet-700' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user${nickname === '' ? '/' : `/${nickname}/`}account`}>
                        <div className={'flex items-center gap-x-4'}>
                            <LiaUserLockSolid className={'size-7'} />
                            <span>계정 정보</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
