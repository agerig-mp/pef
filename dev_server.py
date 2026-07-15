#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import mimetypes
import os
import time
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


RELOAD_SNIPPET = """
<script>
(() => {
  const source = new EventSource('/__livereload');
  source.addEventListener('reload', () => window.location.reload());
  source.onerror = () => {
    source.close();
    setTimeout(() => window.location.reload(), 1000);
  };
})();
</script>
""".strip()


class LiveReloadHandler(SimpleHTTPRequestHandler):
    root_dir: Path

    def translate_path(self, path: str) -> str:
      parsed = urlparse(path)
      clean_path = unquote(parsed.path.lstrip("/"))
      local_path = (self.root_dir / clean_path).resolve()

      if self.root_dir not in local_path.parents and local_path != self.root_dir:
          return str(self.root_dir)

      return str(local_path)

    def do_GET(self) -> None:
        if self.path.startswith("/__livereload"):
            self.handle_livereload()
            return

        super().do_GET()

    def list_directory(self, path: str):
        try:
            entries = sorted(os.listdir(path), key=str.lower)
        except OSError:
            self.send_error(HTTPStatus.NOT_FOUND, "No permission to list directory")
            return None

        display_path = html.escape(unquote(self.path))
        lines = [
            "<!doctype html>",
            "<html><head><meta charset='utf-8'><title>Directory listing</title></head><body>",
            f"<h1>Directory listing for {display_path}</h1>",
            "<ul>",
        ]

        for name in entries:
            fullname = os.path.join(path, name)
            suffix = "/" if os.path.isdir(fullname) else ""
            label = html.escape(name + suffix)
            href = html.escape(name + suffix)
            lines.append(f"<li><a href='{href}'>{label}</a></li>")

        lines.append("</ul>" + RELOAD_SNIPPET + "</body></html>")
        encoded = "\n".join(lines).encode("utf-8")

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)
        return None

    def send_head(self):
        path = Path(self.translate_path(self.path))

        if path.is_dir():
            for index_name in ("index.html", "home.html"):
                candidate = path / index_name
                if candidate.exists():
                    path = candidate
                    break
            else:
                return self.list_directory(str(path))

        if not path.exists():
            self.send_error(HTTPStatus.NOT_FOUND, "File not found")
            return None

        content_type = self.guess_type(str(path))

        if path.suffix == ".html":
            data = path.read_text(encoding="utf-8")
            if "</body>" in data:
                data = data.replace("</body>", f"{RELOAD_SNIPPET}\n</body>")
            else:
                data += RELOAD_SNIPPET
            encoded = data.encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(encoded)))
            self.end_headers()
            return self._memory_file(encoded)

        try:
            file_obj = open(path, "rb")
        except OSError:
            self.send_error(HTTPStatus.NOT_FOUND, "File not found")
            return None

        fs = os.fstat(file_obj.fileno())
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(fs.st_size))
        self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        return file_obj

    def guess_type(self, path: str) -> str:
        guessed, _ = mimetypes.guess_type(path)
        return guessed or "application/octet-stream"

    def handle_livereload(self) -> None:
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection", "keep-alive")
        self.end_headers()

        last_snapshot = snapshot_files(self.root_dir)

        try:
            while True:
                time.sleep(0.75)
                current_snapshot = snapshot_files(self.root_dir)

                if current_snapshot != last_snapshot:
                    self.wfile.write(b"event: reload\ndata: changed\n\n")
                    self.wfile.flush()
                    break

                self.wfile.write(b": keepalive\n\n")
                self.wfile.flush()
                last_snapshot = current_snapshot
        except (BrokenPipeError, ConnectionResetError):
            return

    @staticmethod
    def _memory_file(data: bytes):
        from io import BytesIO

        return BytesIO(data)


def snapshot_files(root_dir: Path) -> dict[str, float]:
    snapshot: dict[str, float] = {}

    for path in root_dir.rglob("*"):
        if not path.is_file():
            continue
        if path.name.startswith("."):
            continue
        if ".git" in path.parts:
            continue
        snapshot[str(path.relative_to(root_dir))] = path.stat().st_mtime

    return snapshot


def main() -> None:
    parser = argparse.ArgumentParser(description="Simple hot reload dev server")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=3100)
    parser.add_argument("--root", default=".")
    args = parser.parse_args()

    root_dir = Path(args.root).resolve()
    LiveReloadHandler.root_dir = root_dir

    with ThreadingHTTPServer((args.host, args.port), LiveReloadHandler) as server:
        print(f"Serving {root_dir} at http://{args.host}:{args.port}")
        server.serve_forever()


if __name__ == "__main__":
    main()
