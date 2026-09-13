# RSS OBS LowerThird / RSS OBS LowerThird

**[Português](#português) | [English](#english)**

---

## Português

Ticker RSS animado para OBS Studio com configurador visual, funcionando em Linux, Windows e macOS.

---

## English

Animated RSS ticker for OBS Studio with visual configurator, working on Linux, Windows, and macOS.

---

## Sobre este projeto / About this Project

### Português

Esta criadora não é desenvolvedora de software. Este projeto foi desenvolvido com o uso do **Agent Hermes** com o modelo **nvidia/nemotron-3-ultra-550b-a55b:free**.

**Colaboradora**: Amielle (Amielle-Inside)

Baseado no projeto original **OBS_Ticker_v2** de **Derek-G1** (https://github.com/Derek-G1/OBS_Ticker_v2).

### English

This creator is not a software developer. This project was developed using **Agent Hermes** with the **nvidia/nemotron-3-ultra-550b-a55b:free** model.

**Contributor**: Amielle (Amielle-Inside)

Based on the original **OBS_Ticker_v2** project by **Derek-G1** (https://github.com/Derek-G1/OBS_Ticker_v2).

---

## Imagem de exemplo / Example Image

### Português

![Exemplo do RSS OBS LowerThird](exemplo.png)

### English

![RSS OBS LowerThird Example](exemplo.png)

---

## Como funciona / How It Works

### Português

O projeto é composto por três partes principais:

1. **`index.html`** — Página principal do ticker que o OBS carrega como **Browser Source**. Contém a estrutura HTML e carrega o `style.css` e `script.js` gerados.
2. **`configurator.html`** — Interface visual para personalizar o ticker em tempo real. Abra no navegador em `http://localhost:8082/configurator.html`.
3. **`server.py`** — Servidor HTTP Python simples que serve os arquivos e fornece API de proxy RSS (`/api/rss`) para contornar CORS.

#### Fluxo de dados

```
configurator.html → (salva) → style.css + script.js → index.html → OBS Browser Source
                                          ↓
                                    server.py (porta 8082)
                                          ↓
                              /api/rss?url=... (proxy CORS via rss2json)
```

#### O que o configurador gera

- **`style.css`** — Variáveis CSS customizadas (cores, tamanhos, fonte) + `@import` do Google Fonts
- **`script.js`** — Configuração `CONFIG` (velocidade, RSS URL, texto customizado, intervalo de atualização)

### English

The project consists of three main parts:

1. **`index.html`** — Main ticker page that OBS loads as a **Browser Source**. Contains the HTML structure and loads the generated `style.css` and `script.js`.
2. **`configurator.html`** — Visual interface to customize the ticker in real-time. Open in browser at `http://localhost:8082/configurator.html`.
3. **`server.py`** — Simple Python HTTP server that serves files and provides RSS proxy API (`/api/rss`) to bypass CORS.

#### Data Flow

```
configurator.html → (saves) → style.css + script.js → index.html → OBS Browser Source
                                          ↓
                                    server.py (port 8082)
                                          ↓
                              /api/rss?url=... (CORS proxy via rss2json)
```

#### What the Configurator Generates

- **`style.css`** — Custom CSS variables (colors, sizes, font) + Google Fonts `@import`
- **`script.js`** — `CONFIG` configuration (speed, RSS URL, custom text, refresh interval)

---

## Personalizando as Fontes / Customizing Fonts

### Português

#### Fontes pré-definidas (Google Fonts)

O configurador já inclui 8 fontes do Google Fonts prontas para uso:

| Fonte | Estilo | Ideal para |
|-------|--------|------------|
| **Orbitron** | Futurista, tecnológica | Streams de jogos, tech |
| **Rajdhani** | Geométrica, quadrada | Sci-fi, UI moderna |
| **Exo 2** | Tecnológica, versátil | Geral, gaming |
| **Share Tech Mono** | Monoespaçada, técnica | Código, terminal, dados |
| **JetBrains Mono** | Monoespaçada, ligaduras | Programação, dev streams |
| **Fira Code** | Monoespaçada, ligaduras | Código, terminal |
| **Segoe UI** | Sistema (Windows) | UI nativa Windows |
| **Roboto** | Sistema (Android/Chrome) | UI Material, limpa |
| **Inter** | Sistema (moderna) | UI moderna, legível |

> **Importante**: As fontes do Google Fonts são carregadas via `@import` no CSS gerado. O navegador baixa automaticamente quando o ticker carrega. **Requer conexão com internet** na primeira carga.

#### Usando uma fonte Google Fonts personalizada

1. No configurador, vá em **Tipografia** → **Fonte** → selecione **✏️ Personalizada...**
2. No campo **"Nome da fonte customizada"**, digite o nome **exato** da fonte do Google Fonts + fallback, ex:
   ```
   'Space Mono', monospace
   'Poppins', sans-serif
   'Montserrat', sans-serif
   'IBM Plex Sans', sans-serif
   ```
3. O configurador **não adiciona automaticamente o `@import`** para fontes customizadas. Você tem duas opções:

   **Opção A — Edite o `style.css` gerado manualmente:**
   Adicione no topo do arquivo:
   ```css
   @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
   ```

   **Opção B — Use a URL completa no nome da fonte (funciona direto):**
   No campo personalizado, use:
   ```
   'Space Mono', monospace
   ```
   E adicione o `@import` no `style.css` depois de salvar.

#### Encontrando o nome correto da fonte no Google Fonts

1. Acesse https://fonts.google.com/
2. Busque a fonte desejada
3. Clique em **"Select"** → **"@import"** na barra lateral
4. Copie o `family=` da URL, ex: `family=Space+Mono:wght@400;700`
5. O nome CSS é o que vem antes de `:` ou `+` — no caso: `Space Mono`

#### Usando fontes locais (instaladas no sistema)

Digite o nome da fonte exatamente como aparece no sistema + fallback:
```
'Minha Fonte Instalada', sans-serif
```

> **Dica**: No Linux, use `fc-list | grep -i "nome"` para achar o nome exato. No Windows/macOS, verifique no gerenciador de fontes.

#### Pesos (weights) e estilos

O `@import` padrão do configurador carrega apenas `wght@700` (bold) para Orbitron. Para outras fontes/pesos, edite o `@import` no `style.css` gerado:

```css
/* Exemplo: Roboto com pesos 400, 500, 700 */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

/* Exemplo: Montserrat com vários pesos */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap");
```

### English

#### Predefined Fonts (Google Fonts)

The configurator includes 8 Google Fonts ready to use:

| Font | Style | Best for |
|------|-------|----------|
| **Orbitron** | Futuristic, tech | Game streams, tech |
| **Rajdhani** | Geometric, squared | Sci-fi, modern UI |
| **Exo 2** | Tech, versatile | General, gaming |
| **Share Tech Mono** | Monospace, technical | Code, terminal, data |
| **JetBrains Mono** | Monospace, ligatures | Programming, dev streams |
| **Fira Code** | Monospace, ligatures | Code, terminal |
| **Segoe UI** | System (Windows) | Native Windows UI |
| **Roboto** | System (Android/Chrome) | Material UI, clean |
| **Inter** | System (modern) | Modern UI, readable |

> **Important**: Google Fonts are loaded via `@import` in the generated CSS. The browser downloads them automatically when the ticker loads. **Requires internet connection** on first load.

#### Using a Custom Google Font

1. In the configurator, go to **Typography** → **Font** → select **✏️ Custom...**
2. In the **"Custom font name"** field, type the **exact** Google Fonts name + fallback, e.g.:
   ```
   'Space Mono', monospace
   'Poppins', sans-serif
   'Montserrat', sans-serif
   'IBM Plex Sans', sans-serif
   ```
3. The configurator **does not automatically add the `@import`** for custom fonts. You have two options:

   **Option A — Edit the generated `style.css` manually:**
   Add to the top of the file:
   ```css
   @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
   ```

   **Option B — Use the full URL in the font name (works directly):**
   In the custom field, use:
   ```
   'Space Mono', monospace
   ```
   And add the `@import` to `style.css` after saving.

#### Finding the Correct Font Name on Google Fonts

1. Go to https://fonts.google.com/
2. Search for the desired font
3. Click **"Select"** → **"@import"** in the sidebar
4. Copy the `family=` from the URL, e.g.: `family=Space+Mono:wght@400;700`
5. The CSS name is what comes before `:` or `+` — in this case: `Space Mono`

#### Using Local Fonts (Installed on System)

Type the font name exactly as it appears on the system + fallback:
```
'My Installed Font', sans-serif
```

> **Tip**: On Linux, use `fc-list | grep -i "name"` to find the exact name. On Windows/macOS, check the font manager.

#### Weights and Styles

The configurator's default `@import` only loads `wght@700` (bold) for Orbitron. For other fonts/weights, edit the `@import` in the generated `style.css`:

```css
/* Example: Roboto with weights 400, 500, 700 */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

/* Example: Montserrat with multiple weights */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap");
```

---

## Como usar as Google Fonts (guia rápido) / How to Use Google Fonts (Quick Guide)

### Português

#### Passo a passo no configurador

1. Abra `http://localhost:8082/configurator.html`
2. Painel **🔤 Tipografia** → **Fonte**
3. Escolha uma das 9 opções pré-definidas ou **✏️ Personalizada...**
4. Se personalizada: digite `'Nome da Fonte', fallback` (ex: `'Poppins', sans-serif`)
5. Clique **🔄 Aplicar no Preview** para testar
6. Clique **💾 Salvar** → selecione a pasta do projeto
7. No OBS: clique com botão direito na Browser Source → **Refresh cache of current page**

#### Exemplos práticos

| Objetivo | Configuração no campo personalizado | `@import` necessário no style.css |
|----------|--------------------------------------|-----------------------------------|
| Poppins (moderna, limpa) | `'Poppins', sans-serif` | `@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");` |
| Space Mono (mono, retro) | `'Space Mono', monospace` | `@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");` |
| Montserrat (versátil) | `'Montserrat', sans-serif` | `@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");` |
| JetBrains Mono (já incluída) | `'JetBrains Mono', monospace` | **Não** (já no configurador) |

#### Fallback de fontes

Sempre inclua um fallback genérico:
- `sans-serif` — para fontes proporcionais (Roboto, Inter, Poppins)
- `monospace` — para fontes monoespaçadas (JetBrains Mono, Fira Code, Space Mono)
- `serif` — para fontes com serifa (Merriweather, Playfair Display)

Exemplo: `'Merriweather', serif`

#### display=swap (carregamento rápido)

O parâmetro `&display=swap` no `@import` faz o texto aparecer com a fonte do sistema imediatamente e trocar pela Google Font quando carregar — evita "flash of invisible text" (FOIT).

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");
```

### English

#### Step-by-step in the configurator

1. Open `http://localhost:8082/configurator.html`
2. Panel **🔤 Typography** → **Font**
3. Choose one of the 9 predefined options or **✏️ Custom...**
4. If custom: type `'Font Name', fallback` (e.g.: `'Poppins', sans-serif`)
5. Click **🔄 Apply to Preview** to test
6. Click **💾 Save** → select the project folder
7. In OBS: right-click Browser Source → **Refresh cache of current page**

#### Practical Examples

| Goal | Custom field configuration | Required `@import` in style.css |
|------|----------------------------|-----------------------------------|
| Poppins (modern, clean) | `'Poppins', sans-serif` | `@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");` |
| Space Mono (mono, retro) | `'Space Mono', monospace` | `@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");` |
| Montserrat (versatile) | `'Montserrat', sans-serif` | `@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");` |
| JetBrains Mono (already included) | `'JetBrains Mono', monospace` | **No** (already in configurator) |

#### Font Fallbacks

Always include a generic fallback:
- `sans-serif` — for proportional fonts (Roboto, Inter, Poppins)
- `monospace` — for monospace fonts (JetBrains Mono, Fira Code, Space Mono)
- `serif` — for serif fonts (Merriweather, Playfair Display)

Example: `'Merriweather', serif`

#### display=swap (fast loading)

The `&display=swap` parameter in `@import` makes text appear with the system font immediately and swap to the Google Font when loaded — avoids "flash of invisible text" (FOIT).

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");
```

---

## Instalação por plataforma / Installation by Platform

### Linux

#### Português

##### Requisitos
- Python 3.6 ou superior
- systemd (para instalação como serviço, opcional)

##### Instalação rápida (teste)

```bash
# 1. Baixe ou clone o repositório
git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git
cd RSS-OBS-LowerThird

# 2. Dê permissão de execução ao script
chmod +x iniciar_ticker.sh

# 3. Execute
./iniciar_ticker.sh
```

##### Instalação como serviço (produção - inicia automaticamente no login)

```bash
# 1. Baixe ou clone o repositório
git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git
cd RSS-OBS-LowerThird

# 2. Copie o arquivo de serviço para a pasta do systemd do usuário
mkdir -p ~/.config/systemd/user
cp obs-ticker-server.service ~/.config/systemd/user/

# 3. Recarregue o systemd e ative o serviço
systemctl --user daemon-reload
systemctl --user enable --now obs-ticker-server.service
```

##### Verificar se está funcionando

```bash
# Ver status do serviço
systemctl --user status obs-ticker-server.service

# Ver logs em tempo real
journalctl --user -u obs-ticker-server.service -f

# Testar se o servidor responde
curl -s http://localhost:8082/ | head -5
```

##### Parar ou remover o serviço

```bash
# Parar e desativar
systemctl --user disable --now obs-ticker-server.service

# Remover arquivo de serviço
rm ~/.config/systemd/user/obs-ticker-server.service
systemctl --user daemon-reload
```

#### English

##### Requirements
- Python 3.6 or higher
- systemd (for service installation, optional)

##### Quick Installation (test)

```bash
# 1. Download or clone the repository
git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git
cd RSS-OBS-LowerThird

# 2. Give execute permission to the script
chmod +x iniciar_ticker.sh

# 3. Run
./iniciar_ticker.sh
```

##### Service Installation (production - starts automatically on login)

```bash
# 1. Download or clone the repository
git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git
cd RSS-OBS-LowerThird

# 2. Copy the service file to the user's systemd folder
mkdir -p ~/.config/systemd/user
cp obs-ticker-server.service ~/.config/systemd/user/

# 3. Reload systemd and enable the service
systemctl --user daemon-reload
systemctl --user enable --now obs-ticker-server.service
```

##### Verify It's Working

```bash
# Check service status
systemctl --user status obs-ticker-server.service

# View real-time logs
journalctl --user -u obs-ticker-server.service -f

# Test if server responds
curl -s http://localhost:8082/ | head -5
```

##### Stop or Remove the Service

```bash
# Stop and disable
systemctl --user disable --now obs-ticker-server.service

# Remove service file
rm ~/.config/systemd/user/obs-ticker-server.service
systemctl --user daemon-reload
```

---

### Windows

#### Português

##### Requisitos
- Python 3.6 ou superior
- **Importante**: Durante a instalação do Python, marque a opção **"Add Python to PATH"**

##### Instalação

1. Baixe o repositório:
   - Opção A: Clique em "Code" > "Download ZIP" no GitHub e extraia
   - Opção B: Use Git: `git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git`

2. Abra a pasta `RSS-OBS-LowerThird`

3. **Duplo clique** no arquivo `iniciar_ticker.bat`

   Ou, se preferir pelo prompt de comando:
   ```cmd
   cd C:\caminho\para\RSS-OBS-LowerThird
   python server.py --port 8082
   ```

##### Verificar se está funcionando

- Abra o navegador e acesse: `http://localhost:8082/configurator.html`
- Deve abrir o configurador visual

#### English

##### Requirements
- Python 3.6 or higher
- **Important**: During Python installation, check the **"Add Python to PATH"** option

##### Installation

1. Download the repository:
   - Option A: Click "Code" > "Download ZIP" on GitHub and extract
   - Option B: Use Git: `git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git`

2. Open the `RSS-OBS-LowerThird` folder

3. **Double-click** the `iniciar_ticker.bat` file

   Or, if you prefer command prompt:
   ```cmd
   cd C:\path\to\RSS-OBS-LowerThird
   python server.py --port 8082
   ```

##### Verify It's Working

- Open browser and go to: `http://localhost:8082/configurator.html`
- The visual configurator should open

---

### macOS

#### Português

##### Requisitos
- Python 3.6 ou superior
- Instale com Homebrew: `brew install python3`

##### Instalação

1. Baixe o repositório:
   - Opção A: Clique em "Code" > "Download ZIP" no GitHub e extraia
   - Opção B: Use Git: `git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git`

2. Abra o Terminal e vá até a pasta:
   ```bash
   cd ~/caminho/para/RSS-OBS-LowerThird
   ```

3. Dê permissão de execução e rode:
   ```bash
   chmod +x iniciar_ticker.command
   ./iniciar_ticker.command
   ```

   Ou clique duas vezes no arquivo `iniciar_ticker.command` no Finder (após dar permissão com `chmod +x`).

#### English

##### Requirements
- Python 3.6 or higher
- Install with Homebrew: `brew install python3`

##### Installation

1. Download the repository:
   - Option A: Click "Code" > "Download ZIP" on GitHub and extract
   - Option B: Use Git: `git clone https://github.com/Amielle-Inside/RSS-OBS-LowerThird.git`

2. Open Terminal and go to the folder:
   ```bash
   cd ~/path/to/RSS-OBS-LowerThird
   ```

3. Give execute permission and run:
   ```bash
   chmod +x iniciar_ticker.command
   ./iniciar_ticker.command
   ```

   Or double-click the `iniciar_ticker.command` file in Finder (after giving permission with `chmod +x`).

---

## Como usar / How to Use

### Português

#### 1. Acesse o configurador visual

Abra no navegador: **http://localhost:8082/configurator.html**

#### 2. Personalize o ticker

No configurador você pode ajustar:

- **Paleta de Cores**: Cores do texto, bullets, brilho e borda com controle de transparência
- **Fundo**: Sólido, gradiente linear, radial ou cônico
- **Bordas**: Largura, arredondamento, 5 presets (quadrado a circular), estilos
- **Tipografia**: 8 fontes do Google Fonts + personalizada, tamanho, peso, espaçamento, sombra
- **Comportamento**: Velocidade, duração mínima, direção (esquerda/direita), pausa ao passar mouse, intervalo de atualização do RSS
- **Preview**: Visualização ao vivo que não reinicia a animação

#### 3. Salve as alterações

Clique no botão **Salvar** (ícone de disquete) e selecione a pasta `RSS-OBS-LowerThird`.

#### 4. Configure no OBS Studio

1. No OBS: **Adicionar Fonte** > **Browser Source** (Navegador)
2. **Desmarque** "Arquivo local" (Local file)
3. **URL**: `http://localhost:8082/`
4. **Largura**: 1920 (ou a largura do seu canvas)
5. **Altura**: 150 a 220 (ajuste conforme necessário)
6. **FPS**: 60
7. Clique em OK

#### 5. Atualize o cache após mudanças

Sempre que mudar algo no configurador:
- Botão direito na fonte Browser Source no OBS
- **Propriedades**
- **Refresh cache of current page** (Atualizar cache da página atual)

### English

#### 1. Access the Visual Configurator

Open in browser: **http://localhost:8082/configurator.html**

#### 2. Customize the Ticker

In the configurator you can adjust:

- **Color Palette**: Text colors, bullets, glow, and border with transparency control
- **Background**: Solid, linear gradient, radial, or conic
- **Borders**: Width, rounding, 5 presets (square to circular), styles
- **Typography**: 8 Google Fonts + custom, size, weight, spacing, shadow
- **Behavior**: Speed, minimum duration, direction (left/right), pause on hover, RSS refresh interval
- **Preview**: Live preview that doesn't restart animation

#### 3. Save Changes

Click the **Save** button (floppy disk icon) and select the `RSS-OBS-LowerThird` folder.

#### 4. Configure in OBS Studio

1. In OBS: **Add Source** > **Browser Source**
2. **Uncheck** "Local file"
3. **URL**: `http://localhost:8082/`
4. **Width**: 1920 (or your canvas width)
5. **Height**: 150 to 220 (adjust as needed)
6. **FPS**: 60
7. Click OK

#### 5. Refresh Cache After Changes

Whenever you change something in the configurator:
- Right-click the Browser Source in OBS
- **Properties**
- **Refresh cache of current page**

---

## Configurar o feed RSS / Configure RSS Feed

### Português

O feed padrão é: `https://www.newsinside.org/feed/`

#### Pelo configurador visual

1. Abra `http://localhost:8082/configurator.html`
2. Vá no painel **Comportamento**
3. Altere o campo **URL do RSS**
4. Salve

#### Editando o arquivo diretamente

Edite `script.js` e altere:
```javascript
const CONFIG = {
    rssUrl: "https://SEU_FEED_AQUI/feed/",
    // ... outras configurações
};
```

> **Nota**: O projeto usa o serviço **rss2json.com** como proxy CORS (gratuito, sem chave). Funciona com qualquer feed RSS público.

### English

The default feed is: `https://www.newsinside.org/feed/`

#### Via Visual Configurator

1. Open `http://localhost:8082/configurator.html`
2. Go to the **Behavior** panel
3. Change the **RSS URL** field
4. Save

#### Editing the File Directly

Edit `script.js` and change:
```javascript
const CONFIG = {
    rssUrl: "https://YOUR_FEED_HERE/feed/",
    // ... other settings
};
```

> **Note**: The project uses **rss2json.com** as a CORS proxy (free, no key required). Works with any public RSS feed.

---

## Estrutura de arquivos / File Structure

### Português

```
RSS-OBS-LowerThird/
├── index.html                 # Ticker principal (OBS aponta aqui)
├── configurator.html          # Configurador visual (abra no navegador)
├── script.js                  # Lógica do ticker + configurações
├── style.css                  # Estilos (gerado pelo configurador)
├── server.py                  # Servidor HTTP Python (multiplataforma)
├── iniciar_ticker.sh          # Inicializador Linux
├── iniciar_ticker.bat         # Inicializador Windows
├── iniciar_ticker.command     # Inicializador macOS (duplo clique)
├── obs-ticker-server.service  # Serviço systemd (Linux)
├── exemplo.png                # Imagem de exemplo
└── README.md                  # Este arquivo
```

### English

```
RSS-OBS-LowerThird/
├── index.html                 # Main ticker (OBS points here)
├── configurator.html          # Visual configurator (open in browser)
├── script.js                  # Ticker logic + configuration
├── style.css                  # Styles (generated by configurator)
├── server.py                  # Python HTTP server (cross-platform)
├── iniciar_ticker.sh          # Linux launcher
├── iniciar_ticker.bat         # Windows launcher
├── iniciar_ticker.command     # macOS launcher (double-click)
├── obs-ticker-server.service  # systemd service (Linux)
├── exemplo.png                # Example image
└── README.md                  # This file
```

---

## Solução de problemas / Troubleshooting

### Português

| Sintoma | Causa | Solução |
|---------|-------|---------|
| "Error loading news feed" | Falha ao buscar RSS | Verifique `systemctl --user status obs-ticker-server` (Linux) ou console do navegador (F12) |
| Porta 8080 em uso | Steam ou outro app | Use porta 8082 (padrão) ou altere no comando/serviço |
| Feed não atualiza | Cache do OBS | Botão direito na fonte > Propriedades > Refresh cache of current page |
| Erro CORS | Usando `file://` | **Sempre use HTTP**: `http://localhost:8082/` |
| Cores invertidas | Extensão Dark Reader | Desative a extensão; o configurador tem proteção em 5 camadas |
| Fonte não carrega | Google Fonts bloqueado | Verifique conexão; há fallback para fontes do sistema |

### English

| Symptom | Cause | Solution |
|---------|-------|----------|
| "Error loading news feed" | RSS fetch failed | Check `systemctl --user status obs-ticker-server` (Linux) or browser console (F12) |
| Port 8080 in use | Steam or other app | Use port 8082 (default) or change in command/service |
| Feed doesn't update | OBS cache | Right-click source > Properties > Refresh cache of current page |
| CORS error | Using `file://` | **Always use HTTP**: `http://localhost:8082/` |
| Inverted colors | Dark Reader extension | Disable extension; configurator has 5-layer protection |
| Font doesn't load | Google Fonts blocked | Check connection; system font fallback available |

---

## Créditos / Credits

### Português
- **Projeto original**: [OBS_Ticker_v2](https://github.com/Derek-G1/OBS_Ticker_v2) por **Derek-G1** (MIT License)
- **Proxy RSS**: [rss2json.com](https://rss2json.com/) - API gratuita para contornar CORS
- **Fontes**: Google Fonts (Orbitron, Rajdhani, Exo 2, Share Tech Mono, JetBrains Mono, Fira Code, Roboto, Inter)

### English
- **Original Project**: [OBS_Ticker_v2](https://github.com/Derek-G1/OBS_Ticker_v2) by **Derek-G1** (MIT License)
- **RSS Proxy**: [rss2json.com](https://rss2json.com/) - Free API to bypass CORS
- **Fonts**: Google Fonts (Orbitron, Rajdhani, Exo 2, Share Tech Mono, JetBrains Mono, Fira Code, Roboto, Inter)

---

## Suporte / Support

### Português
- **Issues no GitHub**: https://github.com/Amielle-Inside/RSS-OBS-LowerThird/issues
- **Telegram**: https://t.me/newsinsidechat

### English
- **GitHub Issues**: https://github.com/Amielle-Inside/RSS-OBS-LowerThird/issues
- **Telegram**: https://t.me/newsinsidechat

---

## Licença / License

### Português
MIT - Baseado no [OBS_Ticker_v2](https://github.com/Derek-G1/OBS_Ticker_v2) por Derek-G1.

### English
MIT - Based on [OBS_Ticker_v2](https://github.com/Derek-G1/OBS_Ticker_v2) by Derek-G1.