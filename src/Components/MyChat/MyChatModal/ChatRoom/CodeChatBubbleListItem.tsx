import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { GoCode } from 'react-icons/go';
import type { Chat } from '@/Types/chat.ts';
import 'dayjs/locale/ko.js';

dayjs.locale('ko');

interface Props {
    chatData: Chat;
    onSourceCodeChatBubbleListClick({
        sourceCode,
        language,
        codeDescription,
    }: {
        sourceCode: string;
        language: string;
        codeDescription: string;
    }): void;
}

export default function CodeChatBubbleListItem({ chatData, onSourceCodeChatBubbleListClick }: Props) {
    const { loginMember, senderNickname, createdTime } = chatData;

    return (
        <li
            className={`chat ${loginMember ? 'chat-start' : 'chat-end'}`}
            onClick={() => {
                onSourceCodeChatBubbleListClick({
                    sourceCode:
                        'const add = (x: number, y: number): number => x + y const add = (x: number, y: number): number => x + y',
                    language: 'TypeScript',
                    codeDescription: '코드 설명',
                });
            }}
        >
            <div className={'avatar chat-image'}>
                <div className={'size-9 rounded-full'}>
                    <img src={faker.image.avatarGitHub()} alt={'profileImage'} />
                </div>
            </div>
            <div className={'chat-header flex items-center text-[0.75rem]'}>
                <span className={'mx-2 font-bold'}>{!loginMember && senderNickname}</span>
            </div>
            <div
                className={
                    'flex max-w-[200px] cursor-pointer items-center gap-x-2 rounded-2xl bg-plump-purple-50 px-3 py-1 transition-all hover:bg-plump-purple-100'
                }
            >
                <GoCode className={'size-4 text-plump-purple-600'} />
                <p className={'line-clamp-2 flex-1 text-[0.78rem] font-bold text-plump-purple-600'}>
                    이 코드는 리액트에 관한 코드입니다. 이 코드는 리액트에 관한 코드입니다. 이 코드는 리액트에 관한
                    코드입니다.
                </p>
            </div>
            <div className={'chat-footer'}>
                <time className={'text-[0.65rem] opacity-80'}>
                    {dayjs(
                        typeof createdTime === 'string'
                            ? createdTime
                            : `${createdTime[0]}-${createdTime[1]}-${createdTime[2]} ${createdTime[3]}:${createdTime[4]}`,
                    ).format('YYYY년 MM월 DD일 A HH:mm')}
                </time>
            </div>
        </li>
    );
}
