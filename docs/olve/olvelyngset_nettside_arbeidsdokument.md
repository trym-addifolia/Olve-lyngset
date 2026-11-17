# Olve Lyngset – Kiropraktor, DACNB
## Arbeidsdokument for ny nettside – innhold, struktur, SEO og teknisk overlevering

**Versjon:** 0.9 – til møte 17. november 2026  
**Status:** Gjennomarbeidet førsteutkast, ikke publiseringsklart uten faktasjekk og godkjenning  
**Primært domene (planlagt):** `olvelyngset.no`  
**Målgruppe:** Olve, sønnen hans og utvikler/kollega

> **Formål:** Gjøre det enkelt å ta beslutninger om nettstedet og komme raskt i gang med bygging. Dokumentet kombinerer avklart informasjon fra intervjuet, redaksjonelle forslag og tydelig merkede åpne punkter. Tekstene nedenfor er forslag som Olve skal lese gjennom før publisering.

---

# 1. Sammendrag til møtet

## Målet

Bygge en personlig, profesjonell nettside for **Olve Lyngset – Kiropraktor, DACNB** som gjør at mennesker med særlig **langvarig svimmelhet** og **vedvarende plager etter hjernerystelse** kjenner seg igjen, får tillit til Olves tilnærming og enkelt kan ta kontakt eller bestille time. Nettsiden skal samtidig vise at Olve er en allsidig kiropraktor som også behandler vanlige muskel- og skjelettplager.

**Ønsket reaksjon hos leseren:** «Dit må jeg bare. Endelig noen som kan hjelpe.»  
**Overordnet budskap:** «Det er hjelp å få.»  
**Viktig balanse:** Gi håp uten å love bedring eller antyde at alle kan hjelpes.

## Anbefalt prioritering

1. **Svimmelhet og balanse** – et av Olves sterkeste kompetanseområder.
2. **Langvarige plager etter hjernerystelse (postcommotio)** – tydelig, selvstendig hovedområde.
3. **Andre plager** – rygg, nakke, hodepine, skulder og øvrige muskel- og skjelettplager.
4. **Grundig undersøkelse og individuelt tilpasset rehabilitering** – det som binder fagområdene sammen.

På forsiden presenteres svimmelhet og hjernerystelse som **to likeverdige hovedinnganger**. Eventuell ulik SEO-prioritet avgjøres senere med søkeords- og konkurranseanalyse.

## Beslutninger dere bør ta i møtet

- Hvem bygger, hvem vedlikeholder, og hvem godkjenner medisinsk/faglig innhold?
- Hvilken publiseringsløsning brukes (for eksempel WordPress eller en annen løsning utviklerne foretrekker)?
- Kan Olve selv redigere tekster, legge ut fagartikler og endre kontaktinformasjon?
- Hvem kjøper/administrerer domene, DNS, hosting, sikkerhet og sikkerhetskopier?
- Kan nettsiden lenke direkte til Olves timebestilling hos Limbra? Dette må bekreftes med Limbra.
- Hvordan opprettes `kontakt@olvelyngset.no`, og hvem setter opp e-postsikkerhet?
- Hvilke eksisterende sider på `krystallsyken.no` skal videresendes til hvilke nye sider?
- Hva er minste publiserbare versjon, og hvem har ansvar for lansering og SEO-kontroll?

---

# 2. Profil og posisjonering

## Avklarte fakta fra intervjuet

- Navn: **Olve Lyngset**.
- Yrke: **Kiropraktor**.
- Faglig betegnelse ønsket i profil: **DACNB** (Diplomate of the American Chiropractic Neurology Board).
- Mer enn 30 års klinisk erfaring.
- Arbeider ved **Limbra Storgata i Lillestrøm**. Nettsiden er Olves **personlige faglige nettside**, ikke Limbra sin.
- Medlem av **Norsk Kiropraktorforening**.
- Videreutdanning i funksjonell nevrologi, blant annet gjennom **Carrick Institute**, og fordypning i vestibulær rehabilitering.
- Har undervist/holdt foredrag for kolleger og andre om blant annet svimmelhet og funksjonell nevrologi.
- Pasienter kommer særlig fra Østlandet, men noen med mer sammensatte plager reiser fra andre deler av landet.

## Redaksjonell profil

**Faglig:** Grundig, nysgjerrig, systematisk, erfaren og åpen om usikkerhet.  
**Menneskelig:** Engasjert, lyttende, direkte og opptatt av at pasienten føler seg sett.  
**Språk:** Varmt og konkret, uten overdreven markedsføring eller garantier. Forklar faguttrykk når de brukes.  
**Unngå:** «Mirakelbehandling», «vi finner alltid årsaken», «kurerer postcommotio», «setter ryggvirvler på plass» og bastante forklaringer som går lenger enn funnene tillater.

## Sentrale sitater og formuleringer

> «Det er hjelp å få.»

> «Jeg har ikke fått prøve meg ennå.»

> «Dette har ingen gjort med meg tidligere.» *(gjengitt som noe pasienter ofte sier; bruk ikke som navngitt pasientuttalelse uten samtykke)*

> «Jeg er ikke en Dispril.» *(godt muntlig uttrykk; vurder om det passer i offentlig tekst)*

> «Gråsonen mellom syk og frisk.»

**Mulig formulering for nettstedet:** «At plagene ikke vises på vanlige undersøkelser, betyr ikke at de ikke er reelle.»

---

# 3. Anbefalt informasjonsarkitektur

Foreslåtte URL-er er korte, norske og beskrivende. Endelig navngivning kan justeres etter søkeordsanalyse.

