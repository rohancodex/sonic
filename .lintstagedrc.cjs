module.exports = {
    '**/*.(ts|tsx|js)': (filenames) => [
        //   `npx prettier --write ${filenames.join(" ")}`,
        `npx eslint ${filenames.join(' ')} --ext ts --ext tsx --ext js --ext jsx`,
        `npx prettier --check ${filenames.join(' ')}`,
    ],

    '**/*.(md|json|yaml)': (filenames) => `npx prettier --write ${filenames.join(' ')}`,
};
