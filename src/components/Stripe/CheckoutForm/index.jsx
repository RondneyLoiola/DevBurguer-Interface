import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles.css'
import { toast } from "react-toastify";
import { UseCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";

export function CheckoutForm() {
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const {state: { dpmCheckerLink }} = useLocation();
  const {cartProducts, clearCart} = UseCart()

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe ou Elements com falha, tente novamente!')
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent} = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    
    if (error) {
      setMessage(error.message);
      toast.error(error.message)
    }
    else if(paymentIntent && paymentIntent.status === 'succeeded'){ //se não deu erro e o status for succeeded
      try {
        const products = cartProducts.map(product => {
            return {id: product.id, quantity: product.quantity, price: product.price}
        }) 
            const { status } = await api.post('/orders', {products},
                {
                    validateStatus: () => true //tem na documentação axios
                }
            )
            if(status === 200 || status === 201){
                setTimeout(() => {
                    navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
                    clearCart()
                }, 2300);

                toast.success('Pedido Realizado com Sucesso!')
            }
            else if(status === 409 || status === 400){
                toast.error('Falha ao realizar o seu pedido!')
            }
            else {
                throw new Error()
            }
            
        } 
        catch (_error) {
            toast.error('Falha no Sistema! Tente novamente.')
        };
    }
    else { //quando não dá erro e nem sucesso
      navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  }

  return (
    <div className="container">
        <form className="payment-form" onSubmit={handleSubmit}>

            <PaymentElement className="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} className="button" type="submit">
                <span className="button-text">
                    {isLoading ? <div className="spinner"></div> : "Pagar Agora"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div className="payment-message">{message}</div>}
        </form>
        <div className="dpm-annotation">
            <p>
                Os métodos de pagamentos são disponibilizados de acordo com a sua região.&nbsp;
                <a
                    href={dpmCheckerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dpm-integration-checker link"
                >
                    Visualizar métodos de pagamento por transação
                </a>
            </p>
        </div>
    </div>
  )
}