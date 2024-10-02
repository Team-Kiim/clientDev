import { Link, useLocation } from 'react-router-dom';

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
    const { pathname } = useLocation();

    const currentSideNavItem = getCurrentSideNavItem(pathname);
    return (
        <nav className={'w-[10rem] py-4'}>
            <ul className={'flex flex-col gap-y-2.5'}>
                <li
                    className={`flex rounded-md text-[0.85rem] font-bold transition-all ${currentSideNavItem === 'profile' ? 'bg-plump-purple-50 text-plump-purple-600' : 'bg-white text-slate-800 hover:bg-plump-purple-50 hover:text-plump-purple-600'} transition-all`}
                >
                    <Link to={`/user/profile`} className={'w-full px-4 py-2'}>
                        <span>프로필 정보</span>
                    </Link>
                </li>
                <li
                    className={`flex rounded-md text-[0.85rem] font-bold transition-all ${currentSideNavItem === 'social' ? 'bg-plump-purple-50 text-plump-purple-600' : 'bg-white text-slate-800 hover:bg-plump-purple-50 hover:text-plump-purple-600'} transition-all`}
                >
                    <Link to={'/user/social'} className={'w-full px-4 py-2'}>
                        <span>소셜 관리</span>
                    </Link>
                </li>
                <li
                    className={`flex rounded-md text-[0.85rem] font-bold transition-all ${currentSideNavItem === 'post' ? 'bg-plump-purple-50 text-plump-purple-600' : 'bg-white text-slate-800 hover:bg-plump-purple-50 hover:text-plump-purple-600'} transition-all`}
                >
                    <Link to={`/user/post`} className={'w-full px-4 py-2'}>
                        <span>게시글 관리</span>
                    </Link>
                </li>
                <li
                    className={`flex rounded-md text-[0.85rem] font-bold transition-all ${currentSideNavItem === 'comment' ? 'bg-plump-purple-50 text-plump-purple-600' : 'bg-white text-slate-800 hover:bg-plump-purple-50 hover:text-plump-purple-600'} transition-all`}
                >
                    <Link to={`/user/comment`} className={'w-full px-4 py-2'}>
                        댓글 관리
                    </Link>
                </li>
                <li
                    className={`flex rounded-md text-[0.85rem] font-bold transition-all ${currentSideNavItem === 'account' ? 'bg-plump-purple-50 text-plump-purple-600' : 'bg-white text-slate-800 hover:bg-plump-purple-50 hover:text-plump-purple-600'} transition-all`}
                >
                    <Link to={`/user/account`} className={'w-full px-4 py-2'}>
                        <span>계정 관리</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
