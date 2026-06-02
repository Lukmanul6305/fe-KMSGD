export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full max-w-7xl mx-auto px-6 pt-30 pb-20">
            {children}
        </main>
    )
}