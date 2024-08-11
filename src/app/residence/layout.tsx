import TemporaryDrawer from "@/components/layouts/sidebar"


export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode,
}) {

    return (
        <main>
            {/* Include shared UI here e.g. a header or sidebar */}
            <TemporaryDrawer />
            {children}
        </main>
    )
}