# Running the project

- Clone this repository and proceed to open it in an IDE like VSCode. Inside the IDE open the terminal and run below command.

```
npm install
```

- After running the above command all the necessary dependencies will be added to the project. Now to get the project up and running you can run below command.

```
npm run dev
```

- Once you run the above command your terminal will look like below. If you hold the `Ctrl` key and click on the link below the project will open up in your default browser.

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

- Now any changes you make in the code will be directly reflected in browser

# Setting up a Vite project from scratch

- Open your terminal and navigate to the directory where you want to create your project. Run the below command to make a new Vite project :

```
npm create vite@latest
```

- Below prompt will appear asking you to name your project so go ahead and give the project an appropriate name :

```
? Project name: » vite-project
```

- After giving the name you will asked to select a framework for your project. Use the arrow keys and hit enter to select the framework of your choice :

```
√ Project name: ... team-page-prototype
? Select a framework: » - Use arrow-keys. Return to submit.
>   Vanilla
    Vue
    React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
```

- Similary select a variant of the framework for the below options :

```
√ Project name: ... team-page-prototype
√ Select a framework: » React
? Select a variant: » - Use arrow-keys. Return to submit.
>   TypeScript
    TypeScript + SWC
    JavaScript
    JavaScript + SWC
    Remix ↗
```

- After having selected the variant and opening the project you can use the steps for running this project to install dependencies and get the project running.