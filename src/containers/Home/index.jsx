import {CategoryCarousel, OfferCarousel } from "../../components/index.js"
import { Banner, Container } from "./styles"

export function Home(){

    return (
        <main>
            <Banner>
                <h1>Bem-Vindo!(a)</h1>
            </Banner>
            <Container>
                <div>
                    <CategoryCarousel/>
                    <OfferCarousel/>
                </div>
            </Container>
        </main>
    )
}
