function formatPrice(value){
    return new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(value / 100)
}

export default formatPrice