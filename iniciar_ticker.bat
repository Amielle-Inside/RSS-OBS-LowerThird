@echo off
REM OBS Ticker - Inicializador Windows
REM Uso: clique duas vezes neste arquivo ou execute via cmd [PORT] [--no-browser]

chcp 65001 >nul
cd /d "%~dp0"

set PORT=8082
set NO_BROWSER=false

if not "%~1"=="" set PORT=%~1
if "%~2"=="--no-browser" set NO_BROWSER=true

echo ╔══════════════════════════════════════════════════════════╗
echo ║           🎬 OBS Ticker Server v1.1 (Windows)           ║
echo ╠══════════════════════════════════════════════════════════╣
echo ║  Diretório: %~dp0                                      ║
echo ║  Porta:     %PORT%                                        ║
echo ║  Config:    http://localhost:%PORT%/configurator.html     ║
echo ║  Ticker:    http://localhost:%PORT%/                      ║
echo ║  Health:    http://localhost:%PORT%/healthz               ║
echo ║  RSS Proxy: http://localhost:%PORT%/api/rss?url^=<URL>    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python não encontrado!
    echo.
    echo Instale Python em: https://python.org/downloads/
    echo Marque "Add Python to PATH" durante a instalação.
    echo.
    pause
    exit /b 1
)

echo ✅ Python encontrado
echo 🚀 Iniciando servidor...
echo.

REM Iniciar servidor (não fecha a janela se der erro)
if "%NO_BROWSER%"=="true" (
    python server.py --port %PORT% --no-browser
) else (
    python server.py --port %PORT%
)

echo.
echo 👋 Servidor parado. Pressione qualquer tecla para fechar...
pause >nul