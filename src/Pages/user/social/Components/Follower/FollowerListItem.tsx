import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';

export default function FollowerListItem() {
    return (
        <li className={'flex gap-x-4 border-b border-slate-200 p-3.5 last:border-none'}>
            <div>
                <div className={'avatar size-8'}>
                    <img className={'size-7 rounded-full'} src={faker.image.avatar()} alt={'profile'} />
                </div>
            </div>
            <div className={'flex flex-1 flex-col gap-y-1'}>
                <Link to={'/user/20'} className={'w-fit text-[0.95rem] font-bold underline underline-offset-4'}>
                    <span>kkangasdf</span>
                </Link>
                <Link to={`mailto:kkangasdf12@naver.com`} className={'w-fit text-[0.8rem] text-slate-500'}>
                    kkangasdf12@naver.com
                </Link>
            </div>
        </li>
    );
}
