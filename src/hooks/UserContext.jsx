import {createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({}) //valor inicial = objeto vazio

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})

    const putUserData = (userInfo) => {
        setUserInfo(userInfo)//quando receber informação do usuário

        localStorage.setItem('devburguer:userData', JSON.stringify(userInfo)) //transforma o userInfo em string
    }

    const logout = () => {
        setUserInfo({}) //limpa as informações do usuário
        localStorage.removeItem('devburguer:userData') //remove a chave
        // poderia tbm => localStorage.clear
    }

    useEffect(() => { //quando a aplicação iniciar, vai verificar se há algo no localStorage
        const userInfoLocalStorage = localStorage.getItem('devburguer:userData')

        if(userInfoLocalStorage){// se tiver algo, vai deixar o userInfo atualizado
            setUserInfo(JSON.parse(userInfoLocalStorage))//transforma de volta para objeto
        }
    }, [])

    return (
        <UserContext.Provider value={{userInfo, putUserData, logout}}> {/*o que colocar em value vai ser exportado */}
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error('useUser must be a valid context')
    }

    return context
}