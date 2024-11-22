"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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

export default function PastSearch() {
  const [enderecos, setEnderecos] = useState<Address[]>([]);

  useEffect(() => {
    // Carrega os endereços dos cookies
    const enderecosSalvos = Cookies.get("enderecos");
    if (enderecosSalvos) {
      setEnderecos(JSON.parse(enderecosSalvos));
    }
  }, []);

  //   return (
  //     <div>
  //       <h1>Lista de CEPs Pesquisados</h1>
  //       <ul>
  //         {enderecos.map((endereco) => (
  //           <li key={endereco.id}>
  //             {endereco.cep} - {endereco.logradouro}, {endereco.localidade} -{" "}
  //             {endereco.uf}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );

  return (
    <div className="py-10 w-2/4 px-5">
      <h1 className="py-5 text-lg font-semibold">
        Lista de CEPs Pesquisados Recentemente
      </h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2">CEP</th>
            <th className="px-4 py-2">Logradouro</th>
            <th className="px-4 py-2">Localidade</th>
            <th className="px-4 py-2">UF</th>
            <th className="px-4 py-2">Criação do Registro</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {enderecos.map((endereco) => (
            <tr key={endereco.id} className="border-t">
              <td className="px-4 py-2">{endereco.cep}</td>
              <td className="px-4 py-2">{endereco.logradouro}</td>
              <td className="px-4 py-2">{endereco.localidade}</td>
              <td className="px-4 py-2">{endereco.uf}</td>
              <td className="px-4 py-2">{formatDate(endereco.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
