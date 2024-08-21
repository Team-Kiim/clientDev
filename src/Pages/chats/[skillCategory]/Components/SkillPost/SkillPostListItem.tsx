import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';

export default function SkillPostListItem() {
    return (
        <li className={'border-b border-slate-200 p-3 transition-all last:border-none hover:bg-slate-100'}>
            <Link to={'/qnas/10'}>
                <div className={'flex gap-x-3.5'}>
                    <div className={'avatar size-8 rounded-full'}>
                        <img className={'size-8 rounded-full'} src={faker.image.avatar()} alt={'profile_img'} />
                    </div>
                    <div className={'flex flex-1 flex-col gap-y-2'}>
                        <h2 className={'line-clamp-1 text-[0.9rem] font-extrabold'}>게시글 제목 테스트</h2>
                        <p className={'line-clamp-2 text-[0.8rem] text-slate-500'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
}
