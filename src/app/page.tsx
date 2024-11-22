"use client";
import { useState, useEffect } from "react";
import { getAddress } from "../../get-address";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

const inititalEnderecos: Address[] = [];

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

  useEffect(() => {
    // Carrega os endereços dos cookies ao inicializar o componente
    const enderecosSalvos = Cookies.get("enderecos");
    if (enderecosSalvos) {
      setEnderecos(JSON.parse(enderecosSalvos));
    }
  }, []);

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

      // Atualiza a lista de endereços no estado
      const updatedEnderecos = [newEndereco, ...enderecos];
      setEnderecos(updatedEnderecos);

      // Salva a lista de endereços no cookie
      Cookies.set("enderecos", JSON.stringify(updatedEnderecos), {
        expires: 7,
      }); // O cookie expira em 7 dias
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  // para remover um item
  function handleRemoveAddress(id: string) {
    setEnderecos((prevEnderecos) =>
      prevEnderecos.filter((end) => end.id !== id)
    );
  }

  // Função para abrir o Google Maps com o endereço
  function handleOpenMaps(endereco: Address) {
    const addressQuery = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      addressQuery
    )}`;
    window.open(mapsUrl, "_blank"); // Abre o Google Maps em uma nova aba
  }

  return (
    <div>
      <div className="py-10 text-2xl px-5">
        <h2>Nova busca de CEP</h2>
      </div>

      <div className="flex flex-row gap-5 px-5 py-5">
        {/* <label className="self-center">CEP</label> */}
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

      <div className="px-5 py-5">
        <table className="bg-blue-200 text-black font-bold max-w-screen-xl shadow-md text-center">
          <thead>
            <tr className="">
              <th className="px-5 py-5">CEP</th>
              <th className="px-5 py-5">Logradouro</th>
              <th className="px-5 py-5">Bairro</th>
              <th className="px-5 py-5">Cidade</th>
              <th className="px-5 py-5">Estado</th>
              <th className="px-5 py-5">Região</th>
              <th className="px-5 py-5">Criação do Registro</th>
              <th className="px-5 py-5">Remover</th>
              <th className="px-5 py-5">Mostrar no Maps</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-center font-normal">
            {enderecos.map((enderecos) => (
              <tr
                key={enderecos.id}
                className="odd:bg-gray-100 even:bg-gray-200 border-b border-gray-300"
              >
                <td className="px-5 py-5">{enderecos.cep}</td>
                <td className="px-5 py-5 font-bold">{enderecos.logradouro}</td>
                <td className="px-5 py-5">{enderecos.bairro}</td>
                <td className="px-5 py-5">{enderecos.localidade}</td>
                <td className="px-5 py-5">{enderecos.estado}</td>
                <td className="px-5 py-5">{enderecos.regiao}</td>
                <td className="px-5 py-5">{formatDate(enderecos.createdAt)}</td>
                <td className="px-5 py-5">
                  <button onClick={() => handleRemoveAddress(enderecos.id)}>
                    <FaRegTrashAlt color="red" />
                  </button>
                </td>
                <td className="px-5 py-5">
                  <button
                    onClick={() => handleOpenMaps(enderecos)}
                    className="bg-green-500 text-white font-bold text-sm rounded-md py-3 px-3"
                  >
                    Google Maps
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
