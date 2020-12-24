# school-5-web-project

## Stack
- NodeJS
- ExpressJS
- Postgresql 🐘
- Prisma ⧩ ~~TypeOrm~~
- VueJS 2 💚
- Chakra UI
- Vercel ▲ & Heroku ? 

## Pré-requis
- Postgresql 12
- NPM

## Set-up
- Opt: `git clone https://github.com/azerpas/school-5-web-project.git`
- `npm i`
- `npm run express`
- `npm run serve`

## ORM
**Prisma**     
Plus simple d'utilisation avec Vanilla JS que TypeORM.
- [Add to existing project](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-node-postgres)
- Schema is inside `./prisma/schema.prisma`
- Create a schema from the current DB: `npx prisma introspect`
**OR**
- Modify `./prisma/schema.prisma` manually
Use: `npx prisma generate` to regenerate the client API each time there's a modification on the schema
- ~~TypeORM doc~~
- ~~TypeORM sur Vanilla JavaScript~~
- ~~Exemple avec Express~~

## VUE
- [Vue-Cli](https://cli.vuejs.org/guide/)
- Best Pratices [1](https://012.vuejs.org/guide/best-practices.html) & [2](https://learnvue.co/2020/01/12-vuejs-best-practices-for-pro-developers/)
