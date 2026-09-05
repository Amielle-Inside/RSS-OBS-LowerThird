#!/usr/bin/env python3
"""
OBS Ticker HTTP Server - Cross-platform wrapper
Works on Linux, Windows, macOS
Usage: python server.py [--port PORT] [--no-browser]
"""
import argparse
import http.server
import json
import os
import socketserver
import sys
import threading
import time
import urllib.error
import urllib.request
import webbrowser
from pathlib import Path
from urllib.parse import urlencode, urlparse

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Serve from the directory where this script lives
        super().__init__(*args, directory=str(Path(__file__).parent), **kwargs)
    
    def end_headers(self):
        # Enable CORS for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Quieter logging - only errors
        if args[1].startswith('4') or args[1].startswith('5'):
            super().log_message(format, *args)

    def do_GET(self):
        # Health check endpoint
        if self.path == '/healthz':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "service": "obs-ticker"}).encode())
            return
        
        # RSS proxy endpoint
        if self.path.startswith('/api/rss'):
            self.handle_rss_proxy()
            return
        
        super().do_GET()
    
    def handle_rss_proxy(self):
        """Proxy RSS feed to bypass CORS"""
        try:
            # Parse query params
            parsed = urlparse(self.path)
            query = {}
            if parsed.query:
                for pair in parsed.query.split('&'):
                    if '=' in pair:
                        k, v = pair.split('=', 1)
                        query[k] = v
            
            rss_url = query.get('url')
            if not rss_url:
                self.send_error(400, "Missing 'url' parameter")
                return
            
            # Validate URL
            parsed_url = urlparse(rss_url)
            if not parsed_url.scheme or not parsed_url.netloc:
                self.send_error(400, "Invalid RSS URL")
                return
            
            # Fetch RSS feed
            req = urllib.request.Request(rss_url, headers={'User-Agent': 'OBS-Ticker/1.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                content = response.read()
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/xml; charset=utf-8')
            self.send_header('Cache-Control', 'public, max-age=300')
            self.end_headers()
            self.wfile.write(content)
            
        except urllib.error.HTTPError as e:
            self.send_error(e.code, f"RSS feed error: {e.reason}")
        except Exception as e:
            self.send_error(500, f"Proxy error: {str(e)}")

def open_browser(port, delay=1.5):
    """Open configurator in browser after server starts"""
    time.sleep(delay)
    url = f"http://localhost:{port}/configurator.html"
    print(f"\n🌐 Abrindo configurador: {url}")
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"⚠️  Não foi possível abrir o navegador automaticamente: {e}")
        print(f"   Abra manualmente: {url}")

def main():
    parser = argparse.ArgumentParser(description="OBS Ticker HTTP Server")
    parser.add_argument("--port", "-p", type=int, default=8082, help="Porta do servidor (padrão: 8082)")
    parser.add_argument("--no-browser", action="store_true", help="Não abrir navegador automaticamente")
    parser.add_argument("--host", default="localhost", help="Host para bind (padrão: localhost)")
    args = parser.parse_args()

    os.chdir(Path(__file__).parent)
    
    print(f"""
╔══════════════════════════════════════════════════════════╗
║           🎬 OBS Ticker Server v1.1                      ║
╠══════════════════════════════════════════════════════════╣
║  Diretório: {str(Path(__file__).parent):<45} ║
║  Porta:     {args.port:<45} ║
║  Host:      {args.host:<45} ║
║  Config:    http://{args.host}:{args.port}/configurator.html{' ' * (35 - len(str(args.port)))}║
║  Ticker:    http://{args.host}:{args.port}/{' ' * (45 - len(str(args.port)))}║
║  Health:    http://{args.host}:{args.port}/healthz{' ' * (38 - len(str(args.port)))}║
║  RSS Proxy: http://{args.host}:{args.port}/api/rss?url=<URL>{' ' * (19 - len(str(args.port)))}║
╚══════════════════════════════════════════════════════════╝
""")

    if not args.no_browser:
        threading.Thread(target=open_browser, args=(args.port,), daemon=True).start()

    with socketserver.TCPServer((args.host, args.port), Handler) as httpd:
        print(f"✅ Servidor rodando em http://{args.host}:{args.port}/")
        print("   Pressione Ctrl+C para parar\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Servidor parado")

if __name__ == "__main__":
    main()