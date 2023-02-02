# webnative-fs-mv-test

A test of the Webnative `fs.mv` file system operation.

## Set up

Install dependencies.

```sh
npm install
```

## Run

Run the dev server.

```sh
npm run dev
```

Open the devtools to check for console messages then click the "Run test" button.

On first run, this will:

1. Register a user
2. Add a file to `dirA`
3. Move the file to `dirB`
4. Read the file from `dirB`

On subsequent runs it will attempt to read the content from `dirB`.
