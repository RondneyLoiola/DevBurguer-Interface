import styled from "styled-components";

export const ProductImage = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(43, 42, 42, 0.07);
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        color: #fff;
        border-radius: 4px;
        background-color: #9758a6;
        transition: all 0.4s;
        border: none;

        &:hover {
            background-color: #6f357c;
        }
    }
`;

export const EmptyCart = styled.div`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    div {
        width: 100%;
        background-color: #484848;
        height: 59px;
        position: absolute;
        top: 0;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        p   {
            color: #fff; 
            font-size: 20px;
            font-weight: 700;
            
        }
}

    p {
        color: #1f1f1f;
        font-size: 40px;
    }
`;

export const TotalPrice = styled.p`
    font-weight: bold;
`;

export const TrashImage = styled.img`
    height: 20px;
    width: 20px;
    cursor: pointer;
`;
