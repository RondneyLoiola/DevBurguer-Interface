import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #121214;
`

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;

    h2 {
        color: #9758a6;
        font-weight: 900;
    }

    button {
        width: 100px;
        border: none;
        border-radius: 8px;
        padding: 8px;
        background-color: #9758a6;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        margin-top: 16px;
        transition: all 0.3s;
        font-size: 16px;
        &:hover {
            background-color: #7a3e86;
        }   
    }

    img {
        max-width: 300px;
    }
`