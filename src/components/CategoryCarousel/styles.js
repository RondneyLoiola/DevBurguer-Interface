import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
    padding-left: 40px;

    
    .carousel-item {
        padding-right: 40px;;
    }
`

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #9758a6;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 10px;

    &::after{
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background-color: #9758a6;
        border-radius: 10px;
        opacity: 0.8;
        margin-top: 10px;
    }
`

export const ContainerItems = styled.div`
    background: url('${(props) => props.$imageUrl}');
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    padding: 20px 10px;
    width: 320px;
    height: 300px;
    border-radius: 20px;
    position: relative;
`

export const CategoryButton = styled(Link)`
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    font-weight: 500;
    position: absolute;
    bottom: 5px;
    text-decoration: none;
    

    &:hover {
        background-color: #9758a6;
    }
`

export const Content = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 50px;
`