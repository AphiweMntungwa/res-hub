import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('../canvas'), { ssr: false })


export default function Dashboard() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Canvas />
        </main>)
}




