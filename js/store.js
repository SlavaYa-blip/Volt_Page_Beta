/**
 * Volt Gießen Fraktion - State Management & Local Data Store
 * Actively manages components data including motions, members, and meeting timelines.
 */

// Centralized state container
const state = {
    // Current Active Route
    currentPath: window.location.hash || '#/',
    
    // Theme configuration
    theme: localStorage.getItem('theme') || 'light',
    
    // User submitted feedback (mock storage in memory)
    submittedFeedback: [],

    // Faction members database (Volt Gießen city council representatives and staff)
    members: [
        {
            id: 'clara-schumann',
            name: 'Dr. Clara Schumann',
            role: 'Fraktionsvorsitzende',
            image: '', // Will use CSS fallback silhouette
            email: 'clara.schumann@voltgiessen.de',
            focus: ['Mobilität', 'Finanzen', 'Stadtentwicklung'],
            committees: [
                'Haupt-, Finanz- und Beteiligungsausschuss (HFBA)',
                'Ausschuss für Stadtentwicklung, Bauen und Verkehrsplanung (ASBV)'
            ],
            bio: 'Clara ist promovierte Wirtschaftswissenschaftlerin und setzt sich seit 2021 in der Stadtverordnetenversammlung Gießen für eine evidenzbasierte, progressive Politik ein. Ihr Fokus liegt auf einer modernen Finanzplanung und der fahrradfreundlichen Umgestaltung unserer Stadt.'
        },
        {
            id: 'julian-weber',
            name: 'Julian Weber',
            role: 'Stellv. Fraktionsvorsitzender & Stadtverordneter',
            image: '',
            email: 'julian.weber@voltgiessen.de',
            focus: ['Digitalisierung', 'Klimaschutz', 'Bürgerbeteiligung'],
            committees: [
                'Ausschuss für Umwelt, Klimaschutz und Energie (AUKE)',
                'Ausschuss für Schule, Bildung und Kultur (ASBK)'
            ],
            bio: 'Julian studiert Umweltingenieurwissenschaften an der THM. Er brennt für digitale Bürgerdienste und möchte Gießen durch mutigen Klimaschutz bis 2035 klimaneutral machen. Kulturförderung ist ihm ein besonderes Anliegen.'
        },
        {
            id: 'sophia-becker',
            name: 'Sophia Becker',
            role: 'Stadtverordnete & Fraktionsgeschäftsführerin',
            image: '',
            email: 'sophia.becker@voltgiessen.de',
            focus: ['Soziales', 'Integration', 'Wohnungsbau'],
            committees: [
                'Ausschuss für Soziales, Integration, Gesundheit und Wohnungsbau (SIGW)'
            ],
            bio: 'Sophia leitet das Fraktionsbüro und vertritt Volt im Sozialausschuss. Sie kämpft für bezahlbaren Wohnraum in Gießen, soziale Teilhabe für alle Bürger und die Stärkung von Integrationsinitiativen vor Ort.'
        },
        {
            id: 'max-mustermann',
            name: 'Maximilian Krapp',
            role: 'Ehrenamtlicher Stadtrat / Magistratsmitglied',
            image: '',
            email: 'maximilian.krapp@voltgiessen.de',
            focus: ['Wirtschaft', 'Innovation', 'Sport'],
            committees: [
                'Mitglied des Magistrats der Universitätsstadt Gießen'
            ],
            bio: 'Maximilian vertritt Volt als ehrenamtlicher Stadtrat im Magistrat. Er bringt langjährige Erfahrung aus der lokalen Startup-Szene mit und setzt sich für Wirtschaftsförderung, Vereinsarbeit und moderne Sportstätten ein.'
        }
    ],

    // Political Motions (Anträge) database
    motions: [
        {
            id: 'AN-2026-04',
            title: 'Ausbau des Fahrradstraßenrings um den Gießener Anlagenring',
            date: '2026-04-12',
            category: 'Mobilität',
            status: 'approved', // draft | submitted | committee | approved | rejected
            proposer: 'Fraktion Volt Gießen',
            summary: 'Dieser Antrag fordert die Umwidmung der rechten Spur auf dem Anlagenring zur Fahrradstraße mit baulicher Trennung, um eine sichere, geschützte Raddurchquerung der Innenstadt zu gewährleisten.',
            detail: `BEGRÜNDUNG:\n\nDer Anlagenring in Gießen ist eine zentrale Verkehrsader, die derzeit stark autodominiert ist. Um die Mobilitätswende lokal voranzutreiben, benötigt Gießen eine sichere, kreuzungsfreie und attraktive Radinfrastruktur rund um das Stadtzentrum.\n\nDer Antrag sieht vor:\n1. Die Einrichtung einer dauerhaft abgetrennten Radspur (Pop-Up-Modell oder dauerhafte bauliche Trennung) auf der Innenseite des Anlagenrings.\n2. Eine optimierte Ampelschaltung für den Radverkehr (Grüne Welle bei 18 km/h).\n3. Die Einbindung der Gießener Bürger über digitale Foren vor der finalen baulichen Umsetzung.\n\nDurch diese Maßnahme wird der Radverkehr in Gießen substantiell sicherer gemacht, das Klima geschont und die Lebensqualität im unmittelbaren Innenstadtbereich erhöht.`
        },
        {
            id: 'AN-2026-03',
            title: 'Einführung eines digitalen Bürgerbüros für Verwaltungsleistungen',
            date: '2026-03-22',
            category: 'Digitalisierung',
            status: 'committee',
            proposer: 'Fraktion Volt Gießen, Fraktion B90/Die Grünen',
            summary: 'Volt beantragt die Digitalisierung von Standardleistungen wie Wohnsitzanmeldung und Parkausweisen. Ein neues Onlineportal soll Anträge papierlos und rund um die Uhr ermöglichen.',
            detail: `BEGRÜNDUNG:\n\nBürgerinnen und Bürger in Gießen klagen häufig über lange Wartezeiten im Einwohnermeldeamt. Eine konsequente Digitalisierung der kommunalen Dienstleistungen nach dem Vorbild europäischer Best Practices (z.B. Estland) löst dieses Nadelöhr.\n\nWir beantragen:\n1. Dass die Stadtverwaltung Gießen bis zum IV. Quartal 2026 ein Portal bereitstellt, über welches Standardanträge (Wohnsitzummeldung, Ausweisstatusabfragen, Bewohnerparkausweise) digital durchgeführt und verifiziert werden können.\n2. Die Einbindung des Personalausweises mit Online-Ausweisfunktion (eID).\n3. Die Schulung von städtischen Mitarbeitenden zur Umstellung der Workflows auf papierlose Sachbearbeitung.\n\nDamit entlasten wir sowohl die Bürger als auch das Personal im Rathaus.`
        },
        {
            id: 'AN-2026-02',
            title: 'Klimaneutralität Gießen 2035 - Solarpflicht auf öffentlichen Dächern',
            date: '2026-02-18',
            category: 'Klima & Energie',
            status: 'approved',
            proposer: 'Fraktion Volt Gießen',
            summary: 'Die Stadt soll verpflichtet werden, bis Ende 2028 alle kommunalen Dachflächen (Schulen, Sporthallen, Verwaltungsbauten) vollständig mit Photovoltaikanlagen auszustatten.',
            detail: `BEGRÜNDUNG:\n\nDer Klimawandel erfordert rasches kommunales Handeln. Die Stadt Gießen muss mit gutem Beispiel vorangehen. Öffentliche Dächer bieten ungenutztes Potenzial für die Solarstromerzeugung.\n\nDer Antrag beschließt:\n1. Eine flächendeckende Potenzialanalyse aller städtischen Dachflächen bis Ende des Jahres.\n2. Eine verbindliche Staffelung zum Zubau von Solaranlagen auf diesen Dächern mit Abschluss im Jahr 2028.\n3. Finanzierung über Bürgerenergiegenossenschaften, um den Gießenerinnen und Gießenern eine direkte finanzielle Beteiligung an der Energiewende vor Ort zu ermöglichen.`
        },
        {
            id: 'AN-2026-01',
            title: 'Konzept für temporäre Fußgängerzonen ("Sommerstraßen")',
            date: '2026-01-05',
            category: 'Stadtentwicklung',
            status: 'rejected',
            proposer: 'Fraktion Volt Gießen',
            summary: 'Einrichtung von Sommerstraßen in Gießener Wohnquartieren, bei denen in den Sommermonaten Parkplätze und Fahrbahnen zu Begegnungszonen und Spielflächen umfunktioniert werden.',
            detail: `BEGRÜNDUNG:\n\nIn dicht besiedelten Vierteln wie der Gießener Nordstadt oder dem Seltersweg-Umfeld mangelt es an Freiflächen. Sommerstraßen haben in europäischen Metropolen gezeigt, dass sie Nachbarschaften beleben.\n\nDer Antrag wurde abgelehnt, da die Mehrheit der Stadtverordnetenversammlung Bedenken hinsichtlich des Wegfalls von Anwohnerparkplätzen und des Verkehrsflusses äußerte. Volt wird dennoch an alternativen Konzepten zur Quartiersbelebung arbeiten.`
        },
        {
            id: 'AN-2025-11',
            title: 'Einrichtung eines Jugendparlaments mit Rede- und Antragsrecht',
            date: '2025-11-14',
            category: 'Bürgerbeteiligung',
            status: 'submitted',
            proposer: 'Fraktion Volt Gießen',
            summary: 'Die Stimmen junger Menschen müssen gehört werden. Wir fordern die Wahl eines städtischen Jugendparlaments, das ein direktes Antragsrecht in der Stadtverordnetenversammlung erhält.',
            detail: `BEGRÜNDUNG:\n\nJugendliche in Gießen werden in politischen Willensbildungsprozessen unzureichend repräsentiert. Ein offiziell gewähltes Jugendparlament gibt der Altersgruppe zwischen 14 und 21 Jahren eine institutionalisierte Stimme.\n\nDer Entwurf fordert:\n1. Die Ausarbeitung einer Wahlordnung für ein Gießener Jugendparlament.\n2. Die Bereitstellung eines jährlichen Budgets von 15.000 € zur freien Verfügung des Parlaments.\n3. Das Einräumen eines beratenden Sitzes sowie eines Antragsrechts im Ausschuss für Schule, Bildung und Kultur.`
        },
        {
            id: 'AN-2025-10',
            title: 'Verbindliche Frauenquote in Aufsichtsräten städtischer Gesellschaften',
            date: '2025-10-02',
            category: 'Soziales',
            status: 'approved',
            proposer: 'Fraktion Volt Gießen, Fraktion SPD',
            summary: 'Aufsichtsräte städtischer Töchter (z.B. Stadtwerke Gießen, Mittelhessische Wohnungsbau) sollen künftig paritätisch mit Frauen und Männern besetzt werden.',
            detail: `BEGRÜNDUNG:\n\nDie öffentliche Hand hat eine Vorbildfunktion bei der Gleichstellung. Derzeit sind Aufsichtsorgane städtischer Unternehmen in Gießen mehrheitlich männlich besetzt. Diesen Zustand beenden wir mit diesem Beschluss zur Parität.`
        }
    ],

    // Faction events timeline
    timeline: [
        {
            id: 'evt-01',
            date: '28. Mai 2026',
            time: '19:30 Uhr',
            title: 'Öffentliche Fraktionssitzung (Digital)',
            category: 'Fraktionsarbeit',
            desc: 'Wir diskutieren die Anträge für die kommende Stadtverordnetenversammlung. Alle interessierten Bürgerinnen und Bürger sind herzlich eingeladen. Den Zoom-Link senden wir nach Anmeldung.',
            location: 'Online via Zoom'
        },
        {
            id: 'evt-02',
            date: '11. Juni 2026',
            time: '16:00 Uhr',
            title: 'Sitzung der Stadtverordnetenversammlung Gießen',
            category: 'Plenum',
            desc: 'Reguläre Plenarsitzung im Gießener Rathaus (Konzertsaal). Unsere Anträge zum Fahrradring und zum Bürgerbüro stehen auf der Tagesordnung. Komm auf die Zuschauertribüne!',
            location: 'Rathaus Gießen, Konzertsaal (Berliner Platz)'
        },
        {
            id: 'evt-03',
            date: '20. Juni 2026',
            time: '14:00 Uhr',
            title: 'Bürgerdialog: Mobilitätswende für Gießen',
            category: 'Dialog',
            desc: 'Diskutiert mit unseren Stadtverordneten bei einer Radtour entlang des Anlagenrings über Verkehrsplanung, Sicherheit und lebenswerte Straßen. Treffpunkt am Gießener Stadttheater.',
            location: 'Treffpunkt: Vorplatz Stadttheater Gießen'
        },
        {
            id: 'evt-04',
            date: '02. Juli 2026',
            time: '18:00 Uhr',
            title: 'Sitzung des Ausschusses für Umwelt und Klimaschutz',
            category: 'Ausschuss',
            desc: 'Beratung über unseren Antrag zur Solarpflicht auf öffentlichen Dachflächen. Die Sitzung ist öffentlich.',
            location: 'Rathaus Gießen, Raum 102'
        }
    ],

    // Press updates and blog news
    news: [
        {
            id: 'news-01',
            title: 'Stadt Gießen veröffentlich den Klimabericht 2025',
            date: '2026-04-27',
            category: 'Öffentliche Mitteilung',
            tags: ['Klima','Mobilität', 'Fahrradverkehr'],
            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?fit=crop&w=900&h=500&q=80',
            summary: 'Gießen macht Fortschritte, aber es ist noch viel aufzuholen.',
            body: `Gießen, den 27. April 2026 – Der 53 Seitige Klimabericht der Stadt Gießen wurde veröffentlicht. Er zeigt die Fortschritte im Klimaschutz und die noch ausstehenden Maßnahmen.
Was der Bericht zeigt:

Die Stadt Gießen hat 2024 insgesamt 588.079 t THG-Emissionen ausgestoßen – das sind 4,4 % mehr als 2023, dem bisher besten Jahr. Das Ziel: Treibhausgasneutralität bis 2035.
Das Kernproblem dabei: In 34 Jahren (1990–2024) wurden pro Kopf rund 45,7 % der Emissionen eingespart. In den verbleibenden 11 Jahren müssen noch 54,3 % weg – jährlich ca. 49.000 t. Das ist strukturell kaum erreichbar ohne drastische Maßnahmen.
Sektoren im Überblick:

Der Verkehr ist mit 39 % der größte Emittent und ist 2024 um fast 10 % gewachsen. Die Wärme entwickelt sich positiv (Verbrauch sinkt auch witterungsbereinigt). Der Stromsektor verschlechtert sich, obwohl der Verbrauch nur leicht stieg – weil der Emissionsfaktor des Bundesstrommixes 2024 deutlich höher angesetzt wurde (505 statt 472 g/kWh).
Positiv: PV-Leistung wuchs um 21,8 %. Die kommunale Wärmeplanung wurde 2025 beschlossen. 92 neue Fernwärmeanschlüsse wurden gelegt.

Kritische Punkte aus Volt-Perspektive

1. Die Zielkurve ist unrealistisch, aber niemand sagt es klar
Der Bericht stellt die Lücke sachlich dar, ohne politische Konsequenzen zu benennen. 34 Jahre für 45,7 % – 11 Jahre für 54,3 %: Das ist keine lineare Herausforderung, das ist eine Verdreifachung des nötigen Jahrestempos. Volt sollte im Parlament explizit fragen, welche konkreten Maßnahmen diesen Sprung rechtfertigen sollen.

2. Verkehr bleibt das größte Problem – mit unzureichendem Tempo
Viele Mobilitätsmaßnahmen sind noch in Planung oder Prüfung. Die erste Nahverkehrsplan-Stufe kommt erst Januar 2026, die zweite Ende 2026. Die Machbarkeitsstudien für Vogelsbergbahn und RegioTram laufen noch. Das ist zu langsam für ein 2035-Ziel.

3. Der Anteil erneuerbarer Energien am Strom ist gesunken – von 45,9 % auf 42,4 % – obwohl PV zugebaut wurde. Ursache: Ausfall von Biomethan in KWK-Anlagen durch Lieferanteninsolvenz. Das zeigt eine gefährliche Abhängigkeit von einzelnen privaten Lieferketten ohne stadtplanerische Absicherung.

4. Mittelfristiger Maßnahmenplan läuft 2026 aus – ohne sichtbare Nachfolgeplanung für die neue Legislatur. Volt sollte darauf drängen, dass ein bindender Plan für 2027–2030 bereits jetzt vorbereitet wird, nicht erst nach der Wahl.

5. Berichtsformat soll vereinfacht werden – laut Bürgermeister-Vorwort. Das klingt nach mehr Transparenz, birgt aber das Risiko, dass technische Tiefe verloren geht, die für politische Kontrolle nötig ist. Volt sollte klar machen, dass Transparenz kein Ersatz für Verbindlichkeit ist. `
        },
        {
            id: 'news-01b',
            title: 'Fahrradring kommt voran: Volt-Antrag findet breite Zustimmung im Ausschuss',
            date: '2026-05-18',
            category: 'Pressemitteilung',
            tags: ['Mobilität', 'Fahrradverkehr'],
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?fit=crop&w=700&h=200&q=80',
            summary: 'Gießen macht einen großen Schritt Richtung Verkehrswende. Unser Antrag, den Gießener Anlagenring für Radfahrende sicherer zu machen, passierte gestern Abend erfolgreich den Verkehrsausschuss.',
            body: `Gießen, den 18. Mai 2026 – Der Entwurf der Volt-Fraktion zur Umwidmung einer Fahrspur auf dem Gießener Anlagenring in eine baulich geschützte Fahrradspur stößt auf breite Zustimmung. Gestern Abend votierte der zuständige Fachausschuss für Stadtentwicklung, Bauen und Verkehrsplanung mehrheitlich für den Antrag.\n\n„Ein geschützter Fahrradring ist das Herzstück einer modernen innerstädtischen Mobilität”, so Clara Schumann, Fraktionsvorsitzende. „Wir freuen uns, dass die anderen Fraktionen die Dringlichkeit erkannt haben. Dies ist ein starkes Signal für die Gießenerinnen und Gießener, die täglich mit dem Rad pendeln.”\n\nNun muss das Plenum der Stadtverordnetenversammlung am 11. Juni das Konzept final beschließen. Volt wirbt weiter aktiv bei allen Kräften im Haus für eine schnelle Umsetzung.`
        },
        {
            id: 'news-02',
            title: 'Stadtverwaltung Gießen verschläft die Digitalisierung – Volt fordert Taten',
            date: '2026-04-30',
            category: 'Blogbeitrag',
            tags: ['Digitalisierung', 'Bürgerbüro'],
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fit=crop&w=700&h=200&q=80',
            summary: 'Lange Schlangen im Bürgeramt und wochenlanges Warten auf Termine frustrieren. Gießen muss digitaler werden. Julian Weber nimmt im Blog Stellung zu unserem jüngsten Antrag.',
            body: `Es ist das Jahr 2026 und wer in Gießen einen Wohnsitz anmelden möchte, benötigt oft viel Geduld. Die Terminvergabe ist überlastet, Formulare müssen ausgedruckt und händisch unterschrieben werden.\n\n„Das geht im europäischen Vergleich wesentlich effizienter”, erklärt Julian Weber, stellvertretender Fraktionsvorsitzender. „Unser Antrag für ein digitales Bürgerbüro zielt darauf ab, bürokratische Hürden abzubauen. Wir fordern papierlose, verifizierte Online-Anträge. Bürgerdienste müssen rund um die Uhr, mobil und barrierefrei verfügbar sein. Es ist Zeit, dass Gießen endlich im digitalen Zeitalter ankommt.”`
        },
        {
            id: 'news-03',
            title: 'Stellungnahme zum städtischen Haushalt 2026',
            date: '2026-04-10',
            category: 'Stellungnahme',
            tags: ['Haushalt', 'Finanzen'],
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?fit=crop&w=700&h=200&q=80',
            summary: 'Investitionen in Bildung, Klimaschutz und Radwege müssen Priorität haben. Lesen Sie hier die Haushaltsrede unserer Fraktionsvorsitzenden Dr. Clara Schumann.',
            body: `In der jüngsten Beratung zum städtischen Haushalt 2026 legte Dr. Clara Schumann die Schwerpunkte von Volt dar: Gießen muss trotz knapper Kassen zukunftsfähig investieren.\n\n„Wer beim Klimaschutz und der Schulsanierung spart, zahlt morgen das Dreifache”, warnte Schumann in ihrer Rede. Volt forderte erfolgreich Nachbesserungen beim Budget für Schulsanierungen sowie zusätzliche Mittel zur Planungsförderung von Photovoltaikprojekten auf städtischen Hallendächern.`
        }
    ],

    // Core policy pillars
    pillars: [
        {
            id: 'pillar-mobility',
            title: 'Clevere Mobilität',
            icon: '🚲',
            desc: 'Verkehr neu denken. Wir wollen einen sicheren Fahrradring um die Innenstadt, einen verlässlichen und bezahlbaren Nahverkehr im 10-Minuten-Takt und die Verkehrsberuhigung von Wohnquartieren, damit Straßen wieder zu Lebensräumen werden.',
            points: [
                'Baulich getrennte Radwege an Hauptverkehrsstraßen (Protected Bike Lanes)',
                '10-Minuten-Takt für alle Gießener Buslinien zu Stoßzeiten',
                'Erhöhung der Barrierefreiheit an allen Kreuzungen und Bushaltestellen',
                'Quartiersgaragen zur Entlastung des öffentlichen Straßenraums von parkenden Autos'
            ]
        },
        {
            id: 'pillar-climate',
            title: 'Klimaneutrales Gießen 2035',
            icon: '🌱',
            desc: 'Kommunaler Klimaschutz durch konkretes Handeln. Wir treiben den massiven Ausbau von Photovoltaik und Windkraft voran, wollen das Gießener Fernwärmenetz dekarbonisieren und fördern begrünte Dächer und Fassaden gegen Hitzeinseln.',
            points: [
                'Photovoltaik-Pflicht auf allen geeigneten öffentlichen Gebäuden bis 2028',
                'Erstellung eines verbindlichen Wärmeplans zur Umstellung auf geothermische Netze',
                'Förderprogramme für Dach- und Fassadenbegrünungen im Stadtgebiet',
                'Erweiterung der Grünflächen und Baumpflanzungen in der Kernstadt'
            ]
        },
        {
            id: 'pillar-digital',
            title: 'Digitales & transparentes Rathaus',
            icon: '💻',
            desc: 'Verwaltung muss Dienstleister sein. Wir fordern ein volldigitales Bürgerbüro, offene Daten im städtischen Datenportal (Open Data) und die Live-Übertragung von Stadtverordnetensitzungen im Internet zur Förderung der Transparenz.',
            points: [
                'Wohnsitzummeldung und Parkausweise papierlos online beantragen',
                'Aufbau eines transparenten Ratsinformationssystems mit Volltextsuche',
                'Open-Data-Portal der Stadtwerke und Ämter zur freien Nutzung für Forschung & Wirtschaft',
                'Livestreaming aller Ausschuss- und Stadtverordnetensitzungen für maximale Teilhabe'
            ]
        },
        {
            id: 'pillar-social',
            title: 'Lebenswerte & soziale Stadt',
            icon: '🇪🇺',
            desc: 'Zusammenhalt und Teilhabe fördern. Gießen ist bunt und europäisch. Wir setzen uns ein für die Schaffung von bezahlbarem Wohnraum, die aktive Beteiligung von Jugendlichen und die Stärkung von Toleranz und Vielfalt.',
            points: [
                'Einführung einer Quote für geförderten Wohnungsbau bei Neuentwicklungen',
                'Gründung eines stimmberechtigten Gießener Jugendparlaments',
                'Stärkung der Antidiskriminierungsstelle und lokaler Integrationsangebote',
                'Kostenfreie Bereitstellung von Menstruationsartikeln an Schulen und Uni-Gebäuden'
            ]
        }
    ]
};

