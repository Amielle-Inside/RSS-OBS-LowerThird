@echo off
REM OBS Ticker - Inicializador Windows
REM Uso: clique duas vezes neste arquivo ou execute via cmd

chcp 65001 >nul
cd /d "%~dp0"

echo ╔══════════════════════════════════════════════════════════╗
echo ║           🎬 OBS Ticker Server v1.0 (Windows)           ║
echo ╠══════════════════════════════════════════════════════════╣
echo ║  Diretório: %~dp0                                      ║
echo ║  Porta:     8082                                        ║
echo ║  Config:    http://localhost:8082/configurator.html     ║
echo ║  Ticker:    http://localhost:8082/                      ║
echo ╚══════════════════════════════════════════════════════════╝
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
python server.py --port 8082

echo.
echo 👋 Servidor parado. Pressione qualquer tecla para fechar...
pause >nul