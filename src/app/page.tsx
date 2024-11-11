"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";

const inititalEnderecos: Address[] = [
  // {
  //   id: uuidv4(),
  //   cep: "51270380",
  //   logradouro: "Rua Engenho Carau",
  //   complemento: "",
  //   unidade: "1",
  //   bairro: "Cohab",
  //   localidade: "Recife",
  //   uf: "PE",
  //   estado: "Pernambuco",
  //   regiao: "Nordeste",
  //   ibge: "2611606",
  //   gia: "",
  //   ddd: "81",
  //   siafi: "2619",
  //   createdAt: new Date(),
  // },
  // {
  //   id: uuidv4(),
  //   cep: "30130010",
  //   logradouro: "Avenida Afonso Pena",
  //   complemento: "",
  //   unidade: "2",
  //   bairro: "Centro",
  //   localidade: "Belo Horizonte",
  //   uf: "MG",
  //   estado: "Minas Gerais",
  //   regiao: "Sudeste",
  //   ibge: "3106200",
  //   gia: "",
  //   ddd: "31",
  //   siafi: "4123",
  //   createdAt: new Date(),
  // },
  // {
  //   id: uuidv4(),
  //   cep: "01310000",
  //   logradouro: "Avenida Paulista",
  //   complemento: "",
  //   unidade: "3",
  //   bairro: "Bela Vista",
  //   localidade: "São Paulo",
  //   uf: "SP",
  //   estado: "São Paulo",
  //   regiao: "Sudeste",
  //   ibge: "3550308",
  //   gia: "1004",
  //   ddd: "11",
  //   siafi: "7107",
  //   createdAt: new Date(),
  // },
  // {
  //   id: uuidv4(),
  //   cep: "40020000",
  //   logradouro: "Praça da Sé",
  //   complemento: "Edifício Central",
  //   unidade: "4",
  //   bairro: "Centro Histórico",
  //   localidade: "Salvador",
  //   uf: "BA",
  //   estado: "Bahia",
  //   regiao: "Nordeste",
  //   ibge: "2927408",
  //   gia: "",
  //   ddd: "71",
  //   siafi: "3849",
  //   createdAt: new Date(),
  // },
  // {
  //   id: uuidv4(),
  //   cep: "70040900",
  //   logradouro: "Esplanada dos Ministérios",
  //   complemento: "",
  //   unidade: "5",
  //   bairro: "Zona Cívico-Administrativa",
  //   localidade: "Brasília",
  //   uf: "DF",
  //   estado: "Distrito Federal",
  //   regiao: "Centro-Oeste",
  //   ibge: "5300108",
  //   gia: "",
  //   ddd: "61",
  //   siafi: "9701",
  //   createdAt: new Date(),
  // },
];

type Address = {
  id: string;
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  createdAt: Date;
};

function formatDate(date: Date) {
  const result = formatDistanceToNow(new Date(date), {
    includeSeconds: true,
    locale: ptBR,
  });

  return result;
}

export default function Home() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const [enderecos, setEnderecos] = useState<Address[]>(inititalEnderecos);

  const [inputValue, setInputValue] = useState("");

  async function handleGetAddress() {
    if (inputValue.length !== 8) {
      alert("CEP inválido");
      return;
    }

    setLoading(true);

    try {
      const result = await getAddress(inputValue);
      setAddress(result.logradouro);
      console.log(address);
      
      // address = result;

      // const newEnderecos = [...enderecos, result];
      const newEndereco: Address = {
        id: uuidv4(),
        createdAt: new Date(),
        ...result,
      };

      console.log(newEndereco);

      setEnderecos([newEndereco, ...enderecos]);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteAdress(id: string){
    setEnderecos(enderecos.filter((enderecos) => enderecos.id !== id));
    alert("Registro deletado")
  }

  return (
    <div>
      <div className="py-5 text-4xl px-5 font-bold">
        <h2>Pesquisa de CEP</h2>
      </div>

      <div className="flex flex-row gap-5 px-5 py-5">
        <label className="self-center">Endereço</label>
        <input
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Digite o CEP aqui"
          className="border"
        />
        <button
          disabled={inputValue === ""}
          onClick={handleGetAddress}
          className={`${
            loading && "opacity-30"
          } w-fit px-5 py-1 bg-blue-700 text-white rounded-xl`}
        >
          {loading ? "Carregando..." : "Obter endereço"}
        </button>
      </div>

      {/* <ul>
        <li>Arthur de Oliveira</li>
        <li>Lucas Galvão</li>
        <li>Izabelle Alves</li>
        <li>Gabryella Silva</li>
        <li>Camilinha Barros</li>
      </ul> */}

      {/* <ul>
        {enderecos.map((endereco) => (
          <li key={endereco.id}>
            {endereco.logradouro}, {formatDate(endereco.createdAt)}
          </li>
        ))}
      </ul> */}

      <div className="px-5 py-5">
        <table className="bg-blue-200 text-black font-bold shadow-md text-center">
          <thead>
            <tr className="">
              <th className="px-5 py-5">CEP</th>
              <th className="px-5 py-5">Logradouro</th>
              <th className="px-5 py-5">Bairro</th>
              <th className="px-5 py-5">Cidade</th>
              <th className="px-5 py-5">Estado</th>
              <th className="px-5 py-5">Região</th>
              <th className="px-5 py-5">Consultado em</th>
              <th className="px-5 py-5">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-center font-normal">
            {enderecos.map((enderecos) => (
              <tr
                key={enderecos.id}
                className="odd:bg-gray-100 even:bg-gray-200 border-b border-gray-300"
              >
                <td className="px-5 py-5">{enderecos.cep}</td>
                <td className="px-5 py-5">{enderecos.logradouro}</td>
                <td className="px-5 py-5">{enderecos.bairro}</td>
                <td className="px-5 py-5">{enderecos.localidade}</td>
                <td className="px-5 py-5">{enderecos.estado}</td>
                <td className="px-5 py-5">{enderecos.regiao}</td>
                <td className="px-5 py-5">{formatDate(enderecos.createdAt)}</td>
                <td className="px-5 py-5">
                  <button onClick={() => handleDeleteAdress(enderecos.id)} className=" text-white px-2 py-2 rounded">
                  <FaTrash size={15} color="red"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
