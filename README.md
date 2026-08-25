# OBS Ticker v2 - Configuração Cross-Platform

Ticker RSS animado para OBS Studio com configurador visual, funcionando em **Linux, Windows e macOS**.

## 🚀 Início Rápido

### Linux / macOS
```bash
# Opção 1: Script executável (recomendado)
cd /run/media/system/Geral/apps/OBS/rss/OBS_Ticker_v2
chmod +x iniciar_ticker.sh
./iniciar_ticker.sh

# Opção 2: Python direto
python3 server.py --port 8082
```

### Windows
```cmd
REM Opção 1: Clique duas vezes no arquivo
iniciar_ticker.bat

REM Opção 2: Prompt de comando
cd C:\caminho\para\OBS_Ticker_v2
python server.py --port 8082
```

### Acessar
- **Configurador Visual**: http://localhost:8082/configurator.html
- **Ticker para OBS**: http://localhost:8082/

---

## ⚙️ Linux: Systemd User Service (Produção)

Para rodar **automaticamente no login**, com **reinício automático** e **logs centralizados**:

### Instalação única
```bash
# 1. Copiar service file
cp /run/media/system/Geral/apps/OBS/rss/OBS_Ticker_v2/obs-ticker-server.service \
   ~/.config/systemd/user/

# 2. Recarregar e ativar
systemctl --user daemon-reload
systemctl --user enable --now obs-ticker-server.service
```

### Verificação
```bash
# Status do serviço
systemctl --user status obs-ticker-server.service

# Logs em tempo real
journalctl --user -u obs-ticker-server.service -f

# Testar se responde
curl -s http://localhost:8082/ | head -3
```

### Desinstalação
```bash
systemctl --user disable --now obs-ticker-server.service
rm ~/.config/systemd/user/obs-ticker-server.service
systemctl --user daemon-reload
```

---

## 🎛️ Configurador Visual

Abra **http://localhost:8082/configurator.html** no navegador para personalizar:

| Painel | Controles |
|--------|-----------|
| **Paleta de Cores** | Cores dinâmicas com alpha, organizadas por papel (texto, bullets, glow, borda) |
| **Fundo** | Sólido, Gradiente Linear/Radial/Cônico, alpha por parada |
| **Bordas** | Largura, raio, 5 presets (quadrado→circular), estilos (sólido/tracejado/gradiente) |
| **Tipografia** | 8 Google Fonts + custom, tamanho/peso/spacing/sombra |
| **Comportamento** | Velocidade, duração mínima, direção (RTL/LTR), pause-on-hover, intervalo RSS |
| **Preview** | Live preview sticky que não reinicia a animação RSS |

**Salvar**: Clique 💾 **Salvar** → escolha a pasta `OBS_Ticker_v2` → OBS: *Refresh cache*

---

## 📡 Configuração OBS Studio

1. **Adicionar Fonte** → **Browser Source**
2. **Desmarcar** "Local file"
3. **URL**: `http://localhost:8082/`
4. **Largura**: 1920 (ou largura do canvas)
5. **Altura**: 150-220 (ajuste conforme necessário)
6. **FPS**: 60
7. Após mudanças no configurador: **Botão direito na fonte** → **Propriedades** → **Refresh cache of current page**

---

## 🔧 RSS Feed

**Atual**: `https://www.newsinside.org/feed/` (configurado no `script.js`)

Para alterar:
1. Abra o **Configurador Visual** → painel *Comportamento* → *URL do RSS*
2. Ou edite `script.js` diretamente:
   ```javascript
   const CONFIG = {
       rssUrl: "https://SEU_FEED_AQUI/feed/",
       // ...
   };
   ```

> **Nota**: Usa **rss2json.com** como proxy CORS (grátis, sem chave). Funciona com qualquer feed RSS público.

---

## 📁 Estrutura de Arquivos

```
OBS_Ticker_v2/
├── index.html              # Ticker principal (OBS aponta aqui)
├── configurator.html       # Configurador visual (abra no navegador)
├── script.js               # Lógica do ticker + CONFIG
├── style.css               # Estilos (gerado pelo configurador)
├── server.py               # Servidor HTTP Python (cross-platform)
├── iniciar_ticker.sh       # Launcher Linux/macOS
├── iniciar_ticker.bat      # Launcher Windows
├── iniciar_ticker.command  # Launcher macOS (clique duplo)
├── obs-ticker-server.service  # systemd user service (Linux)
└── README.md               # Este arquivo
```

---

## 🐛 Solução de Problemas

| Sintoma | Causa | Solução |
|---------|-------|---------|
| "Error loading news feed" | RSS falhou | Verifique `systemctl --user status obs-ticker-server` (Linux) ou console do navegador |
| Porta 8080 em uso | Steam/outro app | Use porta 8082 (padrão) ou outra |
| Feed não atualiza | Cache OBS | *Refresh cache of current page* nas propriedades da fonte |
| Erro CORS | Usando `file://` | **Sempre use HTTP**: `http://localhost:8082/` |
| Cores invertidas | Dark Reader | Configurador tem 5 camadas de proteção; desative extensão se persistir |
| Fonte não carrega | Google Fonts bloqueado | Verifique conexão; configurador tem fallback |

---

## 📦 Requisitos

| Plataforma | Requisitos |
|------------|------------|
| **Linux** | Python 3.6+, systemd (para service) |
| **Windows** | Python 3.6+ (marcar "Add to PATH") |
| **macOS** | Python 3.6+ (`brew install python3`) |

---

## 🔗 Referências

- **Repositório original**: https://github.com/Derek-G1/OBS_Ticker_v2
- **rss2json API**: https://rss2json.com/
- **OBS Browser Source docs**: https://obsproject.com/wiki/Browser-Source

---

## 📝 Licença

MIT - Baseado em [OBS_Ticker_v2](https://github.com/Derek-G1/OBS_Ticker_v2) por Derek-G1.