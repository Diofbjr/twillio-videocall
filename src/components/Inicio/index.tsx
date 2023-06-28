import react from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {MdOutlineWatchLater} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg';

import ElementComponent from './consult/index';
import {Container, SubContainer} from './styles';
import doctor from '../../assets/doctor.jpg';


const Inicio = () =>{
    return (
        <Container>
            <SubContainer>
                <div className='title'>
                    <h1>Seja Bem-vindo, João Silva</h1>
                    <h5>Tenha acesso as suas consultas agendadas e acompanhe os registros de seus pacientes </h5>
                </div>
                <div className='consults'>
                    <div className='consult'>
                        <ElementComponent>
                            <h3>Próxima consulta</h3>
                            <h2>Sexta-feira, 5 de Maio</h2>
                            <div className='hour'>
                                <MdOutlineWatchLater/>
                                <h5>11:30 - 12:00 (30min)</h5>
                            </div>
                            <div className='patient'>
                                <CgProfile/>
                                <h5>Paciente: João Silva</h5>
                            </div>
                            <div className='doctor'>
                                <Image src={doctor} alt='Foto da médica(o)'/>
                                <div className="texts">
                                    <h4>Dr. Rebeca Fernanda</h4>
                                    <p>Estomaterapeuta</p>
                                </div>
                            </div>
                            <div className='buttons'>
                                <Link href={'/video-call'} className='button-1'>Entrar em chamada</Link>
                                <button className='button-2'>Detalhes</button>
                            </div>
                        </ElementComponent>
                    </div>
                    <div className='new-consult'>
                        <ElementComponent>
                            <h3>Nova consulta marcada</h3>
                            <h2>Segunda-feira, 8 de Maio</h2>
                            <div className='hour'>
                                <MdOutlineWatchLater/>
                                <h5>14:30 - 15:00 (30min)</h5>
                            </div>
                            <div className='patient'>
                                <CgProfile/>
                                <h5>Paciente: Maria de Lurdes</h5>
                            </div>
                            <div className='doctor'>
                                <Image src={doctor} alt='Foto da médica(o)'/>
                                <div className="texts">
                                    <h4>Dr. Rebeca Fernanda</h4>
                                    <p>Estomaterapeuta</p>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button className='button-1'>Entrar em chamada</button>
                                <button className='button-2'>Detalhes</button>
                            </div>
                        </ElementComponent>
                    </div>
                </div>
                

            </SubContainer>
        </Container>
    )
}

export default Inicio;