// Global Store Observers/Subscribers
const listeners = [];

export const store = {
    // Read state
    getState() {
        return state;
    },

    // Subscribe to state modifications
    subscribe(listener) {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    },

    // Dispatch update
    notify() {
        listeners.forEach(listener => listener(state));
    },

    // Update path (Routing)
    setPath(path) {
        state.currentPath = path;
        this.notify();
    },

    // Toggle color schemes (Light / Dark)
    toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        
        const root = document.documentElement;
        if (state.theme === 'dark') {
            root.classList.add('dark-theme');
        } else {
            root.classList.remove('dark-theme');
        }
        
        this.notify();
    },

    // Setup initial theme on load
    initTheme() {
        const root = document.documentElement;
        if (state.theme === 'dark') {
            root.classList.add('dark-theme');
        } else {
            root.classList.remove('dark-theme');
        }
    },

    // Add citizen feedback item
    addFeedback(feedbackItem) {
        const item = {
            id: 'feedback-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...feedbackItem
        };
        state.submittedFeedback.push(item);
        console.log('Feedback submitted to store:', item);
        this.notify();
        return true;
    },

    // Fetch single member details by id
    getMemberById(id) {
        return state.members.find(m => m.id === id);
    },

    // Fetch single motion details by id
    getMotionById(id) {
        return state.motions.find(m => m.id === id);
    },

    // Filter and search motions
    queryMotions(query = '', statusFilter = 'all', categoryFilter = 'all') {
        return state.motions.filter(m => {
            const matchesQuery = query === '' || 
                m.title.toLowerCase().includes(query.toLowerCase()) ||
                m.id.toLowerCase().includes(query.toLowerCase()) ||
                m.summary.toLowerCase().includes(query.toLowerCase());
                
            const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
            const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
            
            return matchesQuery && matchesStatus && matchesCategory;
        });
    },

    // Fetch single news entry by id
    getNewsById(id) {
        return state.news.find(n => n.id === id);
    }
};
export default store;
