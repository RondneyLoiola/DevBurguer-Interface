import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {UseCart} from '../../hooks/CartContext.jsx'
import {api} from '../../services/api.js'
import formatPrice from '../../utils/formatPrice.js'
import { Button } from "../Button";
import {Container} from './styles'

export function CartResume(){
    const navigate = useNavigate()
    const [finalPrice, setFinalPrice] = useState(0)
    const [deliveryTax] = useState(500)

    const {cartProducts, _clearCart} = UseCart()

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => { //faz a soma de todos os preços
            return current.price * current.quantity + acc
        }, 0)

        setFinalPrice(sumAllItems)
    }, [cartProducts])

    const submitOrder = async () => { //enviar pro backend
        const products = cartProducts.map(product => {
            return {id: product.id, quantity: product.quantity, price: product.price}
        }) 

        try {
            const {data} = await api.post('/create-payment-intent', {products})
            
            navigate('/checkout', {
                state: data// manda o data pro checkout
            })
        } catch (_err) {
            toast.error('Erro, tente novamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return(
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de entrega</p>
                    <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
                </div>
                <div className="container-bottom">
                    <p>Total</p>
                    <p>{formatPrice(finalPrice + deliveryTax)}</p>
                </div>
            </Container>
            <Button onClick={submitOrder}>Finalizar Pedido</Button>
        </div>
    )
}