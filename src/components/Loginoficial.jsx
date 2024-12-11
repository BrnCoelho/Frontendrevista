import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Loginoficial.module.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const url = "http://localhost:9082/usuarios"; // Substitua pela URL correta da sua API

    const validarLogin = async () => {
        try {
            // Fazendo a requisição para verificar o usuário
            const response = await fetch(url);
            const data = await response.json();

            // Verifica se email e senha existem no banco de dados
            const usuarioValido = data.find(
                (usuario) => usuario.email === email && usuario.senha === senha
            );

            if (usuarioValido) {
                // Credenciais válidas: Redireciona para /home
                navigate('/home');
            } else {
                // Credenciais inválidas: Mostra um alerta
                alert("Conta inválida! Verifique o email e a senha.");
            }
        } catch (error) {
            console.error("Erro ao verificar o login:", error);
            alert("Erro ao tentar fazer o login. Tente novamente mais tarde.");
        }
    };

    return (
        <div className={styles.fundo}> {/* Container principal */}
            <div className={styles.quadrado}> {/* Quadrado centralizado */}
                <h1>Login</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validarLogin();
                    }}
                >
                    <div className={styles['form-group']}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
