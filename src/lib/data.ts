import { Annotation, Paragraph } from '../types'

export const textTest =
	'0.23456  9\n1.34567890123456789\n1.3   789\n123456a.\n\n5.lorem ipsum'

export const textGreek = "1.Χ[αι]ρήμ[ων] Ἀπολλωνίωι τῶι\n2.[φι]λτάτωι χαίρειν.\n3.καὶ διʼ ἑτ[έρας ἐπι]στολῆς ἔγραψά σοι, ἵνα δύο \n4.ἀρτάβαι σει[ταρίου](*)ἰδισθῶσί(*) μοι, ἐπεὶ λείαν(*) ἐκο-\n5.λάσθημεν [  ̣  ̣  ̣  ̣  ̣] ἄδελφε μου, Ἰσίδωρον ἔπεμ-\n6.ψα τούτου εἵνε[κα](*), [ἵ]να μ[ο]ι εὐθέως πεμφθῶσι\n7.καὶ κρειθὴ(*)[  ̣  ̣  ̣]ειδ[  ̣  ̣]ου Σαραπᾶς εἰς λόγον\n8.ναύλου [  ̣  ̣  ̣  ̣  ̣  ̣] οἴνου (δραχμὰς)δ(τετρώβολον). ἐὰν μὲν οὖν\n9.δῶι τὸ [  ̣  ̣  ̣  ̣  ̣]αδ[  ̣  ̣]ν, ἄριστα· ἐὰν δὲ μὴ λαβὼν\n10.παρα[  ̣  ̣  ̣  ̣][ χ]αλκὸν ναυλῶσαι ὀνάριον καὶ\n11.εὐθ[έως ][  ̣  ̣  ̣  ̣][ κο]μισθήτω· μόλις γὰρ ἡμερῶν\n12.δύο [  ̣  ̣  ̣  ̣  ̣  ̣]ομεν· γράφω οὖν σοι, ἵνα εἰδῇς\n13.τὴ[ν ][  ̣  ̣  ̣  ̣  ̣][ θε]ῶν δὲ βουλομένων καὶ αὐτὸς\n14.ἐλ̣[πίζω(?)](*)[Παῦ]νι κε κατελθεῖν. λέγεται γὰρ τὸν ἄνθρω-\n15.πο[ν ][  ̣  ̣  ̣  ̣][ εἰ]ς Ἀλεξ[άν]δρει[α]ν τοῦ πορεύεσθαι χάριν\n16.δ[- ca.9 -]ια  ̣  ̣νω[  ̣  ̣  ̣  ̣] π[α]ρὰ θεοῖς πᾶσι\n17.δια[  ̣  ̣  ̣  ̣  ̣]λωι μετὰ τῶν ἐμῶν δράσειν\n18.περ  ̣[  ̣  ̣  ̣  ̣  ̣  ̣]ησωι ἐπὶ σὲ προσεπιπαρακαλέσωι(*)\n19.περὶ τῶ[ν ][  ̣]  ̣[  ̣]μένων αἰσθόμενός σου τὴν εἴς με\n20.φιλοφ[ροσ]ύ[νην]. φρόντισον δʼ ἐμοῦ χορίου δερμάτ(ων)\n21.ἑξακοσίων  καὶ σφράγεισον(*) τὸ σειτάριον(*) καὶ τὴν\n22.κρειθὴν(*)δ[ηλώ]σας(*) μοι, π[ο]ίωι μέτρωι ἔπεμψας.\n23.ἀσπάζου   ̣  ̣[  ̣]  ̣  ̣  ̣ πάντ[α] σου παιδία, μεθʼ ὧν ἔ̣[σ]ῃ̣\n24.[ἔ]ρρω(σο). Φαρμο(ῦθι)κβ.\n25.πέμψον δὲ ἡμεῖν(*) κινάρας. "

