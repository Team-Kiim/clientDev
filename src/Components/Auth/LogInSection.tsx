import { faker } from '@faker-js/faker';
import { Link } from 'react-router-dom';
import { BellIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

export default function LogInSection() {
    return (
        <div>
            <div className={'flex items-center gap-x-6 justify-self-end'}>
                <Link className={'rounded-full p-1 transition-all hover:bg-gray-100'} to={'/notification'}>
                    <BellIcon className={'size-7'} />
                </Link>
                <Link className={'rounded-full p-1 transition-all hover:bg-gray-100'} to={'/chat'}>
                    <ChatBubbleOvalLeftEllipsisIcon className={'size-7'} />
                </Link>
                <Link to={`/user/nickname`}>
                    <div className={'avatar flex items-center'}>
                        <div className={'size-7 rounded-full'}>
                            <img src={faker.image.avatar()} alt={'example_profile_img'} />
                        </div>
                    </div>
                </Link>
                <button className={'font-bold transition-all hover:text-violet-700'}>로그아웃</button>
            </div>
        </div>
    );
}
