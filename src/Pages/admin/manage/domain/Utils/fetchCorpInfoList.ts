import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

type QueryKey = [_1: string, _2: string];

interface CorpInfo {
    id: number;
    name: string;
    emailDomain: string;
    status: string;
}

const fetchCorpInfoList: QueryFunction<CorpInfo[], QueryKey> = () => {
    return axios.get('/api/admin/corps').then(response => response.data);
};

export default fetchCorpInfoList;
