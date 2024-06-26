import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    
        <section className="bg-gray-50 items-center flex flex-col">
  <div className="mx-auto max-w-screen-xl px-4 xl:lg:py-28 py-16 lg:flex  lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Manage Your Expense
        <strong className="font-extrabold text-blue-600 sm:block"> Control Your Money</strong>
      </h1>

      <p className="mt-4 sm:text-lg/relaxed">
                  Start Creating your budget and save ton of money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/sign-in"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  </div>
  <Image src={"/dashboard.png"} alt='dashboard' width={1000} height={200} className='-mt-6 rounded-xl border-2  '/>
</section>
    
  )
}

export default Hero