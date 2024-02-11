const vscode = require("vscode");
const data = require("./assets/data");
const path = require("path");

const docs = {
  boring: "https://docs.sailscasts.com/boring-stack/getting-started",
  sails: "https://sailsjs.com/documentation/concepts",
};

/**
 * @param {vscode.ExtensionContext} context
 */

class Provider {
  provideHover(document, position) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = wordRange ? document.getText(wordRange) : "";
    const info = data[word] || "";
    const md = new vscode.MarkdownString(info);
    return new vscode.Hover(md);
  }
}

function activate(context) {
  let currentPanel = undefined;
  let sailsPanel = undefined;

  const panelOptions = {
    enableScripts: true,
    retainContextWhenHidden: true,
  };

  context.subscriptions.push(
    vscode.commands.registerCommand("boringdocs.tbjs", function () {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (currentPanel) {
        currentPanel.reveal(columnToShowIn);
      } else {
        currentPanel = vscode.window.createWebviewPanel(
          "boringdocs",
          "Boring Stack Docs",
          columnToShowIn || vscode.ViewColumn.One,
          panelOptions
        );
      }

      currentPanel.webview.html = getWebContent("boring");
      currentPanel.iconPath = vscode.Uri.joinPath(
        context.extensionUri,
        "assets",
        "boring.png"
      );
      currentPanel.onDidDispose(
        () => {
          currentPanel = undefined;
        },
        null,
        context.subscriptions
      );

      vscode.window.showInformationMessage(
        "You are now viewing the boring docs"
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("boringdocs.sails", function () {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (sailsPanel) {
        sailsPanel.reveal(columnToShowIn);
      } else {
        sailsPanel = vscode.window.createWebviewPanel(
          "boringdocs",
          "Sailsjs Docs",
          columnToShowIn || vscode.ViewColumn.One,
          panelOptions
        );
      }

      sailsPanel.webview.html = getWebContent("sails", "white");
      sailsPanel.iconPath = vscode.Uri.joinPath(
        context.extensionUri,
        "assets",
        "sails.png"
      );
      sailsPanel.onDidDispose(
        () => {
          sailsPanel = undefined;
        },
        null,
        context.subscriptions
      );

      vscode.window.showInformationMessage(
        "You are now viewing the sails docs"
      );
    })
  );

  context.subscriptions.push(
    vscode.languages.registerHoverProvider("javascript", new Provider())
  );
}

function deactivate() {}

function getWebContent(doc, color) {
  return ` <!DOCTYPE html>
    <html lang="en">
    <body style="width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;">
		    <iframe
      src="${docs[doc]}"
	  id="myIframe"
      frameborder="0"
      style="width:100vw; height:100vh; margin:0; padding:0; background:${color}" 
    ></iframe>
	<script>
          // Function to cache content in localStorage
          function cacheContent() {
            const iframe = document.getElementById('myIframe');
            const cachedContent = iframe.contentDocument.body.innerHTML;
            localStorage.setItem('cachedContent', cachedContent);
          }

          // Load cached content if available
          window.onload = function() {
            const cachedContent = localStorage.getItem('cachedContent');
            if (cachedContent) {
              const iframe = document.getElementById('myIframe');
              iframe.contentDocument.body.innerHTML = cachedContent;
            }
          };
        </script>
    </body>
    </html>`;
}

module.exports = {
  activate,
  deactivate,
  Provider,
};