| Side | Foreslått URL | Rolle |
|---|---|---|
| Forside | `/` | Tillit, tydelige innganger, timebestilling |
| Svimmelhet og balanse | `/svimmelhet/` | Hovedside og inngang til spesifikke tilstander |
| Krystallsyke | `/svimmelhet/krystallsyke/` | Særlig relevant for eksisterende `krystallsyken.no` |
| PPPD | `/svimmelhet/pppd/` | Søkeintensjon ved vedvarende svimmelhet |
| MdDS | `/svimmelhet/mdds/` | Spesialisert pasientgruppe |
| Vestibularisnevritt | `/svimmelhet/vestibularisnevritt/` | Spesialisert pasientgruppe |
| Ménières sykdom | `/svimmelhet/menieres-sykdom/` | Informasjon, undersøkelse og rolleavklaring |
| Hjernerystelse / postcommotio | `/hjernerystelse/` | Andre hovedområde |
| Intensivt rehabiliteringsopphold | `/intensivt-opphold/` | Informasjon til tilreisende og kontakt |
| Andre plager | `/andre-plager/` | Vanlig kiropraktikk og muskel-/skjelettplager |
| Undersøkelse og metoder | `/undersokelse/` | VOG, sakkadometer, balanse- og nevrologiske tester |
| Om Olve | `/om-olve/` | Historie, utdanning, verdier |
| Priser og praktisk informasjon | `/praktisk/` | Tidsbruk, adresse, booking, priser etter avklaring |
| Kontakt og bestilling | `/kontakt/` | Timebestilling og faglige henvendelser |
| Fagartikler | `/artikler/` | Langsiktig synlighet og deling på Facebook |

**Anbefalt første lansering:** Forside, svimmelhet, hjernerystelse, intensivt opphold, andre plager, undersøkelse, om Olve og kontakt/praktisk. Legg til diagnosetilpassede undersider fortløpende; ikke publiser tomme eller svært tynne sider.

---

# 4. Ferdige tekstutkast – forside

## SEO

**SEO-tittel (forslag):** Olve Lyngset | Kiropraktor i Lillestrøm – svimmelhet og hjernerystelse  
**Metabeskrivelse (forslag):** Olve Lyngset er kiropraktor, DACNB, i Lillestrøm. Grundig undersøkelse og individuelt tilpasset oppfølging ved svimmelhet, hjernerystelse og muskel- og skjelettplager.

## H1: Svimmelhet, hjernerystelse eller plager som ikke slipper taket?

**Ingress:**

Når symptomene varer lenge, og du fortsatt mangler en forklaring, kan det være vanskelig å vite hvor du skal søke hjelp. Jeg heter Olve Lyngset og er kiropraktor med mer enn 30 års erfaring. Jeg arbeider særlig med svimmelhet, balanseproblemer og langvarige plager etter hjernerystelse – i tillegg til vanlige muskel- og skjelettplager.

Jeg legger vekt på å lytte til historien din, undersøke grundig og forsøke å finne en fornuftig vei videre. Målet er ikke bare bedre testresultater, men at du skal fungere bedre i hverdagen.

**Primærknapp:** Bestill time  
**Sekundærknapp:** Slik undersøker jeg

### Svimmelhet og balanse

Svimmelhet kan oppleves som rotasjon, gynging, ustøhet eller en følelse av at omgivelsene ikke stemmer. Noen har fått en diagnose, mens andre har vært gjennom flere undersøkelser uten å forstå hvorfor plagene fortsetter.

Jeg bruker blant annet øyebevegelsesregistrering, balanseprøver og nevrologiske undersøkelser for å vurdere hvilke funksjoner som kan være påvirket, og hvordan videre oppfølging bør tilpasses.

**Lenke:** Les om svimmelhet og balanse

### Langvarige plager etter hjernerystelse

Etter en hjernerystelse kan noen oppleve vedvarende svimmelhet, hodepine, konsentrasjonsvansker, synsrelatert ubehag eller utmattelse. Det kan være frustrerende når vanlige undersøkelser ikke gir et tydelig svar.

At plagene ikke vises på vanlige undersøkelser, betyr ikke at de ikke er reelle. Jeg ser etter mulige funksjonsavvik, forklarer hva undersøkelsene viser – og hva de ikke kan vise – og vurderer en individuelt tilpasset rehabiliteringsplan.

**Lenke:** Les om plager etter hjernerystelse

### En grundig undersøkelse – flere vinduer inn i nervesystemet

Jeg bruker ulike tester som gir informasjon om øyebevegelser, balanse, koordinasjon og samspillet mellom sanseinntrykk og bevegelse. Ingen enkelt test forteller hele historien. Derfor vurderer jeg funnene samlet, prøver ut relevante tiltak og undersøker på nytt hvordan kroppen reagerer.

**Lenke:** Se hvordan en undersøkelse foregår

### Gråsonen mellom syk og frisk

Noen opplever store begrensninger i hverdagen uten å oppfylle kriteriene for en bestemt diagnose. De er kanskje ikke svimle nok, ustø nok eller utmattet på en måte som passer inn i en tydelig kategori. Likevel kan plagene være svært reelle.

Jeg er opptatt av å undersøke funksjon – også når et resultat ikke regnes som unormalt etter en enkelt testgrense. Et mål kan være at du kjenner deg mer stabil, stoler mer på balansen din og kan gjøre mer av det som er viktig for deg.

### Også vanlig kiropraktikk

