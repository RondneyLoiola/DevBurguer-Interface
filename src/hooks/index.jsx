import { CartProvider } from "./CartContext"
import { UserProvider } from "./UserContext"


const AppProvider = ({children}) => { //children -> os outros contexts
    return (
        <UserProvider> {/**todas as pastas que estão dentro do AppProvider no main.jsx, tem acesso ao CartContext */}
            <CartProvider>
                {children}
            </CartProvider>
        </UserProvider>
    )
}

export default AppProvider