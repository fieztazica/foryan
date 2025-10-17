import { notFound } from "next/navigation";
import Home from "./pages/home";

export default async function Index({
    searchParams,
  }: {
    searchParams: Promise<{ to?: string }>
  }) {
    const to = (await searchParams).to;
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const vietnamDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const isOct20 = vietnamDate.getUTCMonth() === 9 && vietnamDate.getUTCDate() === 20;
    if (to && to === "Yan" && !isOct20) {
        return notFound();
    }

    return (
        <main className="relative h-dvh w-full overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
            <Home />
        </main>
    )
}
