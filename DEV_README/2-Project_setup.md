# Rita App - Project Setup

## 1. Frontend (GUI)

If this is your first time running the GUI or a teammate has installed a new package, run the following at root directory:

```sh
cd gui
npm install
npm run dev
```

Otherwise, to start the gui, run the following at root:

```sh
npm run gui
```

Or manually,

```sh
cd gui
npm run dev
```

This opens the frontend page in `http://localhost:5173/`

### Note on `npm install`

When installing a new npm package, always `cd gui` first. Installing packages modifies `package.json` and `package-lock.json`, and we don’t want unnecessary changes in the root directory.

## 2. Backend (Server)

I strongly recommend you to use conda or virtual environment to manage our environment.
Specific package installation will be updated here, but in general, you can safely `pip install` any missing packages.

### Running the backend

We use Flask framework for API development, to install it, run

```sh
pip install flask
```

To start the backend, run this at the root directory:

```sh
npm server
```

Or manually,

```sh
cd server
flask run
```

This starts the API on port 5000. You can test it by visiting http://127.0.0.1:5000/hello.

The npm commands are just shortcuts. You can go to `package.json` at the root directory to see what they do.
