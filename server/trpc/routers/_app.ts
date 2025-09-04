import {createTRPCRouter, publicProcedure}            from "@/server/trpc/init";
import {z}                                            from "zod";
import {retrieveCall1Response, retrieveCall3Response} from "@/server/actions/cachingActions";
import {unstable_cache}                               from "@/lib/unstable_cache";
import {API_URL}                                      from "@/lib/api";

export const appRouter = createTRPCRouter({
    // Multiple calls done here to make use of tRPC "batching" for example.
    // As per example call2 is not using the caching action from actions/cachingActions.ts
    // but instead is implementing the unstable_cache directly here to show as in source code.
    call1: publicProcedure
        .input(z.void())
        .query(async () => {

            return await retrieveCall1Response();
        }),
    call2: publicProcedure
        .input(z.void())
        .query(async () => {

            const call2 = await unstable_cache(
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
                [`revalidation-key-call2`],
                {revalidate: 120, tags: [`revalidation-key-call2`]}
            )()

            return `ISO - ${call2.now}`
        }),
    call3: publicProcedure
        .input(z.void())
        .query(async () => {

            return await retrieveCall3Response();
        }),
});

export type AppRouter = typeof appRouter;