Jeg undersøker og behandler blant annet plager fra rygg, nakke, skuldre, kjeve, hofter og andre deler av bevegelsesapparatet. Undersøkelse, forventninger og tiltak tilpasses problemet og det du ønsker å oppnå.

**Lenke:** Se andre plager jeg arbeider med

### Om meg

Jeg heter Olve Lyngset, er kiropraktor og DACNB, og arbeider ved Limbra Storgata i Lillestrøm. Jeg ble selv interessert i kiropraktikk etter å ha fått hjelp for ryggplager som ung ishockeyspiller. Siden har nysgjerrigheten på hvordan kroppen og nervesystemet fungerer, drevet meg til videreutdanning og mange år med klinisk arbeid.

Jeg kan ikke love at jeg finner løsningen for alle. Men jeg lover å ta plagene dine på alvor, gjøre en grundig vurdering og være ærlig om hva jeg tror kan hjelpe.

**Lenke:** Bli bedre kjent med Olve

### Klar for å ta kontakt?

Du kan bestille en vanlig konsultasjon gjennom timebestillingen hos Limbra. Ved spørsmål om et intensivt rehabiliteringsopphold ber jeg deg kontakte meg direkte, slik at vi kan vurdere behov og praktisk gjennomføring.

**Knapp:** Bestill time  
**Knapp:** Spør om intensivt opphold

---

# 5. Ferdige tekstutkast – svimmelhet

**URL:** `/svimmelhet/`  
**SEO-tittel:** Svimmelhet og balanseproblemer | Olve Lyngset, Lillestrøm  
**Metabeskrivelse:** Langvarig svimmelhet, ustøhet eller balanseproblemer? Les hvordan Olve Lyngset undersøker øyebevegelser, balanse og vestibulær funksjon i Lillestrøm.

## H1: Svimmelhet og balanseproblemer

Svimmelhet er ikke én enkelt tilstand. For noen snurrer rommet rundt. Andre føler seg ustø, gynger, blir slitne av å handle i store butikker eller synes det er vanskelig å lese, bruke skjerm eller bevege seg i travle omgivelser.

Jeg møter mange som har vært svimle lenge og som savner en forståelig forklaring. Noen har fått diagnoser som krystallsyke, PPPD, MdDS, vestibularisnevritt eller Ménières sykdom. Andre vet fortsatt ikke hva plagene skyldes.

### Undersøkelsen begynner med historien din

Jeg vil vite hvordan svimmelheten oppleves, når den startet, hva som utløser eller forverrer den, og hva du ikke lenger får gjort i hverdagen. Deretter velger jeg undersøkelser ut fra det du forteller.

Ved mer sammensatte plager kan jeg blant annet undersøke øyebevegelser med videobriller (VOG/VNG), balanse, koordinasjon og samspillet mellom hode- og øyebevegelser. Jeg vurderer funnene samlet. Et avvik kan gi nyttig informasjon, men er ikke i seg selv bevis for én bestemt årsak til symptomene.

### Ikke all nystagmus er krystallsyke

Ufrivillige øyebevegelser, kalt nystagmus, kan forekomme ved flere ulike tilstander. Videobriller gjør det mulig å observere øyebevegelser også uten at pasienten fikserer blikket. Ved mistanke om krystallsyke undersøker jeg dette særskilt, samtidig som jeg vurderer om andre forhold kan være relevante.

### Rehabilitering tilpasset din reaksjon

Hvis undersøkelsen peker mot funksjoner det kan være aktuelt å trene, velger jeg øvelser og stimuli med utgangspunkt i funnene og symptomene dine. Jeg følger med på både testresultater og hvordan du faktisk fungerer mellom besøkene. Dersom belastningen blir for stor, justerer vi planen.

Målet kan for eksempel være å gå tryggere, orke mer i butikker, lese lenger, kjøre bil med mindre ubehag eller få større tillit til egen balanse.

### Når svimmelhet må vurderes raskt

Plutselig oppstått kraftig svimmelhet, særlig sammen med nye nevrologiske symptomer som talevansker, lammelser, nummenhet eller andre akutte faresignaler, må vurderes raskt av lege/akutt helsetjeneste. Nettsiden erstatter ikke medisinsk vurdering.

**CTA:** Bestill time for svimmelhetsundersøkelse  
**Interne lenker:** Krystallsyke, PPPD, MdDS, vestibularisnevritt, Ménières sykdom, undersøkelse, intensivt opphold.

---

# 6. Ferdige tekstutkast – langvarige plager etter hjernerystelse

**URL:** `/hjernerystelse/`  
**SEO-tittel:** Langvarige plager etter hjernerystelse | Olve Lyngset  
**Metabeskrivelse:** Vedvarende svimmelhet, hodepine eller utmattelse etter hjernerystelse? Olve Lyngset i Lillestrøm tilbyr grundig funksjonsundersøkelse og tilpasset oppfølging.

## H1: Når plagene etter hjernerystelsen ikke går over

De fleste kommer seg etter en hjernerystelse, men noen får plager som varer lenge. Det kan dreie seg om svimmelhet, hodepine, ubehag ved skjermbruk, vansker med konsentrasjon, redusert toleranse for aktivitet eller en følelse av at kroppen ikke fungerer som før.

Mange jeg møter, forteller at de savner en forklaringsmodell. Noen føler også at de ikke blir trodd, fordi vanlige undersøkelser ikke har vist noe tydelig galt.

**At en undersøkelse er normal, betyr ikke at symptomene er innbilte.**

### Jeg ser etter funksjon, ikke bare diagnoser

