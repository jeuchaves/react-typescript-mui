import { useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        debounce(() => {
            PessoasService.getAll(1, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    console.log(result);
                });
        });
    }, [busca, debounce])

    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoBotaoNovo="Nova"
                    mostrarInputBusca
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
            Teste
        </LayoutBaseDePagina>
    )
}