"use server"

import {unstable_cache} from "@/lib/unstable_cache";

const unstableCacheResponse = () => unstable_cache(
    async () => {
        return fetch('https://aisenseapi.com/services/v1/datetime', {
            cache  : 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json() as Promise<{
            datetime: string
        }>);
    },
    [`revalidation-key`],
    {revalidate: 60, tags: [`revalidation-key`]}
)()

export async function retrieveResponse() {
    const cached = await unstableCacheResponse();

    return `call - ${cached.datetime}`
}
