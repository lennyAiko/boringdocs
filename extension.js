const vscode = require("vscode");

const docs = {
  boring: "https://docs.sailscasts.com/boring-stack/getting-started",
  sails: "https://sailsjs.com/documentation/concepts",
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let currentPanel = undefined;

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
          {
            enableScripts: true,
            retainContextWhenHidden: true,
          }
        );
      }

      currentPanel.webview.html = getWebContent("boring");
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

      if (currentPanel) {
        currentPanel.reveal(columnToShowIn);
      } else {
        currentPanel = vscode.window.createWebviewPanel(
          "boringdocs",
          "Boring Stack Docs",
          columnToShowIn || vscode.ViewColumn.One,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
          }
        );
      }

      currentPanel.webview.html = getWebContent("boring");
      currentPanel.onDidDispose(
        () => {
          currentPanel = undefined;
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
    vscode.commands.registerCommand("boringdocs.search", function () {
      vscode.window.showInformationMessage(
        "Hello World from search boringdocs!"
      );
    })
  );
}

function deactivate() {}

function getWebContent(doc) {
  return ` <!DOCTYPE html>
    <html lang="en">
    <body style="width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;">
		    <iframe
      src="${docs[doc]}"
	  id="myIframe"
      frameborder="0"
      style="width:100vw; height:100vh; margin:0; padding:0;"
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
			  iframe.style.backgroundColor = 'white';
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
};
