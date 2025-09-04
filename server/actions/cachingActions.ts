"use server"

import {unstable_cache} from "@/lib/unstable_cache";

const unstableCacheResponse = () => unstable_cache(
    async () => {
        const API_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api` : 'http://localhost:3000/api';

        return fetch(`${API_URL}/getTime`, {
            cache  : 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json() as Promise<{
            now: number
        }>);
    },
    [`revalidation-key`],
    {revalidate: 60, tags: [`revalidation-key`]}
)()

export async function retrieveResponse() {
    const cached = await unstableCacheResponse();

    return `timestamp - ${cached.now}`
}
