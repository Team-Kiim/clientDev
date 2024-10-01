import { Link, useLocation, useParams } from 'react-router-dom';

export default function VisitorSideNavbar() {
    const { profileMemberId } = useParams();

    const { pathname } = useLocation();

    const splitPathname = pathname.split('/');

    const lastElementOfSplitPathname = splitPathname.at(-1);

    const currentSideNavItem =
        lastElementOfSplitPathname === 'profile' || lastElementOfSplitPathname === 'social'
            ? lastElementOfSplitPathname
            : 'profile';

    return (
        <nav className={'w-[10rem] py-4'}>
            <ul className={'flex flex-col gap-y-2.5'}>
                <li
                    className={`flex rounded-md text-[0.85rem] font-bold transition-all ${currentSideNavItem === 'profile' ? 'bg-plump-purple-50 text-plump-purple-600' : 'bg-white text-slate-800 hover:bg-plump-purple-50 hover:text-plump-purple-600'} transition-all`}
                >
                    <Link to={`/user/${profileMemberId}/profile`} className={'w-full px-4 py-2'}>
                        <span>프로필 정보</span>
                    </Link>
                </li>
                <li
                    className={`flex rounded-md text-[0.85rem] font-bold transition-all ${currentSideNavItem === 'social' ? 'bg-plump-purple-50 text-plump-purple-600' : 'bg-white text-slate-800 hover:bg-plump-purple-50 hover:text-plump-purple-600'} transition-all`}
                >
                    <Link to={`/user/${profileMemberId}/social`} className={'w-full px-4 py-2'}>
                        <span>소셜 정보</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
