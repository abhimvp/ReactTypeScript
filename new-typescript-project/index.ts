const hello = (name: string) => {
  console.log(`Hello ${name}`);
};

hello("Typescript");

// run this file  -> tsc index.ts -> gives us index.js and run it using -> node index.js -> gives Hello TypeScript
// we add "build": "tsc" in package.json scripts - this command will use the tsconfig.json file
//  we run the project using npm run build
