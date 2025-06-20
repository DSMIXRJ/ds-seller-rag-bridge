const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/rag/read', async (req, res) => {
  const { nome } = req.body;
  try {
    const response = await axios.get(`https://ds-seller-rag-server.onrender.com/consultar/${nome}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar o RAG', details: err.message });
  }
});

app.post('/rag/write', async (req, res) => {
  const { nome, conteudo, descricao } = req.body;
  try {
    const response = await axios.post('https://ds-seller-rag-server.onrender.com/salvar', {
      nome, conteudo, descricao
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar no RAG', details: err.message });
  }
});

app.listen(3000, () => console.log('RAG Bridge rodando na porta 3000'));
