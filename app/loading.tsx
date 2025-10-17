import { Spinner } from "@/components/ui/spinner"

export default function Loading({
    searchParams,
  }: {
    searchParams: Promise<{ to?: string }>
  }) {

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center max-w-sm">
            <div className="bg-primary/30 px-4 py-4 rounded-md flex items-center justify-center">
                <Spinner className="text-6xl md:text-4xl font-bold" />
            </div>
        </div>
    </main>
  )
}
