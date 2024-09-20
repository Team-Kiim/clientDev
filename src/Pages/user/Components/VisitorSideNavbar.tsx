import { Link, useLocation, useParams } from 'react-router-dom';
import { LiaUser, LiaUserFriendsSolid } from 'react-icons/lia';

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
            <ul className={'flex flex-col gap-y-3'}>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-slate-100 ${currentSideNavItem === 'profile' ? 'bg-slate-100' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user/${profileMemberId}/profile`}>
                        <div className={'flex items-center gap-x-4'}>
                            <LiaUser className={'size-7'} />
                            <span>프로필 정보</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={`rounded-md px-3 py-1.5 text-[0.95rem] font-bold transition-all hover:bg-slate-100 ${currentSideNavItem === 'social' ? 'bg-slate-100' : 'bg-white text-gray-700'}`}
                >
                    <Link to={`/user/${profileMemberId}/social`}>
                        <div className={'flex items-center gap-x-4'}>
                            <LiaUserFriendsSolid className={'size-7'} />
                            <span>소셜 정보</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
