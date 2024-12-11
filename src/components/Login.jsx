import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Login.module.css"; // Importando o CSS Module
import { useNavigate } from "react-router-dom";

function Login() {
    const [usuarios, setUsuarios] = useState("");
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [operacao, setOperacao] = useState("");
    const navigate = useNavigate(); // Inicializa o navigate
    const url = "http://localhost:9082/usuarios/";

    function limparDados() {
        setId("");
        setNome("");
        setEmail("");
        setSenha("");
    }

    function novosDados() {
        setOperacao("criarRegistro");
    }

    function gravarDados() {
        if (nome !== "" && email !== "" && senha !== "") {
            axios
                .get(url) // URL da API
                .then((response) => {
                    const usuariosExistentes = response.data;

                    // Verifica se o e-mail já está em uso
                    const emailJaExiste = usuariosExistentes.some(
                        (usuario) => usuario.email === email
                    );

                    if (emailJaExiste) {
                        alert("O e-mail informado já está em uso. Por favor, use outro e-mail.");
                        return;
                    }

                    // Se o e-mail não estiver em uso, cria o novo registro
                    axios
                        .post(url, {
                            nome: nome,
                            email: email,
                            senha: senha,
                        })
                        .then(() => {
                            navigate("/home"); // Redireciona para /home
                        })
                        .catch((err) => console.error("Erro ao criar o registro:", err));
                })
                .catch((err) => {
                    console.error("Erro ao verificar o e-mail:", err);
                    alert("Este email já esta em uso.");
                });
        } else {
            alert("Preencha todos os campos");
        }
    }

    return (
        <div className={styles.fundo}>
            <div className={styles.container}>
                <h1>Cadastro</h1>
                <p>Crie sua conta.</p>
                <button type="button" onClick={novosDados}>Novo Usuário</button>
                <div className={styles["form-group"]}>
                    <label htmlFor="txtNome">Nome:</label>
                    <input
                        type="text"
                        id="txtNome"
                        name="txtNome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="txtEmail">Email:</label>
                    <input
                        type="email"
                        id="txtEmail"
                        name="txtEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="txtSenha">Senha:</label>
                    <input
                        type="password"
                        id="txtSenha"
                        name="txtSenha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <div className={styles["button-container"]}>
                    <button type="button" onClick={limparDados}>Limpar</button>
                    <button type="button" onClick={gravarDados}>Criar Usuário</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
