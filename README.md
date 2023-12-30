# SmartImporter

SmartImporter is a Visual Studio Code extension that simplifies the process of importing modules in your code by automatically creating folders and files for non-existing imports. It helps facilitate your development workflow by reducing the manual effort required to set up file structures.

## Features

- **Smart Importing:** Automatically creates folders and files for non-existing imports. 
- **Quick Setup:** Enhances productivity by reducing the need for manual file creation.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or use the shortcut `Ctrl+Shift+X`.
3. Search for "SmartImporter" and click the install button.

## Usage

1. Open a file in Visual Studio Code.
2. Write or paste an import statement for a module that does not exist yet.
3. Press `Enter` at the end of the line to trigger SmartImporter.

## Example

```javascript
// Before using SmartImporter
import { ExampleComponent } from './components/ExampleComponent';

// After using SmartImporter
// SmartImporter will create the necessary folder and file for 'ExampleComponent'
import { ExampleComponent } from './components/ExampleComponent';
