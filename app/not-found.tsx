import NextLink from "next/link"

export default function NotFound({
    searchParams,
  }: {
    searchParams: Promise<{ to?: string }>
  }) {

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center max-w-sm">
            <div className="md:rotate-90 bg-primary/30 px-6 py-4 rounded-md flex items-center justify-center mb-2 md:mb-0">
                <span className="text-6xl md:text-4xl font-bold">404</span>
            </div>
            <div>
                <h1 className="text-2xl font-bold md:text-4xl">Page Not Found</h1>
                <p>Uh oh! The page you are looking for does not exist.</p>
            </div>
        </div>
        <NextLink href="/" className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 bg-primary hover:bg-primary text-primary-foreground px-4 py-2 rounded-md transition-colors" replace>
            Go Back Home
        </NextLink>
    </main>
  )
}
