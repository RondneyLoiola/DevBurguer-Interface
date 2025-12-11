import TrashIcon from '../../assets/trash.svg'
import { UseCart } from '../../hooks/CartContext.jsx'
import formatPrice from '../../utils/formatPrice'
import {Table} from '../index.js'
import { ButtonGroup, EmptyCart, ProductImage, TotalPrice, TrashImage } from './styles.js'

export function CartItems(){
    const {cartProducts, decreaseProduct, increaseProduct, deleteProduct} = UseCart()

    if(!cartProducts || cartProducts.length === 0) {
        return <EmptyCart>
            <div><p>Carrinho</p></div>
            <p>Carrinho Vazio</p>
        </EmptyCart>
        
    }

    return(
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cartProducts.map(product => (
                    <Table.Tr key={product.id}>
                        <Table.Td>
                            <ProductImage src={product.url} alt='Imagem Pedido'/>
                        </Table.Td>
                        <Table.Td>{product.name}</Table.Td>
                        <Table.Td>{product.currencyValue}</Table.Td>
                        <Table.Td>
                            <ButtonGroup>
                                <button type='button' onClick={() => decreaseProduct(product.id)}>-</button>
                                {product.quantity}
                                <button type='button' onClick={() => increaseProduct(product.id)}>+</button>
                            </ButtonGroup>
                        </Table.Td>
                        <Table.Td>
                            <TotalPrice>
                                {formatPrice(product.quantity * product.price)}
                            </TotalPrice>
                        </Table.Td>
                        <Table.Td>
                            <TrashImage src={TrashIcon} alt='lixeira' onClick={() => deleteProduct(product.id)}/>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Body>
        </Table.Root>
    )
}