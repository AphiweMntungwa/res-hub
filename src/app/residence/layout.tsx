import TemporaryDrawer from "@/components/layouts/sidebar"
import StoreProvider from "../storeProvider"


export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode,
}) {

    return (
        <main>
            {/* Include shared UI here e.g. a header or sidebar */}
             <StoreProvider>
                <TemporaryDrawer />
             </StoreProvider>
            {children}
        </main>
    )
}