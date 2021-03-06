# school-5-web-project

## Stack
- NodeJS
- ExpressJS
- Postgresql 🐘
- Prisma ⧩
- VueJS 2 💚
- [Chakra UI](https://vue.chakra-ui.com/box)
- Vercel ▲ & Heroku ? 

## Pré-requis
- Postgresql 12
- NPM

## Set-up: Dev
- Opt: `git clone https://github.com/azerpas/school-5-web-project.git`
- `cd school-5-web-project`
- [Set-up the database](#Set-up:-Database)
- `npm i`
- `cp .env.example .env.local`
- Modifier `.env.local`
    - `DATABASE_URL`: Remplacer seulement l'username (johndoe) et le password (randompassword)
    - `VUE_APP_API_URL`: Par défaut "localhost:3000". Remplacez si vous changez le port de l'API
- `npm run express`
- `npm run serve`

## Deployment
- https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

## ORM
**Prisma**     
Plus simple d'utilisation avec Vanilla JS que TypeORM.
- [Add to existing project](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-node-postgres)
- Le schéma est dans `./prisma/schema.prisma`
- Créer un schéma à partir d'une base de données: `npx prisma introspect`
**OR**
- Modifier `./prisma/schema.prisma` manuellement    
Utilisez: `npx prisma generate` pour regénérer l'API client ~_**à chaque fois**_~ qu'il y a une modification sur le schéma de la BD

## VUE
- [Vue-Cli](https://cli.vuejs.org/guide/)
- Best Pratices [1](https://012.vuejs.org/guide/best-practices.html) & [2](https://learnvue.co/2020/01/12-vuejs-best-practices-for-pro-developers/)

### Set-up: Database
- [Install Postgresql](https://www.postgresqltutorial.com/install-postgresql/) if it's not installed     
- Once Postgresql is running and set-up, `cd` to the this repository in your terminal and type `psql`      
- `\i ./docs/eido.sql`      

## Bugs connus
- [ ] La photo de profil ne s'affiche pas lors d'un refresh (problème au niveau de CAvatar)
- [ ] Modification de la bio et du pseudo ne marche pas sauf après déconnexion
- [ ] Bouton work modifier ne marche pas
- [ ] Pas de possibilité d'ajouter ses offres

## Todo

**/account**
- [x] Pas de possibilité d'ajouter ses keywords
- [x] Cacher les platforms pour les marque    

**/search**
- [x] Tester les select   
- [x] Récup keywords    
- [x] Affichage bio      
- [x] z-index       

**Navbar**
- [x] Responsive - easy
- [x] Surlignage de la route actuelle