Jeg undersøker blant annet øyebevegelser, balanse, koordinasjon og hvordan nervesystemet reagerer på ulike oppgaver. Enkelte tester gir målbare resultater som kan sammenlignes over tid. Andre krever mer klinisk tolkning.

Hvis jeg finner avvik som kan ha sammenheng med plagene dine, viser og forklarer jeg hva jeg har funnet. Jeg er samtidig tydelig på at et testavvik ikke automatisk forklarer alle symptomene.

### En plan som tåler hverdagen

Rehabiliteringen tilpasses det du tåler og det vi observerer underveis. Målet er å finne et nivå der du kan gjennomføre øvelsene med god margin, før vi eventuelt øker belastningen. Vi tar hensyn til hvordan du reagerer både under og etter aktivitet.

Jeg følger utviklingen gjennom nye undersøkelser og – viktigst – gjennom det du forteller om funksjonen din i hverdagen. Kan du lese lenger, være mer sammen med familien eller gjøre mer uten å bli utslått etterpå?

### «Jeg har ikke fått prøve meg ennå»

Når noen har forsøkt mye uten å få tilstrekkelig hjelp, forstår jeg at det kan være vanskelig å bevare håpet. Jeg kan ikke love et bestemt resultat. Men jeg kan tilby en grundig vurdering og se om min tilnærming kan gi oss en nyttig vei videre.

### For deg som bor langt unna

For enkelte med langvarige plager kan et intensivt rehabiliteringsopphold i Lillestrøm være aktuelt. Dette planlegges individuelt og avtales direkte med meg.

**CTA:** Bestill vurdering  
**Sekundær CTA:** Les om intensivt rehabiliteringsopphold

**Redaksjonell merknad:** Bruk gjerne «vedvarende plager etter hjernerystelse» i løpende tekst. «Postcommotio» og «postcommotiosyndrom» kan nevnes som søkeord/faguttrykk, men unngå å fremstille én forklaringsmodell som etablert årsak til alle langvarige symptomer.

---

# 7. Ferdige tekstutkast – intensivt rehabiliteringsopphold

**URL:** `/intensivt-opphold/`  
**SEO-tittel:** Intensivt rehabiliteringsopphold ved svimmelhet og hjernerystelse  
**Metabeskrivelse:** Tilpasset intensivt rehabiliteringsopphold i Lillestrøm for utvalgte pasienter med langvarig svimmelhet eller plager etter hjernerystelse. Kontakt Olve Lyngset.

## H1: Intensivt rehabiliteringsopphold i Lillestrøm

Bor du langt unna, eller har du sammensatte plager som krever tett oppfølging over flere dager? For enkelte pasienter tilbyr jeg et individuelt planlagt rehabiliteringsopphold i Lillestrøm.

Dette kan være aktuelt ved langvarig svimmelhet, blant annet PPPD og MdDS, eller ved vedvarende plager etter hjernerystelse. Om et slikt opplegg passer for deg, må vurderes individuelt.

### Slik kan et opphold foregå

Et opphold varer ofte omkring én uke. I løpet av dagen kan vi gjennomføre **tre til fem økter**, med hvile mellom øktene. Innholdet justeres etter undersøkelsesfunn, symptomer og reaksjon på belastningen.

Målet er **ikke** at alle plagene skal være borte etter én uke. Målet er å komme nærmere en nyttig forståelse av funksjonen din, finne øvelser som ser ut til å passe og lage en plan du kan arbeide videre med hjemme.

Ved avslutning får du skriftlige øvelser. Videre kontakt kan foregå på e-post, og for noen er det aktuelt med et nytt besøk etter omtrent to–tre måneder.

### Praktisk

Du må selv ordne overnatting, for eksempel hos familie/venner eller på hotell i nærheten av klinikken. Opplegget krever særskilt planlegging og **kan ikke bestilles som en vanlig nett-time**.

**CTA:** Send forespørsel om intensivt opphold  
**Kontakt:** `kontakt@olvelyngset.no` *(planlagt adresse – må opprettes og testes før publisering)*.

**Foreslått kontakttekst:** «Fortell kort hva slags plager du ønsker vurdert, hvor du bor og om du ønsker et intensivt opphold. Ikke send følsomme helseopplysninger eller journaler i vanlig e-post. Vi avtaler en tryggere måte å utveksle nødvendig informasjon på dersom det blir aktuelt.»

**Viktig avgrensning:** Ikke markedsfør intensivopphold for long covid som et etablert tilbud; Olve har ennå ikke gjennomført et slikt opphold for denne pasientgruppen.

---

# 8. Ferdige tekstutkast – undersøkelse og metoder

**URL:** `/undersokelse/`  
**SEO-tittel:** Grundig undersøkelse av svimmelhet og balanse | Olve Lyngset

## H1: Flere vinduer inn i nervesystemet

Når jeg undersøker langvarig svimmelhet eller plager etter hjernerystelse, prøver jeg å få informasjon fra flere ulike funksjoner. Ingen enkelt test gir hele svaret.

### Videobriller: VOG/VNG

«Jeg skal sette på deg et par briller slik at jeg kan se på øynene dine i mørket.»

Med videobriller kan jeg observere og ved behov gjøre opptak av øyebevegelser, blant annet nystagmus. Det kan være nyttig når jeg skal skille mellom ulike mønstre av svimmelhet eller følge endringer over tid.

### Måling av raske øyebevegelser

Med et sakkadometer kan jeg undersøke egenskaper ved raske øyebevegelser, for eksempel reaksjonstid, hastighet og presisjon. Resultatene vurderes sammen med øvrige funn og pasientens symptomer.

