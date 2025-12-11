import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as yup from "yup"
import Logo from '../../assets/Logo-1.svg'
import {Button} from '../../components/Button'
import {api } from '../../services/api.js'
import { Container, Form, InputContainer, LeftContainer, Link, RightContainer, Title } from "./styles"

export function Register() {
  const navigate = useNavigate()
  const schema = yup //react-hook-form
  .object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
    password: yup.string().min(6, 'A senha deve conter no mínimo 6 caracteres').required('A senha é obrigatório'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('As senhas devem ser iguais')//comparar dois campos
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
        
        const { status } = await api.post('/users', { //pega da rota /users do backend
            name: data.name,
            email: data.email,
            password: data.password,
        },
        {
            validateStatus: () => true //tem na documentação axios
        }
    )
        if(status === 200 || status === 201){
            setTimeout(() => {
                navigate('/login')
            }, 2300);
            toast.success('Conta criada com sucesso, efetue seu Login!')
        }
        else if(status === 409 || status === 400){
            toast.error('Email já cadastrado! Faça login para continuar.')
        }
        else {
            throw new Error()
        }
    } 
    catch (_error) {
        toast.error('Falha no Sistema! Tente novamente.')
    }
  }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>Criar Conta</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label htmlFor='text'>Nome</label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>{/*o '?' se existe*/}
                    </InputContainer>

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

                    <InputContainer>
                        <label htmlFor='password'>Confirmar Senha</label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>{/*o '?' se existe*/}
                    </InputContainer>

                    <Button type='submit'>Criar Conta</Button>

                </Form>
                <p>Já possui conta? <Link to='/login'>Clique aqui.</Link></p>
            </RightContainer>
        </Container>
    )
}

