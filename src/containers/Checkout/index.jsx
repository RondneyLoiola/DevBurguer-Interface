import { Elements } from "@stripe/react-stripe-js"
import { useLocation } from "react-router-dom"
import {CheckoutForm} from '../../components/Stripe/CheckoutForm'
import stripePromise from '../../config/stripeConfig.js'

export function Checkout(){
    const {state: {clientSecret}} = useLocation()//recebe as informações CartResume    

    if(!clientSecret) {
        return <div>Erro, volte e tente novamente</div>
    }
    return(
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm/>
        </Elements>
    )
}

