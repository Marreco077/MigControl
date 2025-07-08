require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/enviar-email', async (req, res) => {
  const { nome, email, cnpj, telefone, produto, meiocontato, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 25,
      secure: false,
      tls: { rejectUnauthorized: false }
    });

  const htmlMessage = `
    <h3>Nova mensagem de contato - MigControl</h3>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>CNPJ:</strong> ${cnpj}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>
    <p><strong>Produto:</strong> ${produto}</p>
    <p><strong>Meio de Contato:</strong> ${meiocontato}</p>
    <p><strong>Mensagem:</strong><br/>${mensagem}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"${nome}" <${process.env.EMAIL_USER}>`,
      to: 'comercial@migcontrol.com.br',
      subject: `Contato via formulário - ${nome}`,
      html: htmlMessage,
    });

    res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ success: false, message: 'Erro ao enviar e-mail.' });
  }
});

// Rota status para confirmar que o servidor está rodando
app.get('/status', (req, res) => {
  res.send('🟢 Node.js está respondendo corretamente!');
});

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Fallback para SPA (Single Page Application)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
