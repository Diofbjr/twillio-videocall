import Image from "next/image";
import {IoMdArrowBack} from 'react-icons/io'
import {BsHouse, BsClipboardPlus} from 'react-icons/bs';
import {RxCalendar} from 'react-icons/rx';
import {AiOutlineSetting} from 'react-icons/ai';
import {MdOutlineExitToApp} from 'react-icons/md';

import { Container, SubContainer } from "./styles";
import Logo from "../../assets/Logo.png";



const Navbar = () =>{
    return(
        <Container>
            <SubContainer>
                <div className="header">
                    <Image src={Logo} alt="Logo Precision Data"/>
                    <button><IoMdArrowBack/></button>
                </div>
                <div className="navegation">
                    <button><BsHouse/><p>Home</p></button>
                    <button><RxCalendar/><p>Agendamento</p></button>
                    <button><BsClipboardPlus/><p>Exames</p></button>
                    <div className="settings">
                    <button className="set"><AiOutlineSetting/><p>Configurações</p></button>
                    <button className="exit"><MdOutlineExitToApp/><p>Sair</p></button>
                    </div>
                </div>
            </SubContainer>
        </Container>
    )
}

export default Navbar;