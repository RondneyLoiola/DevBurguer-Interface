import { SignOutIcon } from '@phosphor-icons/react'
import { useResolvedPath } from 'react-router-dom'
import Logo from '../../assets/Logo-1.svg'
import {useUser} from '../../hooks/UserContext'
import {navLinks} from './navLinks.jsx'
import { Container, Footer, NavLink, NavLinkContainer } from './styles'

export function SideNavAdmin(){
    const { logout } = useUser()
    const {pathname} = useResolvedPath()

    return(
        <div>
            <Container>
                <img src={Logo} alt='logo devburguer'/>
                <NavLinkContainer>
                    {navLinks.map(link => (
                        <NavLink key={link.id} to={link.path} $isActive={pathname === link.path}>
                            {link.icon}
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </NavLinkContainer>
                <Footer>
                    <NavLink to='/login' onClick={logout}>
                        <SignOutIcon/>
                        <span>Sair</span>
                    </NavLink>
                </Footer>
            </Container>
        </div>
    )
}