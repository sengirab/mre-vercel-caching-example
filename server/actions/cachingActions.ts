"use server"

import {unstable_cache} from "@/lib/unstable_cache";
import {API_URL}        from "@/lib/api";

const unstableCacheCall1Response = () => unstable_cache(
    async () => {
        return fetch(`${API_URL}/getTime`, {
            cache  : 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json() as Promise<{
            now: number
        }>);
    },
    [`revalidation-key-call1`],
    {revalidate: 60, tags: [`revalidation-key-call1`]}
)()

export async function retrieveCall1Response() {
    const cached = await unstableCacheCall1Response();

    return `ISO - ${cached.now}`
}

const unstableCacheCall3Response = () => unstable_cache(
    async () => {
        return fetch(`${API_URL}/getTime`, {
            cache  : 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json() as Promise<{
            now: number
        }>);
    },
    [`revalidation-key-call3`],
    {revalidate: 86400, tags: [`revalidation-key-call3`]}
)()

export async function retrieveCall3Response() {
    const cached = await unstableCacheCall3Response();

    return `ISO ${cached.now}`
}
