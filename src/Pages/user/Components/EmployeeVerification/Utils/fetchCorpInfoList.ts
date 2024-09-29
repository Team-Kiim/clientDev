import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type CorpInfo from '@/Types/corpInfo.ts';

type QueryKey = [_1: string, { query: string; criteria: string }];

const fetchCorpInfoList: QueryFunction<CorpInfo[], QueryKey> = ({ queryKey }) => {
    const { query, criteria } = queryKey[1];

    return axios
        .get(
            `/api/corps/${criteria === 'corpName' ? 'name' : 'domain'}?${criteria === 'corpName' ? 'name' : 'domain'}=${query}`,
        )
        .then(response => response.data);
};

export default fetchCorpInfoList;
