#!/usr/bin/env python3
"""Dev server for the coupld site.

Plain `python3 -m http.server` lets the browser cache index.html, so edits to
the stylesheet or script appear not to apply even after a reload. This sends
no-store on everything so what you see is always what is on disk.

    python3 serve.py [port]        # default 8899
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
    handler = partial(NoCacheHandler, directory=".")
    print(f"coupld dev server on http://localhost:{port}  (no-store, Ctrl+C to stop)")
    ThreadingHTTPServer(("", port), handler).serve_forever()
