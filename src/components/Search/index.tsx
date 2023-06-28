import Image from "next/image";
import {CiSearch} from 'react-icons/ci';
import {AiOutlineBell} from 'react-icons/ai';
import profile from '../../assets/doctor.jpg';

import { Container, SubContainer } from "./styles";



const Search = () =>{
    return(
        <Container>
            <SubContainer>
                <div className="searching">
                    <input placeholder='Pesquisa' type="text"/>
                    <button className="notification"><AiOutlineBell/></button>
                    <button className="profile"><Image src={profile} alt="Perfil"/></button>
                </div>
            </SubContainer>
        </Container>
    )
}

export default Search;