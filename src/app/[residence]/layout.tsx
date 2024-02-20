import TemporaryDrawer from "@/components/layouts/sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
    params
}: {
    children: React.ReactNode,
    params: { residence: string }
}) {
    return (
        <main>
            {/* Include shared UI here e.g. a header or sidebar */}
            <TemporaryDrawer residence={params.residence} />
            {children}
        </main>
    )
}