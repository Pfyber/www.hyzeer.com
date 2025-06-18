from flask import Flask, send_from_directory, render_template_string
import os

app = Flask(__name__, static_folder='')

@app.route('/')
def index():
    with open('index.html') as f:
        return render_template_string(f.read())

@app.route('/css/<path:filename>')
def css(filename):
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def js(filename):
    return send_from_directory('js', filename)

@app.route('/img/<path:filename>')
def img(filename):
    return send_from_directory('img', filename)

if __name__ == '__main__':
    app.run(debug=True)
