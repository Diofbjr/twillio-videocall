import styled from 'styled-components';

export const Container = styled.div`

`

export const SubContainer = styled.div`
    .custom-buttom{
        display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            z-index: 1;

            top: 74.3%;
            left: 43%;
        button{
            border: 1px solid red;
            border-radius: 50%;
            border: none;
            background: transparent;
            width: 50px;
            height: 50px;
            color: transparent;
            svg{
                color: #FFF;
                width: 25px;
                height: 25px;
            }
        }
    }
`

export const ModalContainer = styled.div`
    margin-left: 500px;
    position: relative;
    z-index: 99;

`