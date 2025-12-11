import styled from 'styled-components'

export const Container = styled.div`
    padding-left: 40px;
    overflow-x: hidden;
    padding-bottom: 40px;

    //class da biblioteca
    .react-multi-carousel-list { //essa classe foi pega no console.log
        overflow: visible;
    }
    
    .carousel-item {
        padding-right: 40px;
    }

    .react-multiple-carousel__arrow--left {
        left: 15px;
        top: 10px;
    }

    .react-multiple-carousel__arrow--right {
        right: 55px;
        top: 10px;
        
    }
`

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #61a120;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin: 70px 0;

    &::after{
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background-color: #61a120;
        border-radius: 10px;
        opacity: 0.8;
        margin-top: 10px;
    }
`
