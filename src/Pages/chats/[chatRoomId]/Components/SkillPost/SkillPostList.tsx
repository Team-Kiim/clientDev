import { useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { HiLink } from 'react-icons/hi2';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkillPostListItem from '@/Pages/chats/[chatRoomId]/Components/SkillPost/SkillPostListItem.tsx';
import fetchSkillPostList from '@/Pages/chats/[chatRoomId]/Utils/fetchSkillPostList.ts';
import useEventSourceStore from '@/Stores/useEventSourceStore.ts';
import { useEffect } from 'react';

interface Props {
    childSkillCategory: string;
}

export default function SkillPostList({ childSkillCategory }: Props) {
    const { eventSource } = useEventSourceStore(state => state);

    const queryClient = useQueryClient();

    useEffect(() => {
        const updateSkillPostList = () => {
            queryClient.invalidateQueries({
                queryKey: ['post', 'skill'],
            });
        };

        eventSource.addEventListener('tech', updateSkillPostList);

        return () => {
            eventSource.removeEventListener('tech', updateSkillPostList);
        };
    }, []);

    const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['post', 'skill', { category: childSkillCategory }],
        queryFn: fetchSkillPostList,
        initialPageParam: '',
        getNextPageParam: lastPage => lastPage.at(-1)?.postId,
    });

    const skillPostList = data.pages.flat();

    return (
        <div className={'flex h-[42rem] w-[22rem] flex-col'}>
            <div className={'flex items-center gap-x-1.5 p-3.5'}>
                <HiLink className={'size-5'} />
                <h2 className={'text-center text-[0.95rem] font-extrabold text-slate-800'}>관련 Q&A 게시글</h2>
            </div>
            <div
                id={'scrollableDivForSkillPostList'}
                className={'shrink-0 flex-grow basis-0 overflow-y-auto border-b border-slate-300'}
            >
                <InfiniteScroll
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={null}
                    dataLength={skillPostList.length}
                    scrollThreshold={0.9}
                    scrollableTarget={'scrollableDivForSkillPostList'}
                >
                    <ul className={'h-full w-full'}>
                        {skillPostList.map(skillPost => (
                            <SkillPostListItem key={skillPost.postId} post={skillPost} />
                        ))}
                    </ul>
                </InfiniteScroll>
            </div>
        </div>
    );
}
