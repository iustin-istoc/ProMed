# ProMed – Platformă de programări în spitale publice

ProMed este o aplicație web pentru gestionarea programărilor medicale în spitale publice, dezvoltată de o echipă colaborativă de 5 membri.

---

## 🔧 Tehnologii utilizate:
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- Microsoft SQL Server
- Angular (frontend)
- Swagger (pentru testarea API-urilor)

---

## 👥 Componența echipei:

| Rol        | Membru        | Branch         | Responsabilități principale                        |
|------------|---------------|----------------|----------------------------------------------------|
| 🔧 Backend | Iustin         | `backend`      | API-uri, logica aplicației, integrare cu DB        |
| 🗃️ Database | Codin          | `database`     | Modele EF, relații, migrații, conectare SQL Server |
| 🧪 Testing | Gabi           | `testing`      | Testare endpoint-uri, validări, cazuri negative    |
| 🎨 Frontend | Brigi          | `frontend`     | Interfață Angular, conectare la API-uri            |
| 👨‍💼 Team Lead | Delia        | `teamlead`     | Organizare, taskuri, documentație, management echipă |

🔁 Iustin are acces și contribuție peste toate zonele proiectului.

---

## 🔄 Ghid de lucru:

1. **Clone repo:**
   ```bash
   git clone https://github.com/istoc-iusin-30123/ProMed.git
   ```

2. **Deschide în Visual Studio** fișierul `ProMed.sln`

3. **Rulează migrarea bazei de date:**
   ```bash
   Update-Database
   ```

4. **Accesează API-ul în Swagger:**
   ```
   https://localhost:7023/swagger
   ```

---

## 🧩 Reguli Git:

- Lucrează DOAR pe branch-ul tău (vezi tabelul de mai sus)
- Commit-urile trebuie să aibă format clar:
  ```
  [Frontend] creat componentă DoctorForm
  [Database] adăugat relație many-to-many
  ```
- Pentru a integra modificările în `main`, folosește **Pull Request** 🛡️