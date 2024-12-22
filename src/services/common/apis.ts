import getAxios from './header'

export async function getApi(path: string) {
    try {
        const response = await getAxios().get(
            `${process.env.REACT_APP_BASE_URL + path}`
        )
        return response.data
    } catch (err: any) {
        return err.response
    }
}

export async function postApi(path: string, payload: any) {
    try {
        const response = await getAxios().post(
            `${process.env.REACT_APP_BASE_URL + path}`,
            payload
        )
        return response
    } catch (err: any) {
        return err.response
    }
}

export async function putApi(path: string, payload: any) {
    try {
        const response = await getAxios().put(
            `${process.env.REACT_APP_BASE_URL + path}`,
            payload
        )
        return response
    } catch (err) {
        return err
    }
}
