import { yupResolver } from "@hookform/resolvers/yup"
import { Image } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
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
        file: yup.mixed().test('required', 'Escolha um arquivo para continuar', (value) => {
            return value && value.length > 0
        }).test('fileSize', 'Carregue arquivos até 3mb', value => {
            return value && value.length > 0 && value[0].size >= 30000;
        }).test('type', 'Carregue apenas imagens PNG ou JPEG', value => {
            return value && value.length > 0 && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
        }),
    })

export function NewProduct() {
    const [filename, setFileName] = useState(null)
    const [categories, setCategories] = useState([])

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
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);

        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando produto...',
            success: 'Produto adicionado com sucesso!',
            error: 'Erro ao adicionar produto'
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')} />
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
                        render={({field}) => ( // renderizar o select
                            <Select
                                {...field} //precisa passar isso para o react-select
                                options={categories}
                                getOptionLabel={category => category.name} //mostrar pro usuário
                                getOptionValue={category => category.id} //o backend espera um category.id
                                placeholder="Selecione uma categoria..."
                            />
                        )}
                    />

                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckBox>
                        <input type="checkbox" {...register('offer')}/>
                        <Label>Produto em oferta?</Label>
                    </ContainerCheckBox>
                </InputGroup>

                <SubmitButton>Adicionar Produto</SubmitButton>
            </Form>
        </Container>

    )
}