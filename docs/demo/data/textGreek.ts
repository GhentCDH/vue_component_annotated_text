import { Annotation } from "@ghentcdh/vue-component-annotated-text";
import { annotations } from "./annotations";
import { annotationsWithGutters } from "./annotations-some-gutters";
import { lines } from "./line";
import { largeAnnotations } from "./large_annotation_set";
import { largeTextLines } from "./large_text";

export const text =
  "1.Χ[αι]ρήμ[ων] Ἀπολλωνίωι τῶι\n2.[φι]λτάτωι χαίρειν.\n3.καὶ διʼ ἑτ[έρας ἐπι]στολῆς ἔγραψά σοι, ἵνα δύο \n4.ἀρτάβαι σει[ταρίου](*)ἰδισθῶσί(*) μοι, ἐπεὶ λείαν(*) ἐκο-\n5.λάσθημεν [  ̣  ̣  ̣  ̣  ̣] ἄδελφε μου, Ἰσίδωρον ἔπεμ-\n6.ψα τούτου εἵνε[κα](*), [ἵ]να μ[ο]ι εὐθέως πεμφθῶσι\n7.καὶ κρειθὴ(*)[  ̣  ̣  ̣]ειδ[  ̣  ̣]ου Σαραπᾶς εἰς λόγον\n8.ναύλου [  ̣  ̣  ̣  ̣  ̣  ̣] οἴνου (δραχμὰς)δ(τετρώβολον). ἐὰν μὲν οὖν\n9.δῶι τὸ [  ̣  ̣  ̣  ̣  ̣]αδ[  ̣  ̣]ν, ἄριστα· ἐὰν δὲ μὴ λαβὼν\n10.παρα[  ̣  ̣  ̣  ̣][ χ]αλκὸν ναυλῶσαι ὀνάριον καὶ\n11.εὐθ[έως ][  ̣  ̣  ̣  ̣][ κο]μισθήτω· μόλις γὰρ ἡμερῶν\n12.δύο [  ̣  ̣  ̣  ̣  ̣  ̣]ομεν· γράφω οὖν σοι, ἵνα εἰδῇς\n13.τὴ[ν ][  ̣  ̣  ̣  ̣  ̣][ θε]ῶν δὲ βουλομένων καὶ αὐτὸς\n14.ἐλ̣[πίζω(?)](*)[Παῦ]νι κε κατελθεῖν. λέγεται γὰρ τὸν ἄνθρω-\n15.πο[ν ][  ̣  ̣  ̣  ̣][ εἰ]ς Ἀλεξ[άν]δρει[α]ν τοῦ πορεύεσθαι χάριν\n16.δ[- ca.9 -]ια  ̣  ̣νω[  ̣  ̣  ̣  ̣] π[α]ρὰ θεοῖς πᾶσι\n17.δια[  ̣  ̣  ̣  ̣  ̣]λωι μετὰ τῶν ἐμῶν δράσειν\n18.περ  ̣[  ̣  ̣  ̣  ̣  ̣  ̣]ησωι ἐπὶ σὲ προσεπιπαρακαλέσωι(*)\n19.περὶ τῶ[ν ][  ̣]  ̣[  ̣]μένων αἰσθόμενός σου τὴν εἴς με\n20.φιλοφ[ροσ]ύ[νην]. φρόντισον δʼ ἐμοῦ χορίου δερμάτ(ων)\n21.ἑξακοσίων  καὶ σφράγεισον(*) τὸ σειτάριον(*) καὶ τὴν\n22.κρειθὴν(*)δ[ηλώ]σας(*) μοι, π[ο]ίωι μέτρωι ἔπεμψας.\n23.ἀσπάζου   ̣  ̣[  ̣]  ̣  ̣  ̣ πάντ[α] σου παιδία, μεθʼ ὧν ἔ̣[σ]ῃ̣\n24.[ἔ]ρρω(σο). Φαρμο(ῦθι)κβ.\n25.πέμψον δὲ ἡμεῖν(*) κινάρας. ";

export const greekText = {
  text,
  annotations: annotations,
  annotationsWithGutters: annotationsWithGutters,
  lines: lines,
};

export const largeGreekText = {
  annotations: largeAnnotations as Annotation[],
  text: largeTextLines.map((line) => `${line.gutter} ${line.text}`).join("\n"),
  lines: largeTextLines,
};
