# 💰 Price Alert Crypto

Aplicação web desenvolvida como exercício avaliativo da disciplina **Desenvolvimento de Sistemas** do curso de **Engenharia de Computação** do CEFET-MG – Unidade Timóteo.

Este sistema complementa a plataforma **[OdinLine](http://www.odiloncorrea.com/odinline)**, permitindo que usuários monitorem o preço de **criptomoedas** registradas em seus catálogos, recebam notificações ou realizem compras automaticamente quando o valor desejado for atingido.

🔗 **Acesse o site publicado:**  
👉 [https://price-alert-crypto.netlify.app/](https://price-alert-crypto.netlify.app/)

🧑 **Login no Price Alert Crypto:**  
- **Usuário:** `danilo`  
- **Senha:** `robson`

---

## 🚀 Funcionalidades

### 🔐 Autenticação de Usuário
Acesso restrito a usuários já cadastrados na plataforma OdinLine, com autenticação via API.

### 📋 Menu de Acesso
Após login, o usuário acessa o menu com as seguintes opções:
- **Alerta de Preço**
- **Minhas Compras**

### 📉 Alerta de Preço
Permite cadastrar alertas para criptomoedas do catálogo do usuário, especificando:
- Produto (criptomoeda)
- Valor desejado
- Ação: **Notificar** ou **Comprar**

O sistema:
- Monitora os preços automaticamente
- Executa a ação escolhida quando o valor alvo for atingido
- Remove o alerta após execução

### 🛒 Minhas Compras
Exibe uma lista local com os dados das compras realizadas automaticamente pela aplicação.

---

## 🧰 Tecnologias Utilizadas

- **HTML, CSS, JavaScript**
- **Integração com API REST** da OdinLine
- **Armazenamento Local (LocalStorage)**
- **Responsividade** para dispositivos móveis e desktops
- **Hospedagem via Netlify**
- **Controle de versão com Git e GitHub**

---

## ✅ Requisitos Atendidos

- [x] Autenticação de usuário via API
- [x] Menu de navegação funcional
- [x] Cadastro e execução de alertas de preço
- [x] Registro local de compras
- [x] Interface responsiva
- [x] Aplicação hospedada online
- [x] Repositório GitHub