### Balanse, koordinasjon og blikkstabilisering

Avhengig av problemstillingen kan jeg undersøke balanse på ulike underlag, koordinasjon, evnen til å følge et mål med blikket og samspillet mellom hode- og øyebevegelser.

### Undersøk – prøv – undersøk på nytt

Funnene gir grunnlag for en foreløpig arbeidshypotese. Deretter kan vi prøve ut målrettede øvelser eller andre tiltak og undersøke på nytt. Hvis resultatene ikke stemmer med det jeg forventet, må hypotesen revurderes.

Testresultater er nyttige, men **bedre funksjon i hverdagen er det viktigste målet**.

**Medieidé:** Kort anonymisert VOG-video med forklaring av hva man ser. Bruk bare opptak som er reelt anonymisert, lovlig å publisere og kontrollert for identifiserende opplysninger. Ikke antyd at slike klipp dokumenterer behandlingseffekt.

---

# 9. Ferdige tekstutkast – andre plager

**URL:** `/andre-plager/`  
**SEO-tittel:** Kiropraktor i Lillestrøm – rygg, nakke, hodepine og leddplager

## H1: Kiropraktikk for rygg, nakke og andre muskel- og skjelettplager

Selv om jeg har fordypet meg i svimmelhet og funksjonell nevrologi, arbeider jeg også med det mange forbinder med vanlig kiropraktikk: smerter og funksjonsproblemer i rygg, nakke, skuldre, kjeve, hofter og andre ledd.

Jeg begynner med å høre hvordan plagene oppsto, hva som provoserer dem, og hvordan de påvirker deg. Deretter undersøker jeg blant annet bevegelighet, leddfunksjon og relevante ortopediske og nevrologiske forhold.

Når det er hensiktsmessig, kan behandlingen omfatte justeringer eller korrigeringer, øvelser og råd om aktivitet. Jeg undersøker gjerne funksjonen på nytt for å vurdere responsen.

Ved langvarige eller sammensatte problemer er jeg tydelig på forventninger. Hvis utviklingen uteblir, vurderer jeg behov for videre undersøkelser eller henvisning til annen behandler.

### Eksempler på plager

- Ryggsmerter og stivhet
- Nakkeplager
- Hodepine, blant annet mulig nakkerelatert hodepine
- Skulderplager
- Kjeveplager
- Hofte-, kne- og ankelplager

**CTA:** Bestill kiropraktortime

---

# 10. Ferdige tekstutkast – om Olve

**URL:** `/om-olve/`  
**SEO-tittel:** Om Olve Lyngset – kiropraktor, DACNB, i Lillestrøm

## H1: Om Olve Lyngset

Jeg hadde egentlig sett for meg en annen yrkesvei. Som ung spilte jeg ishockey, og etter en takling fikk jeg ryggplager. Moren min tok meg med til kiropraktor Gunn Austlid i Lillestrøm. Hjelpen jeg fikk der, gjorde så sterkt inntrykk at jeg bestemte meg for å bli kiropraktor.

Jeg utdannet meg i Davenport i Iowa, USA, og hadde praksis hos Finn Morten Halle ved Stabekk kiropraktiske klinikk. Siden har jeg arbeidet klinisk i mer enn 30 år.

Nysgjerrigheten på nervesystemet førte meg videre til omfattende etterutdanning gjennom blant annet Carrick Institute, med mye undervisning i Amsterdam. Jeg har bestått eksamen til **DACNB**, og har i tillegg videreutdannet meg innen vestibulær rehabilitering. Jeg har også deltatt på kliniske opphold i Atlanta i USA og undervist kolleger om svimmelhet og funksjonell nevrologi.

### Hva som driver meg

Det som betyr mest for meg, er når en pasient føler seg sett, får en forståelig forklaring og opplever at hverdagen blir lettere. Jeg liker å lete etter sammenhenger, undersøke grundig og finne en plan vi kan arbeide med sammen.

Jeg er ikke den rette behandleren for alle. Noen ganger må vi endre kurs, og noen ganger er det best å henvise videre. Men jeg ønsker at du skal oppleve at plagene dine blir tatt på alvor.

Jeg arbeider ved **Limbra Storgata i Lillestrøm**. Denne nettsiden er min personlige faglige nettside.

**CTA:** Bestill time / Kontakt meg

**Faktasjekk før publisering:** Eksakt navn på utdanningsinstitusjon, utdanningsår, DACNB-betegnelse og eventuell bruk av logoer/sertifiseringsmerker; nøyaktig formulering av øvrige videreutdanninger.

---

# 11. Ferdige tekstutkast – praktisk og kontakt

**URL:** `/kontakt/` og eventuelt `/praktisk/`  
**SEO-tittel:** Kontakt og timebestilling | Olve Lyngset, Lillestrøm

## H1: Bestill time hos Olve Lyngset

Jeg tar imot pasienter ved **Limbra Storgata i Lillestrøm**.

**Vanlig konsultasjon:** Bestilles fortrinnsvis via Limbra sin timebestilling.  
**Spørsmål om intensivt rehabiliteringsopphold:** Kontakt meg direkte på `kontakt@olvelyngset.no` *(opprettes før lansering)*.  
**Telefon:** Limbra-resepsjonen *(nummer bekreftes)*.

Ved svimmelhetsundersøkelse setter jeg ofte av omtrent **40–50 minutter** til første konsultasjon. Ved langvarige plager etter hjernerystelse er første konsultasjon ofte omtrent **50–60 minutter**. Faktisk varighet må bekreftes mot bookingoppsettet.

