#!/usr/bin/env bash
# OBS Ticker - Inicializador macOS (clique duplo no Finder)
# Para permitir execução: chmod +x iniciar_ticker.command
# Uso: ./iniciar_ticker.command [PORT]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${1:-8082}"

echo "╔══════════════════════════════════════════════════════════╗"
echo "║           🎬 OBS Ticker Server v1.1 (macOS)              ║"
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
    echo "Instale com: brew install python3"
    echo
    read -p "Pressione Enter para sair..."
    exit 1
fi

echo "✅ Python3 encontrado: $(python3 --version)"
echo "🚀 Iniciando servidor..."
echo

# Executar servidor
python3 server.py --port "$PORT"

echo
echo "👋 Servidor parado."
read -p "Pressione Enter para fechar..."