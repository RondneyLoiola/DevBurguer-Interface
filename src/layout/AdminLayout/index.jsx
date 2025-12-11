import { Navigate, Outlet } from "react-router-dom"
import { SideNavAdmin } from "../../components/SideNavAdmin"
import { Container } from "./styles"

export function AdminLayout(){
    const userData = localStorage.getItem('devburguer:userData')
    const {admin: isAdmin} = userData ? JSON.parse(userData) : { admin: false }
    // json.parse serve para pegar informaçãos do localStorage

    return isAdmin ? (
        <Container>
            <SideNavAdmin/>
            <main>
                <section>
                    <Outlet/>
                </section>
            </main>
        </Container>
    )
     : <Navigate to='/login'/>
    
}