import Link from "next/link";

export default function Page(){
  return(
      <div className="flex flex-col justify-center items-center overflow-y-auto h-full bg-[url('/img/1.jpg')] bg-repeat">
        <div className="w-[80%] md:w-[40%] text-white text-center">
          <p className="text-5xl font-semibold pb-6 text-center">
            AirFood
          </p>
          <p className="text-center text-lg w-full">
            Сервис генерации меню для авиакомпаний.
          </p>
          <p className="text-center pb-14 text-lg w-full">
            Удобно. Быстро. В одном месте.
          </p>
        </div>

        <div className="mb-3">
          <Link href="/menu">
            <button className="p-3 bg-sky-200 transition rounded-3xl hover:bg-sky-300 text-sky-600 font font-medium">
              Начать с ручным вводом
            </button>
          </Link>
        </div>

        <div className="mb-3">
          <Link href="/flights-menu">
            <button className="p-3 bg-sky-200 transition rounded-3xl hover:bg-sky-300 text-sky-600 font font-medium">
              Начать с использованием Aviationstack
            </button>
          </Link>
        </div>

        <div>
          <Link href="/flights">
            <button className="p-3 bg-sky-200 transition rounded-3xl hover:bg-sky-300 text-sky-600 font font-medium">
              Полёты
            </button>
          </Link>
        </div>

        <div>
          <Link href="/air-teach">
            <button className="p-3 bg-sky-200 transition rounded-3xl hover:bg-sky-300 text-sky-600 font font-medium">
              AirTeach
            </button>
          </Link>
        </div>
      </div>
  )
} 