export const annotations = [
	{
		start: 5,
		end: 9,
		class: 'annotation annotation--color-1',
		target: 'span',
		metadata: { id: 1 },
		label: 'typo',
	},
	{
		start: 23,
		end: 36,
		class: 'annotation annotation--color-3',
		target: 'span',
		metadata: { id: 2 },
		label: 'syntax',
	},
	{
		start: 3,
		end: 6,
		class: 'annotation annotation--color-2',
		target: 'span',
		metadata: { id: 3 },
		label: 'unit',
	},
	{
		start: 5,
		end: 9,
		class: 'annotation annotation--color-1',
		target: 'gutter',
		metadata: { id: 4 },
		label: 'typo',
	},
	{
		start: 5,
		end: 34,
		class: 'annotation annotation--color-2',
		target: 'gutter',
		metadata: { id: 5 },
		label: 'syntax',
	},

	{
		start: 36,
		end: 55,
		class: 'annotation annotation--color-3',
		target: 'gutter',
		metadata: { id: 5 },
		label: 'syntax',
	},
	{
		start: 23,
		end: 36,
		class: 'annotation annotation--color-4',
		target: 'gutter',
		metadata: { id: 5 },
		label: 'syntax',
	},
	{
		start: 30,
		end: 50,
		class: 'annotation annotation--color-5',
		target: 'gutter',
		metadata: { id: 5 },
		label: 'syntax',
	},
	{
		start: 0,
		end: 56,
		class: 'annotation annotation--color-6',
		target: 'gutter',
		metadata: { id: 5 },
		label: 'syntax',
	},
	{
		start: 3,
		end: 6,
		class: 'annotation annotation--color-7',
		target: 'gutter',
		metadata: { id: 6 },
		label: 'unit',
	},
] satisfies Annotation[]

export const testAnnotations = [{"start":1,"end":89,"class":"annotation annotation--color-3","target":"span","label":"gts","metadata":{"id":3004789}},{"start":3,"end":3756,"class":"annotation annotation--color-5","target":"gutter","label":"handshift","metadata":{"id":1900230}},{"start":21,"end":30,"class":"annotation annotation--color-4","target":"span","label":"typography","metadata":{"id":576750}},{"start":44,"end":57,"class":"annotation annotation--color-5","target":"span","label":"typography","metadata":{"id":576751}},{"start":72,"end":85,"class":"annotation annotation--color-6","target":"span","label":"typography","metadata":{"id":576752}},{"start":87,"end":94,"class":"annotation annotation--color-1","target":"span","label":"orthography","metadata":{"id":147849}},{"start":89,"end":710,"class":"annotation annotation--color-2","target":"gutter","label":"gts","metadata":{"id":3004788}},{"start":95,"end":101,"class":"annotation annotation--color-2","target":"span","label":"orthography","metadata":{"id":147850}},{"start":111,"end":119,"class":"annotation annotation--color-3","target":"span","label":"orthography","metadata":{"id":147851}},{"start":126,"end":141,"class":"annotation annotation--color-1","target":"span","label":"typography","metadata":{"id":443498}},{"start":150,"end":213,"class":"annotation annotation--color-5","target":"span","label":"morpho_syntactical","metadata":{"id":277229}},{"start":175,"end":193,"class":"annotation annotation--color-2","target":"span","label":"typography","metadata":{"id":443499}},{"start":214,"end":220,"class":"annotation annotation--color-7","target":"span","label":"typography","metadata":{"id":576753}},{"start":316,"end":361,"class":"annotation annotation--color-6","target":"span","label":"morpho_syntactical","metadata":{"id":277230}},{"start":335,"end":338,"class":"annotation annotation--color-1","target":"span","label":"morpho_syntactical","metadata":{"id":1445646}},{"start":375,"end":392,"class":"annotation annotation--color-3","target":"span","label":"typography","metadata":{"id":443500}},{"start":422,"end":483,"class":"annotation annotation--color-7","target":"span","label":"morpho_syntactical","metadata":{"id":277231}},{"start":470,"end":483,"class":"annotation annotation--color-8","target":"span","label":"typography","metadata":{"id":576754}},{"start":484,"end":597,"class":"annotation annotation--color-9","target":"span","label":"morpho_syntactical","metadata":{"id":277233}},{"start":484,"end":516,"class":"annotation annotation--color-8","target":"span","label":"morpho_syntactical","metadata":{"id":277232}},{"start":579,"end":636,"class":"annotation annotation--color-4","target":"span","label":"morpho_syntactical","metadata":{"id":100911}},{"start":710,"end":759,"class":"annotation annotation--color-4","target":"span","label":"gts","metadata":{"id":3004790}},{"start":715,"end":725,"class":"annotation annotation--color-9","target":"span","label":"typography","metadata":{"id":576755}}] as Annotation[]

export const paragraphs = [
	{
		start: 0,
		end: 10,
		lines: [],
	},
] satisfies Paragraph[]