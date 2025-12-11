import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as yup from "yup"
import Logo from '../../assets/Logo-1.svg'
import {Button} from '../../components/Button'
import { useUser } from "../../hooks/UserContext.jsx";
import { api } from '../../services/api.js'
import { Container, Form, InputContainer,LeftContainer, Link, RightContainer, Title } from "./styles"

export function Login() {
  const navigate = useNavigate()
  const { putUserData } = useUser()//pega somente o putUserData de useUser
  const schema = yup //react-hook-form
  .object({
    email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
    password: yup.string().min(6, 'A senha deve conter no mínimo 6 caracteres').required('A senha é obrigatório'),
  })
  .required()

    const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => { 
    try {
        const {data: userData} = await toast.promise(//react-toastify
            api.post('/sessions', { //pega da rota /session do backend
                email: data.email,
                password: data.password
        }),
        {
            pending: 'Verificando seus dados',
            success: {
                render() {
                    setTimeout(() => {
                        if(userData?.admin){ //se for admin = true
                            navigate('/admin/pedidos')
                        }
                        else {
                            navigate('/')
                        }
                    }, 2300);
                    return 'Seja Bem-Vindo(a)'
                },
                
            },
            error: 'Email ou Senha Incorretos'
        }
    )
    putUserData(userData)
     //localStorage.setItem('token', token)//armazenar dados do usuário no navegador  -> chave, valor 
    } 
    catch (err) {
        console.error('Erro na solicitação', err)
    }
  }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span> 
                    <br/>
                    Acesse com seu<span> Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label htmlFor='email'>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>{/*o '?' se existe*/}
                    </InputContainer>

                    <InputContainer>
                        <label htmlFor='password'>Senha</label>
                        <input type="password" {...register("password")}/>
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <Button type='submit'>Entrar</Button>
                </Form>
                <p>Não possui conta? <Link to='/cadastro'>Clique aqui.</Link></p>
            </RightContainer>
        </Container>
    )
}

