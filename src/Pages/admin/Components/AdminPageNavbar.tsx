import { Link, NavLink } from 'react-router-dom';

export default function AdminPageNavbar() {
    const { VITE_ADMIN_SECRET_KEY } = import.meta.env;

    return (
        <nav
            className={
                'sticky top-0 z-50 flex h-[4.5rem] w-full min-w-[1500px] items-center justify-center border-b border-slate-300 backdrop-blur-md'
            }
        >
            <div className={'w-[80rem]'}>
                <div className={'flex w-full items-center gap-x-10'}>
                    <Link
                        className={
                            'logo inline-block bg-gradient-to-br from-plump-purple-500 to-plump-purple-700 bg-clip-text text-2xl font-bold text-transparent'
                        }
                        to={'/'}
                    >
                        KoffeeChat
                    </Link>
                    <ul className={'flex gap-x-4'}>
                        <li>
                            <NavLink
                                to={`/admin-${VITE_ADMIN_SECRET_KEY}/manage/domain`}
                                className={({ isActive }) => {
                                    return `rounded-lg px-2 py-2.5 text-[0.93rem] font-bold transition-all ${isActive ? 'bg-plump-purple-50 text-plump-purple-600' : 'text-slate-800 hover:bg-slate-100'}  `;
                                }}
                            >
                                도메인 관리
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/admin-${VITE_ADMIN_SECRET_KEY}/manage/post`}
                                className={({ isActive }) => {
                                    return `rounded-lg px-2 py-2.5 text-[0.93rem] font-bold transition-all ${isActive ? 'bg-plump-purple-50 text-plump-purple-600' : 'text-slate-800 hover:bg-slate-100'}  `;
                                }}
                            >
                                게시글 관리
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/admin-${VITE_ADMIN_SECRET_KEY}/manage/skill_chat_room`}
                                className={({ isActive }) => {
                                    return `rounded-lg px-2 py-2.5 text-[0.93rem] font-bold transition-all ${isActive ? 'bg-plump-purple-50 text-plump-purple-600' : 'text-slate-800 hover:bg-slate-100'}  `;
                                }}
                            >
                                기술 채팅방 관리
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
