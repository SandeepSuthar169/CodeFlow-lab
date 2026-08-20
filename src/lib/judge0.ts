import axios from "axios"

export const getJudge0LanguageId = (language: string) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVASCRIPT": 63,
        "JAVA": 62
    }

    return languageMap[language.toUpperCase() as keyof typeof languageMap]
}

export const submitBatch = async (submissions: any) => {

    const options = {
        method: 'POST',
        url: 'https://judge0-extra-ce1.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': 'b0795d874cmsh64621dfc9e7df00p13ff0cjsna6fa87ddddcf',
            'x-rapidapi-host': 'judge0-extra-ce1.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions: submissions,
        }
    };

    const { data } = await axios.request(options)

    return data;
}

export const pollBatchResults = async (tokens: string[]) => {
    while (true) {
        const options = {
            method: 'GET',
            url: 'https://judge0-extra-ce1.p.rapidapi.com/submissions/batch',
            params: {
                tokens: tokens.join(","),
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': 'b0795d874cmsh64621dfc9e7df00p13ff0cjsna6fa87ddddcf',
                'x-rapidapi-host': 'judge0-extra-ce1.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.request(options)

        const results = data.submissions;

        const isAllDone = results.every(
            (r: any) => r.status.id !== 1 && r.status.id !== 2
        )

        if (isAllDone) return results

        await sleep(1000);
    }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)) 