**Personvern:** Ikke send fødselsnummer, journaler eller detaljerte helseopplysninger i vanlig e-post.

### Åpne opplysninger som skal fylles inn

- Eksakt gateadresse og postnummer til Limbra Storgata
- Telefon til resepsjonen
- Bekreftet bookinglenke og eventuell direkte lenke til Olve
- Konsultasjonspriser og betalingsinformasjon
- Åpningstider / tilgjengelige dager
- Tilgjengelighet, parkering og kollektivtransport
- Om en egen telefon til Olve skal vises

---

# 12. Undersider om spesifikke svimmelhetstilstander – redaksjonell plan

Disse sidene bør ha selvstendig, faglig gjennomarbeidet innhold. Under følger anbefalt vinkling, ikke komplette publiseringsklare artikler.

## `/svimmelhet/krystallsyke/`

**H1:** Krystallsyke (BPPV): undersøkelse og behandling  
**Vinkling:** Hva krystallsyke er, typiske kortvarige stillingsutløste episoder, hvorfor korrekt undersøkelse av bueganger er viktig, at annen svimmelhet kan forekomme samtidig, og når andre årsaker må vurderes. Lenke fra `krystallsyken.no` må mappes til relevant underside. Ikke bruk kategoriske påstander om at all krystallsyke alltid viser nystagmus i enhver undersøkelse.

## `/svimmelhet/pppd/`

**H1:** PPPD – vedvarende svimmelhet og ustøhet  
**Vinkling:** Gjenkjennelige symptomer, ubehag i visuelt travle miljøer, samspill mellom anamnese, undersøkelse og tilpasset rehabilitering. Ikke framstill én test som diagnostisk for PPPD.

## `/svimmelhet/mdds/`

**H1:** MdDS – når det føles som om underlaget gynger  
**Vinkling:** Gyngende/bevegende opplevelse, mulig forbindelse til reise/bevegelse, grundig vurdering og individuell oppfølging. Unngå garantier.

## `/svimmelhet/vestibularisnevritt/`

**H1:** Vestibularisnevritt – svimmelhet og vestibulær rehabilitering  
**Vinkling:** Etter nødvendig medisinsk vurdering kan vestibulær funksjon og kompensasjon undersøkes, og øvelser tilpasses. Akutte faresignaler omtales tydelig.

## `/svimmelhet/menieres-sykdom/`

**H1:** Ménières sykdom og svimmelhet  
**Vinkling:** Forklar typiske symptomgrupper og behov for medisinsk/ØNH-vurdering. Beskriv Olves mulige rolle i vurdering av balansefunksjon og oppfølging, uten å hevde at kiropraktikk behandler selve sykdomsårsaken.

**Før publisering:** Faglig gjennomlesning, oppdaterte kilder og vurdering av hva Olve faktisk tilbyr ved hver diagnose.

---

# 13. SEO-plan

## Søkeintensjoner

**Lokale:**
- kiropraktor Lillestrøm
- svimmelhet Lillestrøm
- svimmelhetsundersøkelse Lillestrøm
- hjernerystelse rehabilitering Lillestrøm
- kiropraktor rygg nakke Lillestrøm

**Regionale/nasjonale spesialtema:**
- langvarig svimmelhet
- vedvarende svimmelhet
- PPPD behandling / rehabilitering
- MdDS Norge
- plager etter hjernerystelse
- postcommotio / postcommotiosyndrom
- vestibulær rehabilitering
- VNG / VOG svimmelhet

**Viktig:** Dette er en *hypoteseliste*, ikke dokumenterte søkevolumer eller rangeringer. Sønnen/utvikleren bør undersøke faktisk søkevolum, konkurranse og brukerintensjon før endelige SEO-prioriteringer.

## Struktur og innhold

- Én tydelig H1 per side; logisk H2/H3-struktur.
- Unike SEO-titler og metabeskrivelser; unngå duplikater.
- Egen side per betydelig pasientbehov, men ikke mange tynne diagnosesider.
- Interne lenker mellom svimmelhet, underdiagnoser, hjernerystelse, undersøkelse og intensivt opphold.
- Synlig kontaktinformasjon og lokasjon på relevante sider.
- Oppdatert faglig forfatterprofil med utdanning, erfaring og ansvar for innhold.
- Vis «sist faglig gjennomgått» på medisinske artikler der dette vedlikeholdes reelt.
- Bruk FAQ bare når spørsmålene faktisk er besvart på siden; ingen forventning om særskilte FAQ-rike resultater i Google.
- Unngå overdrevent bruk av søkeord og udokumenterte superlativer.

## Teknisk SEO

- Mobil først, rask lasting, optimaliserte bilder og video.
- Semantisk HTML, tydelig navigasjon, tilgjengelige kontraster og tastaturnavigasjon.
- HTTPS, sikker hosting, oppdateringer og sikkerhetskopier.
- XML-sitemap og korrekt `robots.txt`.
- Kanoniske URL-er, én foretrukket domenevariant og konsekvente trailing slashes.
- Korrekte 301-videresendinger fra gamle adresser, spesielt `krystallsyken.no`.
- Google Search Console og eventuelt Bing Webmaster Tools.
- Personvernvennlig statistikk; samtykkehåndtering der lovpålagt.
- Strukturert data der det passer: `Person`, `WebSite`, `BreadcrumbList` og eventuelt relevant virksomhetsinformasjon. Ikke påstå en egen klinikk eller virksomhet dersom dette er Olves personlige nettside.
- Oppdater Google Business Profile bare dersom det finnes en relevant, legitim oppføring og den kan administreres korrekt; unngå duplisert/forvirrende klinikkprofil.

