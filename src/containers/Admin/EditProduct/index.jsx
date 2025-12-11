import { yupResolver } from "@hookform/resolvers/yup"
import { Image } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import {useLocation, useNavigate} from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import { api } from "../../../services/api"
import { Container, ContainerCheckBox, ErrorMessage, Form, Input, InputGroup, Label, LabelUpload, Select, SubmitButton } from "./styles"

//REACT HOOK FORM
const schema = yup
    .object({
        name: yup.string().required("Digite o nome do produto"),
        price: yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
        category: yup.object().required('Selecione uma categoria'),
        offer: yup.bool(),
    })

export function EditProduct() {
    const [filename, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const {state: {product}} = useLocation()
    
    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');
            setCategories(data)

            //console.log(data) //-> ver categorias
        }
        loadCategories()
    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        // o FormData é um objeto que envia dados para o backend
        const productFormData = new FormData();
        productFormData.append('name', data.name);
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        productFormData.append('offer', data.offer);

        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: 'Editando produto...',
            success: 'Produto editado com sucesso!',
            error: 'Erro ao editar produto, tente novamente'
        })

        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2300)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input 
                        type="text" 
                        {...register('name')} 
                        defaultValue={product.name} //o product é do useLocation
                    /> 
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input 
                        type="number" 
                        {...register('price')}
                        defaultValue={product.price / 100}
                    />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <LabelUpload>
                        <Image />
                        <input
                            type="file"
                            {...register('file')}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value?.target?.files[0]?.name)
                                register('file').onChange(value) //precisa colocar quando enviar algo, React Hook Form
                            }}
                        />
                        {filename || "Upload do Produto"}
                    </LabelUpload>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller // conecta o react-select com o react-hook-form
                    // sem o controller, o react-select não funciona
                        name="category" //nome do campo
                        control={control} //controlador do react-hook-form
                        defaultValue={product.category}
                        render={({field}) => ( // renderizar o select
                            <Select
                                {...field} //precisa passar isso para o react-select
                                options={categories}
                                getOptionLabel={category => category.name} //mostrar pro usuário
                                getOptionValue={category => category.id} //o backend espera um category.id
                                placeholder="Selecione uma categoria..."
                                defaultValue={product.category}
                            />
                        )}
                    />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckBox>
                        <input type="checkbox" defaultChecked={product.offer} {...register('offer')}/>
                        <Label>Produto em oferta</Label>
                    </ContainerCheckBox>
                </InputGroup>

                <SubmitButton>Editar Produto</SubmitButton>
            </Form>
        </Container>
    )
}