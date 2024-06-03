import * as vscode from 'vscode';
import YAML from 'yaml';
import { marked } from 'marked';
import * as helpers from '@zim.kalinowski/vscode-helper-toolkit';

var extensionUri: vscode.Uri;
var mediaFolder: vscode.Uri;
var extensionContext: vscode.ExtensionContext;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate (context: vscode.ExtensionContext) {
  extensionContext = context;
  extensionUri = context.extensionUri;

  mediaFolder = vscode.Uri.joinPath(extensionUri, 'media');

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-demo-extension" is now active!');

  let disposable = vscode.commands.registerCommand('vscode-demo-extension.displayWelcomeDemo', () => {
    displayWelcomeDemo();
  });

  disposable = vscode.commands.registerCommand(
    'vscode-demo-extension.displaySetupDemo',
    () => {
      displaySetupDemo();
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate () {}


var layoutWelcome: any = require('./layout-welcome.yaml');

async function displayWelcomeDemo() {
  try {
    let view = new helpers.GenericWebView(extensionContext, "Welcome!");
    view.createPanel(layoutWelcome);
  } catch (e) {
    console.log(e);
  }
}

var layoutSetup: any = require('./layout-setup.yaml');

async function displaySetupDemo () {
  let view = new helpers.GenericWebView(extensionContext, "Installer");
  view.createPanel(layoutSetup);

  view.MsgHandler = function (msg: any) {
    if (msg.command === 'ready') {
      view.showElement('fieldset_esp_idf');
      view.hideElement("fieldset_tinygo");
      view.hideElement('fieldset_rust');
      view.hideElement('fieldset_zephyr');
      view.runStepsVerification();
    } else if (msg.command === 'button-clicked') {
      //vscode.window.showInformationMessage('Button ' + msg.id + ' Clicked!');
      if (msg.id === 'close') {
        view.close();
      } else if (msg.id === 'install_button') {
        view.runStepsInstallation();
      }
    } else if (msg.command === 'radio-clicked') {
      vscode.window.showInformationMessage('Radio ' + msg.id + ' Clicked!');
    } else if (msg.command === 'dropdown-clicked') {
      // vscode.window.showInformationMessage('Dropdown item ' + msg.id + ' Clicked X!');

      view.hideElement("fieldset_tinygo");
      view.hideElement('fieldset_esp_idf');
      view.hideElement('fieldset_rust');
      view.hideElement('fieldset_zephyr');

      if (msg.id === 'ESP-IDF') {
        // XXX - show ESP-IDF version
        view.showElement('fieldset_esp_idf');
      } else if (msg.id === 'TinyGo') {
        view.showElement("fieldset_tinygo");
      } else if (msg.id === 'Zephyr') {
        view.showElement("fieldset_zephyr");
      } else if (msg.id === 'Rust') {
        view.showElement("fieldset_rust");
      } else {
        view.enableElement('create-button');
      }
      view.runStepsVerification();
    }
  };

}
