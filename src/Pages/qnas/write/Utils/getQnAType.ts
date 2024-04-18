const getQnAType = (searchParams: URLSearchParams): string => {
    if (searchParams.get('qna_type') !== 'dev' && searchParams.get('qna_type') !== 'nonDev') {
        return 'dev';
    }

    return searchParams.get('qna_type') ?? 'dev';
};

export default getQnAType;
