import fs from 'fs';
import path from 'path';

/*
 * Const
 */

const PREFIX = '  ';

/*
 * Helpers
 */

const isObject = (obj) => {
  return obj !== null
    && typeof obj === "object"
}

const output = (...arg) => console.log(...arg);

/*
 * Implementation
 */

const getFilesObject = (currentPath) => {
  const files = fs.readdirSync(currentPath);

  const result = {};

  for (const i in files) {
    const fileName = files[i];
    const currentFile = path.join(currentPath, fileName);

    const stats = fs.statSync(currentFile);

    if (stats.isFile()) {
      result[fileName] = currentFile;
    } else if (stats.isDirectory()) {
      result[fileName] = getFilesObject(currentFile)
    }

  }

  return result;
}

const _printFileObject = (fileObject, options, indent = '') => {
  const {
    printFillPath = false,
    printReverseOrder = false,
  } = options;

  const entries = Object.entries(fileObject);

  if (printReverseOrder) {
    entries.reverse()
  }

  for (const [key, value] of entries) {
    const file = [indent, key]
      .join(indent.length > 0 ? '↳' : '');

    const log = [file]
    const isDirectory = isObject(value);

    if (!isDirectory && printFillPath) {
      log.push(value);
    }

    output(...log);

    if (isDirectory) {
      _printFileObject(value, options, indent + PREFIX);
    }
  }
}

const printFileObject = (fileObject, options) => (
  _printFileObject(fileObject, options)
);

/*
 * Main
 */

const args = process.argv.slice(2);

const OPTIONS = {
  isFullPath: args.includes('fullpath') || false,
  isReverseOrdered: args.includes('reverse-order') || false,
  isHelp: args.includes('help')
}

if (OPTIONS.isHelp) {
  output(`Usage: npm start [OPTIONS]...
Print list of directories, files and file paths.

  fullpath          add file fullpath to output
  reverse-order     print files in reverse order

By default files in the list is printed without path.

Examples:
  npm start reverse-order fullpath`);
  process.exit();
}

const fileObject = getFilesObject(__dirname);

printFileObject(fileObject, {
  printFillPath: OPTIONS.isFullPath,
  printReverseOrder: OPTIONS.isReverseOrdered,
});
