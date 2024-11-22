import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b py-5">
      <nav className="flex flex-row justify-between items-center">
        <div className="px-5 py-2">
          <span className="text-4xl font-bold text-black">Busca CEP</span>
        </div>
        <div>
          <ul className="flex flex-row gap-5 px-5">
            <li className="hover:text-blue-600">
              <Link href={"/"}>Nova Busca</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link href={"/past-search"}>Buscas Anteriores</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
