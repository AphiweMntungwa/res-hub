import TemporaryDrawer from "@/components/layouts/sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <TemporaryDrawer />

            {children}
        </section>
    )
}