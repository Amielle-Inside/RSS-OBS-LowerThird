#!/usr/bin/env bash
# OBS Ticker - Inicializador Linux/macOS
# Uso: ./iniciar_ticker.sh [PORT] [--no-browser]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${1:-8082}"
NO_BROWSER="${2:-false}"

echo "╔══════════════════════════════════════════════════════════╗"
echo "║           🎬 OBS Ticker Server v1.1 (Linux/macOS)        ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║  Diretório: $SCRIPT_DIR"
echo "║  Porta:     $PORT"
echo "║  Config:    http://localhost:$PORT/configurator.html"
echo "║  Ticker:    http://localhost:$PORT/"
echo "║  Health:    http://localhost:$PORT/healthz"
echo "║  RSS Proxy: http://localhost:$PORT/api/rss?url=<URL>"
echo "╚══════════════════════════════════════════════════════════╝"
echo

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado!"
    echo
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Instale com: brew install python3"
    else
        echo "Instale com: sudo apt install python3  # Debian/Ubuntu"
        echo "         ou: sudo dnf install python3  # Fedora"
    fi
    echo
    read -p "Pressione Enter para sair..."
    exit 1
fi

echo "✅ Python3 encontrado: $(python3 --version)"
echo "🚀 Iniciando servidor..."
echo

# Executar servidor
if [[ "$NO_BROWSER" == "--no-browser" ]]; then
    python3 server.py --port "$PORT" --no-browser
else
    python3 server.py --port "$PORT"
fi

echo
echo "👋 Servidor parado."
read -p "Pressione Enter para fechar..."