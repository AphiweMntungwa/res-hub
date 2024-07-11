import React from "react"
import Image from 'next/image'

export default function Home() {
  return (
    <React.Fragment>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere obcaecati ullam necessitatibus, hic ex exercitationem labore quam veritatis distinctio id laborum iusto harum corrupti voluptatibus quidem iure, eaque nostrum eveniet!
          Corporis molestias at fuga, tenetur temporibus totam illum minus animi, provident accusantium modi doloribus sit tempora, quas facilis quidem eligendi fugit dolorem iure accusamus blanditiis magnam. Unde, aspernatur deleniti. Molestiae.
          Labore officia fugiat totam officiis tempora iusto praesentium architecto quibusdam, eveniet voluptatem numquam at suscipit. Distinctio vel numquam exercitationem quas qui repudiandae aut animi molestiae hic sit, accusamus magnam magni.
          Debitis in doloribus necessitatibus reiciendis perspiciatis dolorum fugit eaque ex eum. Corrupti facere maxime esse deserunt incidunt similique harum at est, reiciendis a maiores consequatur repellendus deleniti et praesentium debitis.
        </p>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </main>
    </React.Fragment>

  )
}
