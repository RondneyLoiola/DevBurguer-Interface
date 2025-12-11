import {ShoppingCartIcon, UserCircle } from '@phosphor-icons/react'
import { useNavigate, useResolvedPath} from 'react-router-dom'
import { useUser } from '../../hooks/UserContext'
import { Container, Content, HeaderLink, LinkContainer, Logout, Navigation, Options, Profile } from "./styles"

export function Header(){
    const navigate = useNavigate()
    const {pathname} = useResolvedPath() //pathname mostra exatamente onde estamos

    const {logout, userInfo} = useUser()

    function logoutUser(){
        logout();
        navigate('/login')
    }
    
    return(
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to='/' $isActive={pathname === '/'}>Home</HeaderLink>
                        <hr />
                        <HeaderLink to='/cardapio' $isActive={pathname === '/cardapio'}>Cardapio</HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircle color="#fff" size={24} weight="thin"/>
                        <div>
                            <p>Olá, <span>{userInfo.name}</span></p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>
                    <LinkContainer>
                        <ShoppingCartIcon color="#fff"/>
                        <HeaderLink to='/carrinho'>Carrinho</HeaderLink>
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    )
}

