// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-import-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('react-import-helper.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
        const editor = vscode.window.activeTextEditor; 
        if (editor) {
            // Get the selected text 
			const lineNumber = editor.selection.active.line;
			// Get the entire line's text
			const lineText = editor.document.lineAt(lineNumber).text;
			const match = !lineText.includes('from') ? lineText.replace(/(import|')/g, '').trim() : lineText.match(/import (\{.*\}|\w+) from ['"](.+)['"]/); 
			// console.log(match)
            if (match) {
                const componentName = match[1];
				const currentFile = editor.document.uri.fsPath
				const filePath = match[2].length > 1 ? match[2] : String(match)
				const filePathSplitted = filePath.split('/')
                const fileName = match[2].length > 1 ? filePathSplitted[filePathSplitted.length - 1] + path.extname(currentFile) : filePathSplitted[filePathSplitted.length - 1]; 

				if(filePath && isRelativePath(filePath)) { 
				// Create the folder and file
					// const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
					const rootPath = path.dirname(currentFile)
            	    createFolderAndFile(rootPath, filePath, fileName);
				} else {
					vscode.window.showInformationMessage('Cannot create components for external packages or libraries.');
				}

            } else {
                vscode.window.showInformationMessage('No import statement found on the current line.');
            } 
		}
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from React Import Helper!');
	});

	context.subscriptions.push(disposable);
}
function isRelativePath(filePath) {
    // Check if the file path is relative (starts with a dot or a slash)
    return filePath.startsWith('.') || filePath.startsWith('/');
}
function createFolderAndFile(rootPath, filePath, fileName) {
    const folderPath = path.dirname(filePath);
    const fullFolderPath = path.join(rootPath, folderPath);
    const fullFilePath = path.join(fullFolderPath, fileName);   

    // Check if the folder exists, create it if not
    if (!fs.existsSync(fullFolderPath)) {
        fs.mkdirSync(fullFolderPath, { recursive: true });
        vscode.window.showInformationMessage(`Folder created: ${folderPath}`);
    }

    // Check if the file exists, create it if not
    if (!fs.existsSync(fullFilePath)) {
        fs.writeFileSync(
            fullFilePath,
            `import React from 'react';\n\nfunction ${fileName.split('.')[0]}() {\n  return (\n    <div>\n      {/* ${fileName.split('.')[0]} component */}\n    </div>\n  );\n}\n\nexport default ${fileName.split('.')[0]};\n`
        );
        vscode.window.showInformationMessage(`File created: ${filePath}`);
    } else {
        vscode.window.showInformationMessage(`File already exists: ${filePath}`);
    }
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
