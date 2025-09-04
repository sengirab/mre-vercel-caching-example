"use server"

import {unstable_cache} from "@/lib/unstable_cache";

const unstableCacheResponse = () => unstable_cache(
    async () => {
        return fetch('http://worldtimeapi.org/api/timezone/Europe/Amsterdam', {
            cache  : 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json() as Promise<{
            datetime: string
            utc_datetime: string
        }>);
    },
    [`revalidation-key`],
    {revalidate: 60, tags: [`revalidation-key`]}
)()

export async function retrieveResponse() {
    const cached = await unstableCacheResponse();

    return `call - ${cached.datetime}`
}
