# Steevliet vzw — Digitaal Opleidingsbeheer & Werkstromen

> **HOGENT Software Project** • Oplossing op maat voor Steevliet vzw (Bijzondere Jeugdzorg)  
> Ontwikkeld met focus op **bedrijfswaarde**, **tijdsbesparing**, en een intuïtieve gebruikerservaring zonder IT-jargon.

---

## 🎯 Doelstelling & Context

Steevliet vzw organiseert residentiële jeugdhulp verspreid over verschillende campussen (waaronder Campus Melle en Campus St-Maria-Oudenhove). Het huidige beheer van opleidingen en vormingen voor pedagogisch, logistiek en administratief personeel verloopt via losse e-mails en handmatige Excel-lijsten. Dit leidt tot:
1. **Administratieve overbelasting** bij Els (Opleidingsverantwoordelijke) en Ines (HR / Loonadministratie).
2. **Onzekerheid rond looncodes & tijdregistratie:** Binnen gepland werkrooster (`LC-101`) versus buiten dienst / overuren / recup (`LC-204`).
3. **Logistieke rompslomp:** Handmatig broodjeslijsten en zaalreserveringen per campus bijhouden.
4. **Geen centraal zicht** op de kwaliteit en relevantie van externe opleidingspartners (zoals Pimento vzw, Rode Kruis, CGG Passant).

Dit project levert een compleet werkende oplossing bestaande uit een **fullscreen presentatiemodus (gesprekskader)** voor klantafstemming en een **interactieve rol-gebaseerde webapplicatie (Blazor WASM simulatie)**.

---

## 🖥️ Onderdelen van de Applicatie

### 1. Presentatiemodus (Gesprekskader)
Een fullscreen presentatie met vaste afmetingen en toetsenbordnavigatie (`←` en `→`):
- **Dia 1: Introductie** — Van administratieve ruis naar overzicht en rust.
- **Dia 2: Huidige Situatie (AS-IS)** — Visuele knelpuntenanalyse van de huidige e-mail- en Excelketens.
- **Dia 3: Gewenste Werkstromen (TO-BE per Type)** — Duidelijke opsplitsing:
  - *Type 1: Interne Opleiding* (Campussen Melle / Oudenhove met zaal & broodjes).
  - *Type 2: Externe Vorming* (Voorstel, validatie, facturatie, evaluatie).
  - *Roosterverwerking:* Automatische scheiding tussen `LC-101` (binnen dienst) en `LC-204` (buiten dienst).
- **Dia 4: Product Backlog & Prioriteiten (MoSCoW)** — Heldere afbakening van Must Haves, Should Haves en Out-of-Scope.
- **Dia 5: Roadmap & Fasering** — Sprintplanning (Sprint 1 t/m Sprint 4) met regelmatige demo-momenten.
- **Dia 6: Kernvragen voor Steevliet** — Strategische vragen rond tijdregistratie-import, shiften/weekendtoeslagen, goedkeuringsbevoegdheid en wettelijke herhalingsattesten (EHBO/HACCP).

### 2. Interactieve Webapplicatie (Role-Based Access Control)
Simuleer de applicatie vanuit 4 verschillende perspectieven:
- **Tom De Smet (Pedagogisch Begeleider):**
  - Opleidingscatalogus gefilterd per functiegroep (Pedagogisch, Logistiek, Admin).
  - 1-klik aanvraag met keuze voor shift/overuren en cateringvoorkeur.
  - Opvolging van eigen aanvragen en status.
  - 1-minuut evaluatie invullen na voltooide opleiding.
- **Sarah Claeys (Teamcoördinator):**
  - Overzicht van openstaande aanvragen van teamleden met 1-klik goedkeuring / afwijzing.
  - Teamoverzicht en leefgroepbezetting.
- **Ines Van Damme (HR & Loonadministratie):**
  - Pre-payroll tabel met automatische koppeling van looncodes (`LC-101` vs `LC-204`).
  - CSV export klaargezet voor import in het tijdregistratiesysteem.
- **Els Martens (Opleidingsverantwoordelijke):**
  - Beheer van vormingsaanbod en externe aanvragen.
  - **Zalen & Broodjesbestellingen per Campus:** Volledig zichtbare besteltabel met medewerker, broodjekeuze, allergenen/dieetwensen en CSV export voor de lokale bakker.
  - **Kwaliteitsreviews per Partner:** Beoordeling en praktijkervaringen van opvoeders (Pimento vzw, Rode Kruis, Steevliet Kennisnetwerk, etc.).

---

## 🛠️ Technische Specificaties & Architectuur

In lijn met de projectvereisten van HOGENT:
- **Frontend Architectuur:** Single Page Application (SPA), vormgegeven volgens de ontwerpprincipes van moderne Blazor WebAssembly interfaces.
- **Doelarchitectuur Backend (.NET 10):**
  - ASP.NET Core 10 met FastEndpoints (REPR pattern: Request-Endpoint-Response).
  - Entity Framework Core 10 (Code-First) met PostgreSQL / SQL Server.
  - FluentValidation voor invoervalidatie.
  - Role-Based Access Control (RBAC).

---

## 🚀 Lokaal Draaien

Er is geen complexe build-stap vereist voor het prototype:

```bash
# Clone de repository
git clone https://github.com/Haktan-Dongel/steevliet-opleidingsbeheer.git
cd steevliet-opleidingsbeheer

# Start een lokale server (Python)
python3 -m http.server 3344
```

Open vervolgens uw browser op [http://localhost:3344](http://localhost:3344).

---

## 📄 Documentatie

- [Klantgesprek Strategie Dossier (Meeting Briefing)](steevliet_meeting_dossier.md)
