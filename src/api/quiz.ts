import { getApi, postApi, putApi } from '../services/common/apis'

export async function getQuizData(path: string) {
    try {
        const data = await getApi(path)
        return data
    } catch (err) {
        if (err instanceof Error && 'response' in err) {
            return (err as any).response
        }
        throw err
    }
}

export async function postQuizData(path: string, quizData: any) {
    try {
        const response = await postApi(path, quizData)
        return response.data
    } catch (err) {
        if (err instanceof Error && 'response' in err) {
            return (err as any).response
        }
        throw err
    }
}
export async function updateQuizData(path: string, updatedQuizData: any) {
    try {
        const response = await putApi(path, updatedQuizData)
        return response.data
    } catch (err) {
        if (err instanceof Error && 'response' in err) {
            return (err as any).response
        }
        throw err
    }
}
