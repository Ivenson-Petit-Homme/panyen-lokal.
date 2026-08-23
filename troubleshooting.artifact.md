# Gid pou Rezoud Pwoblèm Koneksyon (ERR_CONNECTION_REFUSED)

Si w jwenn erè sa a lè w ap louvri `http://localhost:3000`, se paske server a pa limen oswa li pa ka aksepte koneksyon an.

## Etap pou w ranje sa :

### 1. Limen Server a menm
Kòm mwen se yon AI, mwen pa ka kenbe server a limen pou ou pou toutan nan background nan. Se **ou menm** ki dwe lanse l nan tèminal Trae a.
- Louvri tèminal ki anba nan Trae a (**Terminal** tab).
- Tape kòmand sa a :
  ```bash
  npm run dev
  ```
- Tann mesaj vèt sa a parèt : `🌿 Serveur Panyen Lokal S.A. opérationnel sur http://0.0.0.0:3000`

### 2. Tcheke si gen yon lòt pwojè k ap sèvi ak Port 3000
Si w gen yon lòt sit k ap kouri sou port 3000, server a pap ka limen.
- Fèmen tout lòt server ki ta ka ap kouri.
- Oswa, modifye `server.ts` pou w chanje `PORT = 3000` an `PORT = 3001`.

### 3. Sèvi ak yon lòt adrès
Si `localhost` pa mache, eseye louvri adrès sa yo nan navigatè w :
- [http://127.0.0.1:3000](http://127.0.0.1:3000)
- [http://0.0.0.0:3000](http://0.0.0.0:3000)

### 4. Verifye Kle API a
Si server a limen men AI a pa reponn :
- Asire w fichye `.env` la gen bon kle a san espas anplis.
- Mwen deja mete kle ou te ban mwen an nan fichye a.

---
> [!TIP]
> Si apre w fin tape `npm run dev` tèminal la bay yon erè (an wouj), tanpri kopye erè a epi voye l ban mwen pou m ka di w sa k pase.
