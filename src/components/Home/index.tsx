import React from 'react';
import Image from 'next/image';
import router, { useRouter } from "next/router";
import Link from 'next/link';

import { Container, SubContainer } from './styles';
import Logo from '../../assets/Logo.png';



const Inicio = () => {

	return (
		<Container>
			<SubContainer>
				<Image src={Logo} alt='Logo Precision'></Image>
				<h1>Bem-Vindo à Precision Data!</h1>
				<form className='login-form'>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
						type="email"
						id="email"
						value=''
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Senha:</label>
						<input
						type="password"
						id="password"
						value=''
						/>
					</div>
					<Link className='button-1' href={'/home'}>Login</Link>
				</form>

				<div className='or'>
					<hr className='hr-left'/><h2>ou</h2><hr className='hr-right'/>
				</div>

				<div className='others'>
					<button className='button-2'>Login com o google</button>
					<h5 className='text-1'>Você não tem uma conta? <Link href=''>Cadastre-se</Link></h5> 
					<h5 className='text-2'><Link href=''>Esqueceu a senha?</Link></h5>
				</div>
			</SubContainer>
		</Container>
	)
}

export default Inicio;
