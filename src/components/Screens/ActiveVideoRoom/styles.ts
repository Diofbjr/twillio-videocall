import styled from 'styled-components';

export const FooterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 70px;
    background-color: #101B1E;
    
    padding-right: 14px;
    padding-left: 14px;
    position: absolute;
    .buttons{
        
    }
`

export const ConfigContainer = styled.div`
    position: absolute;
    top: 15px;
    right: 366px;
    width: 40px;
    margin-right: 200px;
    .custom-button-1{
        button{
            background: #d61f1f;
            width: 45px;
            height: 45px;
        }
        button:hover{
            border: 1px solid #d61f1f;
            background: #fff;
            svg{
                color: #d61f1f;
            }
        }
    }
`