## Viktig om helseinnhold

Dette er informasjon som kan påvirke helsevalg. Tekstene bør være faglig nøkterne, oppdaterte og tydelige på forskjellen mellom undersøkelser, mulige sammenhenger og dokumenterte behandlingseffekter. Ingen oppdiktede resultattall eller pasienthistorier. Pasientuttalelser og video krever egen vurdering av personvern, samtykke og relevante regler for markedsføring av helsetjenester.

---

# 14. Visuelt innhold – konkret opptaksliste

**Prioritet:** Ekte bilder av Olve og reelle arbeidsmiljøer fremfor generiske stockfoto.

| Prioritet | Motiv | Bruk |
|---|---|---|
| Høy | Godt portrett av Olve, naturlig og profesjonelt | Forside og Om Olve |
| Høy | Olve i samtale/undersøkelsessituasjon, med samtykke eller modell | Forside, undersøkelse |
| Høy | Olve med VOG/VNG-briller i bruk | Svimmelhet og undersøkelse |
| Høy | Sakkadometer/øyebevegelsestest | Hjernerystelse og undersøkelse |
| Middels | Balanseundersøkelse, for eksempel pute/Romberg | Svimmelhet |
| Middels | Klinikkens inngang eller resepsjon | Kontakt/praktisk |
| Middels | Olve ved skrivebord eller i faglig samtale | Om Olve / artikler |

**Video:** Flere anonymiserte VOG-opptak finnes. De kan eventuelt brukes pedagogisk til å vise nystagmus. Det finnes **ikke** avklart før-/etter-video som viser endring gjennom et behandlingsforløp. Unngå derfor før-/etter-påstander basert på video.

**Eksisterende YouTube-film:** `https://www.youtube.com/watch?v=7avfb-lI4Bs&t=22s` – Olve mener filmen fortsatt er brukbar. Innhold, lyd, kvalitet, rettigheter og faglig aktualitet må gjennomgås før eventuell innbygging.

**Bildepraksis:** Sjekk samtykke, anonymisering, metadata, alt-tekst, format (WebP/AVIF der hensiktsmessig) og at video ikke lekker identifiserende informasjon. Ingen oppdiktede pasientbilder eller «behandlingsresultater».

---

# 15. Bestillings- og kontaktflyt

## Vanlig pasient

1. Besøker forside eller relevant fagområde.
2. Ser tydelig **«Bestill time»**.
3. Går til bekreftet booking hos Limbra, helst forhåndsvalgt Olve hvis teknisk og avtalemessig mulig.
4. Får korrekt praktisk informasjon om sted, varighet og pris.

**Avklares med Limbra:** Kan personlig nettside bruke direkte bookinglenke? Finnes en varig lenke som filtrerer på behandler?

## Tilreisende / intensivt opphold

1. Leser siden om intensivt rehabiliteringsopphold.
2. Forstår at oppholdet må vurderes og avtales individuelt.
3. Kontakter Olve direkte på profesjonell e-post.
4. Avklarer videre prosess uten å sende sensitive opplysninger via vanlig e-post.

**Anbefalt e-postemne:** `Forespørsel om intensivt rehabiliteringsopphold`.

## CTA-tekster

- Bestill time
- Les om svimmelhet
- Les om plager etter hjernerystelse
- Slik undersøker jeg
- Forespørsel om intensivt opphold
- Kontakt Olve

---

# 16. Domener, migrering og lansering

## Domener

- `olvelyngset.no`: ønsket hoveddomene, opplyst å være tilgjengelig ved kontroll; **må kjøpes og kontrolleres på nytt**.
- `kiropraktorolvelyngset.no`: mulig defensivt domene, valgfritt. Hvis kjøpt: 301-videresend til hoveddomenet, ikke bygg duplikatnettsted.
- `krystallsyken.no`: Olve eier domenet; eksisterende innhold er under omarbeiding. Planen er å lede besøkende videre til relevant innhold på ny nettside.

## Migrering av `krystallsyken.no`

**Ikke** videresend alle gamle adresser blindt til forsiden. Lag en liste over gamle URL-er og koble hver relevant URL til nærmeste nye innhold. Eksempel: gammel artikkel om krystallsyke → `/svimmelhet/krystallsyke/`.

Før flytting: Kartlegg gamle sider, titler, eventuelle innkommende lenker og eksisterende søketrafikk. Behold eller oppdater innhold som fortsatt gir verdi. Sett opp permanente 301-videresendinger og test dem. Unngå kjeder og 404-feil.

## Lanseringssjekk

- [ ] Domenet er registrert, DNS/HTTPS virker.
- [ ] Kontaktadresse er opprettet, testet og satt opp med SPF, DKIM og DMARC.
- [ ] Bookinglenke er godkjent av Limbra og testet på mobil.
- [ ] Alle fakta, titler og utdanninger er godkjent av Olve.
- [ ] Adresse, telefon, priser og åpningstider er korrekte.
- [ ] Personvern- og cookieinformasjon er gjennomgått.
- [ ] Alle bilder/videoer er godkjent for offentlig bruk.
- [ ] Alle sider har unike titler, beskrivelser og interne lenker.
- [ ] Sitemap, indeksering og Search Console er satt opp.
- [ ] Gamle URL-er har korrekte 301-videresendinger.
- [ ] Skjemaer, lenker og knapper er testet.
- [ ] Mobilvisning, lesbarhet og hastighet er kontrollert.
- [ ] Det finnes en avtale for faglig og teknisk vedlikehold.

