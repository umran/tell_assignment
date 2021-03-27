import fetch from "isomorphic-unfetch"

export const fetchTodos = async url => {
    const results = await fetch(url, {
        method: "GET"
    })

    if (results.status !== 200) {
        return { error: "unexpected server error" }
    }

    const data = await results.json()
    return data
}