import {createTRPCRouter, publicProcedure} from "@/server/trpc/init";
import {z}                                 from "zod";
import {retrieveResponse}                  from "@/server/actions/cachingActions";

export const appRouter = createTRPCRouter({
    // Multiple calls done here to make use of tRPC "batching" for example.
    call1: publicProcedure
        .input(z.void())
        .query(async () => {

            return await retrieveResponse();
        }),
    call2: publicProcedure
        .input(z.void())
        .query(async () => {

            return "call2";
        }),
    call3: publicProcedure
        .input(z.void())
        .query(async () => {

            return "call3";
        }),
});

export type AppRouter = typeof appRouter;
