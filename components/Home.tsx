"use client"

import {useTRPC}  from "@/server/trpc/client";
import {useQuery} from "@tanstack/react-query";

export default function Home() {
    const trpc = useTRPC();

    const {data: call1} = useQuery(trpc.call1.queryOptions());
    const {data: call2} = useQuery(trpc.call2.queryOptions());
    const {data: call3} = useQuery(trpc.call3.queryOptions());

    return (
        <main className="flex min-h-screen items-center justify-center p-24">
            <div className="space-y-4">

                <div className="font-bold">{call1}</div>

                {/*Not needed, but ensures these calls are made on the client*/}
                <div className="hidden">
                    <div>{call2}</div>
                    <div>{call3}</div>
                </div>
            </div>
        </main>
    )
}