---

# 17. Fagartikler og Facebook – innholdsplan

Det er tidligere laget Facebook-innlegg om introduksjon og nakke/hodepine. Eksakt ordlyd er ikke inkludert her. En rytme på omtrent **ett innlegg per uke** er diskutert. Målet bør være at Facebook peker til nyttig innhold på nettstedet, ikke bare til forsiden.

**Foreslåtte temaer:**

1. Hvorfor kan man være svimmel selv om vanlige undersøkelser er normale?
2. Hva er nystagmus, og hvorfor undersøker jeg øyebevegelsene?
3. Krystallsyke – og når svimmelheten kan ha andre forklaringer.
4. PPPD: Når butikker og visuelle inntrykk blir krevende.
5. Vedvarende plager etter hjernerystelse: Å bli tatt på alvor.
6. «Gråsonen mellom syk og frisk» – hvorfor funksjon er viktig.
7. Hva skjer på en første konsultasjon ved svimmelhet?
8. Balanse: Fra målinger til trygghet i hverdagen.
9. Ryggsmerter: Hva undersøker en kiropraktor?
10. Når kan et intensivt rehabiliteringsopphold være aktuelt?

**Prinsipp:** Lag en god artikkel på nettsiden først; publiser deretter et kort, gjenkjennelig Facebook-innlegg med lenke til artikkelen.

---

# 18. Ting som er avklart – og ting som ikke er det

## Avklart gjennom intervjuet

- Personlig nettsted med navn og faglig profil: Olve Lyngset – Kiropraktor, DACNB.
- To hovedområder: svimmelhet og langvarige plager etter hjernerystelse.
- Vanlig kiropraktikk skal også være synlig.
- Pasientene skal føle seg tatt på alvor, forstå undersøkelsene og få realistisk håp.
- VOG/VNG og andre tester er viktige deler av tilnærmingen.
- Målet er bedre hverdagsfunksjon, ikke bare endringer i testresultater.
- Intensivt opphold kan tilbys enkelte tilreisende etter direkte avtale.
- Personlig profesjonell e-post er planlagt.
- Nettsiden skal gi godt grunnlag for synlighet i Google og timebestillinger.

## Må bekreftes før publisering

- Registrering av domene og opprettelse av e-post.
- Endelig teknisk løsning, hosting og vedlikeholdsansvar.
- Direkte bookinglenke og tillatelse fra Limbra.
- Adresse, telefon, åpningstider, priser og varighet i bookingsystemet.
- Nøyaktig utdanningshistorikk og bruk av DACNB-betegnelse.
- Eventuelle særskilte helserettslige/markedsføringsmessige krav.
- Godkjenning og rettigheter til bilder, video og pasientutsagn.
- Oppdatert faglig gjennomgang av diagnosetekster.
- Kartlegging av gamle URL-er på `krystallsyken.no`.
- Om eksisterende YouTube-video skal brukes.
- Endelig analyse av søkeord og konkurrenter.

## Bevisste avgrensninger

- Ingen oppgitte eller oppdiktede behandlingsprosenter, «suksessrater» eller dokumenterte før-/etter-effekter.
- Ingen påstand om at VOG, sakkadometer eller balanseprøver alene kan fastslå årsaken til sammensatte symptomer.
- Ingen påstand om at langvarige postcommotio-plager generelt er en bestemt betennelsestilstand.
- Ingen påstand om at Olve allerede har erfaring med intensivopphold for long covid.
- Ingen fremstilling av historiske kurs om barns atferdsvansker som et hovedtilbud.
- Ingen detaljer om justeringsteknikker på spedbarn.

---

# 19. Forslag til prosjektfaser

**Fase 1 – møtet:** Velg teknologi, ansvarsfordeling, domene/hosting, redigeringsmulighet og bookingstrategi.

**Fase 2 – grunnmur:** Opprett domene og e-post, bygg designkomponenter, navigasjon og maler, sett opp teknisk SEO.

**Fase 3 – innhold:** Olve godkjenner tekstutkastene. Ta autentiske bilder, kontroller VOG-materiale og fyll inn kontakt/praktisk informasjon.

**Fase 4 – publisering:** Lanser de viktigste sidene, test booking, indeksering og mobilopplevelse.

**Fase 5 – vekst:** Publiser grundige diagnosetilpassede undersider og fagartikler, koble Facebook-innlegg til nettsiden, følg med på relevante søk og juster etter faktisk brukeradferd.

---

# 20. Kort presentasjon Olve kan bruke i møtet

> «Jeg ønsker en personlig faglig nettside som gjør det enkelt å finne meg på Google og bestille time. De to viktigste områdene er svimmelhet og langvarige plager etter hjernerystelse, men vanlig kiropraktikk skal også være med. Jeg vil at pasientene skal kjenne seg igjen og oppleve at de blir tatt på alvor. Vi har allerede et ganske komplett utkast til struktur og tekst. Det jeg trenger hjelp til nå, er å velge en løsning som er rask, enkel å vedlikeholde, god på mobil og søkbar i Google – og som kan lenke til timebestillingen hos Limbra.»

---

**Neste revisjon etter møtet:** Legg inn valgt teknisk løsning, navngitte ansvarlige, bekreftet bookingoppsett, faktisk kontaktinformasjon og eventuelle endringer i sidemalene. Deretter kan dokumentet oppgraderes til en publiseringsklar versjon 1.0.
