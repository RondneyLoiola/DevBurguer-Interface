import { useEffect, useState } from "react"
import { api } from '../../services/api.js'
import { CategoryButton, Container, ContainerItems, Content, Title } from "./styles.js"
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from "react-router-dom";

export function CategoryCarousel(){
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => { //sempre é chamado quando o componente inicia
        async function loadCategories(){
            const {data} = await api.get('/categories') //pega os dados de categories da api

            setCategories(data)
            
        }
        loadCategories()
    }, [])

    return(
        <Container>
            <Title>Categorias</Title>
            <Content>
                    {
                        categories.map(category => (
                            <ContainerItems key={category.id} $imageUrl={category.url}>
                                <CategoryButton onClick={(e) => {
                                    e.preventDefault()
                                    
                                    try {
                                        navigate({
                                            pathname: '/cardapio',
                                            search: `?categoria=${category.id}`
                                        })
                                    } catch (error) {
                                        console.error('Erro no navigate:', error)
                                    }
                                }}>{category.name}</CategoryButton>
                            </ContainerItems>
                        ))
                    }
            </Content>
        </Container>
    )
}

