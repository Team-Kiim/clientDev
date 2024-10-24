import { useQuery } from '@tanstack/react-query';
import fetchCorpInfoList from '@/Pages/admin/manage/domain/Utils/fetchCorpInfoList.ts';

export default function useCorpInfoListQuery() {
    return useQuery({
        queryKey: ['list', 'corpInfo'],
        queryFn: fetchCorpInfoList,
        refetchOnMount: true,
    });
}
