import { Link, useLocation, useParams } from 'react-router-dom';
import { LiaUser, LiaUserCogSolid, LiaUserLockSolid } from 'react-icons/lia';
import { PiClipboardTextLight } from 'react-icons/pi';

const getCurrentSideNavItem = (pathname: string): string => {
    const splitPathname = pathname.split('/');
    if (splitPathname.length === 2) {
        return 'profile';
    } else if (splitPathname.length === 3) {
        const lastElementOfSplitPathname = splitPathname.at(-1);
        if (
            lastElementOfSplitPathname === 'profile' ||
            lastElementOfSplitPathname === 'social' ||
            lastElementOfSplitPathname === 'account' ||
            lastElementOfSplitPathname === 'post'
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
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-slate-100 ${currentSideNavItem === 'profile' ? 'bg-slate-100' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user/profile`}>
                        <div className={'flex items-center gap-x-4'}>
                            <LiaUser className={'size-7'} />
                            <span>프로필 정보</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-slate-100 ${currentSideNavItem === 'social' ? 'bg-slate-100' : 'bg-white text-gray-700'}`}
                >
                    <Link to={'/user/social'}>
                        <div className={'flex items-center gap-x-4'}>
                            <LiaUserCogSolid className={'size-7'} />
                            <span>소셜 관리</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-slate-100 ${currentSideNavItem === 'post' ? 'bg-slate-100' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user/post`}>
                        <div className={'flex items-center gap-x-4'}>
                            <PiClipboardTextLight className={'size-7'} />
                            <span>게시글 관리</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-slate-100 ${currentSideNavItem === 'account' ? 'bg-slate-100' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user${nickname === '' ? '/' : `/${nickname}/`}account`}>
                        <div className={'flex items-center gap-x-4'}>
                            <LiaUserLockSolid className={'size-7'} />
                            <span>계정 관리</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
