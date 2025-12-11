import { useNavigate } from "react-router-dom"
import Logo from '../../assets/Logo-1.svg'
import { Container, Content } from "./styles"

export function Void(){
    const navigate = useNavigate()
    return (
        <Container>
            <Content>
                <div>
                    <img src={Logo} alt="Logo do site"/>
                </div>
                <h2>Página não encontrada :/</h2>
                <button type="button" onClick={() => navigate('/')}>Início</button>
            </Content>
        </Container>
    )   
}

