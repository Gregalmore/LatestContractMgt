import React from 'react';
import { LegalDocumentVariables, formatLegalDocument, LegalDocumentHeader, LegalDocumentFooter } from './legal-document-base';


interface FormProducerAgreementTemplateProps {
  variables: LegalDocumentVariables;
}


export const FormProducerAgreementTemplate: React.FC<FormProducerAgreementTemplateProps> = ({ variables }) => {
  const {
    artist = 'Company',
    producerCompany = 'Lender Company',
    producer = 'Producer',
    professionalArtistName = 'Artist',
    companyAddress = 'To be provided',
    companyContact = 'To be provided',
    companyEmail = 'To be provided',
    companyPhone = 'To be provided',
    lenderAddress = 'To be provided',
    lenderContact = 'To be provided',
    lenderEmail = 'To be provided',
    lenderPhone = 'To be provided',
    numberOfMasters = '0',
    compositionTitle = 'Composition Title',
    advance = '0',
    royaltyRate = '0',
    date = '',
    distributionAgreementDate = ''
  } = variables;


  const templateContent = `# PRODUCER AGREEMENT

This agreement ("Agreement") dated as of ${date || 'To be dated'} sets forth the material terms of the agreement between ${artist} ("Company", "we" or "us") and ${producerCompany} ("Lender" or "you") f/s/o ${producer} ("Producer") for Producer's non-exclusive co-production services in connection with the master recording(s) set forth below featuring the recorded performance(s) of the artist professionally known as ${professionalArtistName} ("Artist") recorded in connection with and/or for possible inclusion on, among other things, Artist's upcoming release (the "Release") subject to Artist's exclusive recording agreement with Republic Records, a division of UMG Recordings, Inc., and Universal Arabic Music (collectively, "Distributor"), dated as of ${distributionAgreementDate || 'To be provided'}, as amended ("Recording Agreement"). Capitalized terms used herein and not specifically defined herein shall have the meaning(s) ascribed to them in the Recording Agreement; in the event of any discrepancy, the definitions set forth in this Agreement shall be deemed controlling. Lender and Company agree to the following:

## 1. ARTIST
${artist}

## 2. PRODUCER
${producer}

## 3. COMPANY
ADDRESS:
${companyAddress}

Contact: ${companyContact}
Email: ${companyEmail}
Phone: ${companyPhone}

## 4. LENDER ADDRESS
${lenderAddress}

Contact: ${lenderContact}
Email: ${lenderEmail}
Phone: ${lenderPhone}

## 5. COMPOSITION(S) / MASTER(S)
${numberOfMasters} master recording(s) ("Master(s)") embodying Artist's featured performance of the musical composition(s) listed on Schedule 1 (the "Composition(s)" and each a "Composition") attached hereto and made a part hereof.

6. SERVICES:
Producer; Lender shall cause Producer to perform all production services in connection with the Master(s) as are customarily performed by producers in the recording industry. The Master(s) shall be commercially and technically satisfactory to both Company and Distributor for the manufacture and sale of records.

7. ADVANCE / FEE / ROYALTY:

Fee / Advance. Company shall pay or shall cause Distributor to pay Lender an advance in the amount of ${advance} (the "Advance"), which shall be deemed a fully recoupable advance against Producer's Royalty (as defined below). The Advance will be paid in full promptly following the later of the complete execution of this Agreement and Lender's satisfactory Delivery of the Master(s).

Royalty. Company shall pay or shall instruct and cause Distributor to pay to Lender a royalty in the amount of ${royaltyRate} Percent (${royaltyRate}%) (the "Base Rate") PPD as defined in the "Producer Royalty Provisions", attached as Schedule 2 and made a part hereof, and pursuant to the irrevocable letter of direction annexed hereto and incorporated by reference herein as Exhibit B on top-line USNRC Net Sales of Records (as defined in the Recording Agreement, the relevant provisions of which [including without limitation, royalty calculation, accounting, audit and controlled composition provisions and all relevant definitions] are attached hereto as Exhibit A [the "Recording Agreement Extracts"]) ("Producer's Royalty"). Producer's Royalty shall be calculated, determined, adjusted reduced on the same basis (without regard to sales based escalations or Artist's overall recoupment status) as Distributor calculates, determines, adjusts, reduces and pro-rates Artist's royalties under the Recording Agreement, and payment of Producer's Royalty shall be subject to the terms and conditions as embodied in the Producer Royalty Provisions and the Recording Agreement Extracts, as applicable.

8. CONTROLLED COMPOSITION

The parties acknowledge that the Composition(s) shall be owned and/or controlled in accordance with the ownership interests set forth on Schedule 1. In the event that any composition(s) which are wholly or partly written, owned, or controlled by Lender, Producer, or Producer Personnel (hereinafter defined) is/are embodied in the Master(s), Lender and Producer hereby grant (and shall use reasonable efforts to cause their and Producer Personnel's respective publishing designee(s) [each, a "Producer Publisher"] to grant) to Company, Artist, Distributor, and each of their designees, licensees, and assignees (sometimes referred to herein collectively as "Company's Designees") an irrevocable, universe-wide license under copyright to reproduce and exploit their respective share(s) in and to the Composition(s) as embodied on the Master(s) pursuant to the so-called Controlled Composition clause contained in in the Recording Agreement, the relevant provisions of which are attached hereto as Exhibit A (the "Recording Agreement Extracts"), but specifically excluding any reductions in the statutory rate or so-called mechanical "caps". Further, Lender and/or Producer shall license and/or shall use reasonable efforts to cause their Producer Publisher(s) (and to cause Producer Personnel) to license to Company's Designees a nonexclusive, worldwide, and perpetual synchronization and other necessary use license(s), free of charge or royalty, solely for the purpose of reproducing Lender's and/or Producer's and/or Producer Personnel's share of any Composition in any promotional Video (as defined in the Recording Agreement Extracts) and exhibiting, duplicating, manufacturing, and distributing copies of such Video only in connection with promotional purposes and only in the event that Artist does not receive any compensation for said promotional use. The foregoing is not intended to limit Lender's, Producer's, or any Producer Publisher's right to receive directly its respective share of publishing monies in connection with "monetized" promotional Videos (e.g., Videos exhibited on YouTube, Vimeo, or Vevo). For the avoidance of doubt, each applicable writer/publisher shall exclusively administer his/her/its respective share of the applicable Composition(s).

9. OWNERSHIP OF MASTER(S) / GRANT OF RIGHTS:

All results and proceeds of the services of Lender, Producer, and/or any third party furnished or engaged solely by Lender or Producer (hereinafter individually and collectively referred to as "Producer Personnel"), including Lender's. Producer's and Producer Personnel's contributions to the Master(s) (but excluding the Composition(s)) shall be deemed "works-for-hire" for Company within the meaning of the Copyright Act of 1976 (Title 17, U.S.C.), as amended, shall be subject to the provisions of this Agreement, and Lender shall cause any such Producer Personnel to be bound in writing by the terms hereof. If it is determined that the Master(s) do not so qualify, then Lender's, Producer's and Producer Personnel's contributions to the Master(s), together with all Lender's, Producer's and Producer Personnel's rights therein (other than the Composition(s)), shall be automatically assigned to Company and Company's Designees by this Agreement. Upon signature of this Agreement, Lender and Producer shall immediately transfer to Company all Lender's, Producer's and Producer Personnel's rights (including but not limited to copyright) in and to the Master(s) (excluding the Composition(s)). Lender and Producer further grant to Company and Company's Designees the right, throughout the universe and in perpetuity, to use Lender's name and Producer's approved professional name, and Producer's approved likeness and approved biographical material solely in the packaging and metadata of Records embodying the Master(s) and in all promotion and advertising therefor, solely as permitted hereunder. We shall provide you for your approval any likeness, portrait or pictures of Producer or biographical material about Producer which we propose to use in connection therewith. We will not use any such material which you do not approve in writing within five (5) business days following the date on which such materials are provided to you, provided you furnish substitute material, satisfactory to us in our sole and reasonable discretion, in time for use within Distributor's production and release schedules. No inadvertent, non-repetitive failure to comply with this paragraph will constitute a breach of this Agreement, provided Company and Artist shall use reasonable efforts to cure or cause Distributor to cure such failure on a prospective basis following Company's and/or Artist's independent discovery of such failure and/or Lender's notice to Company and/or Artist of such failure (e-mail to suffice), and you will not be entitled to injunctive relief to restrain the continuing use of any material used in contravention of this paragraph. You shall have the right to submit photographs and likenesses of, and biographical material concerning, Producer and your submission of the same shall constitute your approval thereof. Company and Distributor shall have the exclusive right to exploit the Master(s) in all methods, manner and media, now known or hereafter developed, throughout the universe and in perpetuity, or to refrain therefrom. Lender shall cause Producer to waive any claims based on infringement of Producer's "moral rights", and understands that the Master(s) may be changed, altered, remixed, or coupled with any other recording(s) or other material in Company's and Distributor's sole discretion, subject to the terms and conditions of the Recording Agreement. Lender and Producer shall have the right to request that Producer's credit be removed from the Master(s) if the Master(s) are materially altered in any way (other than for timing or formatting purposes) by giving Company written notice thereof. For avoidance of doubt, Producer is not an original author of the copyright underlying the Master(s) and shall not in any event claim any reversionary right under the United States Copyright Act Section 203, or otherwise. Notwithstanding anything to the contrary contained herein, in no event shall Company, Artist, Distributor and/or any third party deriving rights from Company, Artist and/or Distributor use Producer's name, likeness and/or biographical material in a manner that: (a) would express, suggest and/or imply any sponsorship and/or endorsement of any product, service, cause, event, or brand (other than the Master and solely as permitted herein); or (b) casts Producer in a false, negative or misleading light.

10. CREDIT:

With respect to the Master(s), Company shall accord, or shall instruct and use reasonable commercial efforts to cause Distributor to provide, credit to Producer as set forth on Schedule 1 in the liner notes of any record containing the Master(s), including the back cover of the LP packaging (if any) and any "single" embodying the Master(s) on the "A-side", on metadata in connection with electronic transmissions and in all print ads placed or controlled by Company or Distributor of one-half (1/2) page or larger featuring the Master(s). Company's inadvertent, non-repetitive failure, or any failure by Distributor, to provide such credit shall not be deemed to be a breach of this Agreement, provided that following written notice from Lender, Company uses reasonable commercial efforts to cure or instruct Distributor or other applicable third parties to prospectively cure any such credit failure. In no event shall Lender or Producer be entitled to an injunction in connection with a breach of these credit provisions. In the event a third party is engaged to re-mix or otherwise alter the Masters (excluding for timing and/or formatting purposes) following satisfactory delivery thereof, you shall have the right to require Artist to, and to instruct and use reasonable efforts to cause Distributor to, remove Producer's credit from all materials embodying such altered version of the Masters upon receipt by us of Producer's written notice (e-mail to suffice); provided, however, that if such removal of credit is not practicable at the time of your notice, we shall, or shall instruct Distributor, as applicable, to make such change as soon as practicable. No inadvertent failure by us, and no failure by Distributor, to comply with the provisions of the immediately preceding sentence will constitute a breach of this Agreement.

11. SAMPLES:

Lender and Producer will not "sample", "interpolate", or otherwise incorporate into ("Sample," "Sampling") the Master(s) or Composition(s) (if applicable), or permit any Producer Personnel to Sample any copyrighted or otherwise proprietary material ("Proprietary Material") belonging to any person, other than such material owned and/or supplied to Lender or Producer by Company or Artist for such purpose, unless approved by Company or Artist in writing. You shall advise us in writing of any such Proprietary Material and shall provide us with all information necessary to obtain appropriate permissions to use same, without restriction, on and in connection with the applicable Master(s). We shall have no obligation to accept any master recordings containing Proprietary Material, and our or Distributor's acceptance or use of same shall not relieve you of any obligations hereunder nor deprive us of any rights hereunder.

Without limitation of Company's other rights: (a) in connection with any Approved Sample (as hereinafter defined), (i) any sums payable by or on behalf of Company or Company's Designees in connection with the clearance of Samples furnished and embodied solely by Lender, Producer and/or Producer Personnel that have been disclosed to and approved by us in writing prior to commercial release of the applicable Master ("Approved Sample") shall be deemed additional recoupable Recording Costs, (ii) you shall be solely responsible for paying for an amount equal to any and all other recurring obligations and similar costs therefor (e.g., royalties or any contingency participation conveyed [whether expressed in royalty or penny-rate terms], etc.), multiplied by the Fraction (hereinafter defined), and (iii) any copyright ownership in the Composition that must be conveyed to a third party with respect to such Approved Sample shall be borne pro-rata by all writers; and (b) notwithstanding anything to the contrary contained herein, any sums payable (including, without limitation, record royalties) by or on behalf of Company or Company's Designees in connection with the clearance of Samples furnished and embodied solely by Lender, Producer, and/or Producer Personnel that have not been disclosed to and approved by us prior to commercial release of the applicable Master ("Undisclosed Sample") shall be deductible from any and all sums and/or interest due or accorded to Lender and/or Producer hereunder, and any copyright ownership in the Composition that must be conveyed to a third party with respect to such Undisclosed Sample shall be borne entirely by Lender, Producer, Producer Personnel and/or Producer Publisher, as applicable.

Neither you nor Producer shall be responsible for any Samples furnished and/or embodied solely by us, Artist, Company, or any person furnished and/or engaged solely by us, Artist and/or Company (excluding, for the avoidance of doubt, you, Producer and/or Producer Personnel), that have not been disclosed to you.

12. REPRESENTATIONS / WARRANTIES:

Lender, on one hand, and Company, on the other hand, each warrant and represent, solely on their own behalf, that (a) it has the right to enter into this Agreement, grant their respective rights hereunder, and perform material terms and obligations hereunder; and (b) to the extent of their respective contributions to the Master(s), there shall be no liens, encumbrances or other charges against the Master(s) at the time of delivery, including, without limitation, any Undisclosed Samples. Lender further represents and warrants that: (i) Producer shall not re-record, produce, arrange, mix or remix for any person or entity other than Company, Artist, or Distributor a master recording embodying the Composition(s) for at least three (3) years from the later of the date of delivery or commercial release of each Master, which such restriction shall be waived in the event the Master(s) are not commercially released within twelve (12) months after delivery; (ii) no selections, materials, ideas, or other properties furnished by Lender or Producer or Producer Personnel and embodied or contained in the Master(s) or the Composition(s) will violate or infringe upon any law or statutory right of any person or entity; (iii) Lender is solely owned by Producer and has a valid and binding agreement with Producer that grants Lender the rights to furnish Producer's services and to grant the rights granted hereunder in accordance with the provisions hereof; and (iv) Lender shall be solely responsible for and shall pay any withholding, employment or other taxes required in connection with Producer's services hereunder. Company further represents and warrants that no selections, materials, ideas, or other properties furnished by Company, Distributor or Artist or anyone engaged or furnished by Company, Distributor or Artist (other than Lender, Producer, and/or Producer Personnel) and embodied or contained in the Master(s) or the Composition(s) will violate or infringe upon any law or statutory right of any person or entity.

13. INDEMNITY / GOVERNING LAW / VENUE:

(a) Each party hereto agrees to indemnify the other party and the other party's designees, licensees and assigns (collectively, the "Indemnified Party") from all damages, liabilities, costs, losses and expenses arising out of or connected with any third party claim, demand, or action arising out of a breach of any of the warranties, representations, or covenants made by such indemnifying party in this Agreement, to the extent reduced to a final judgment in a court of competent jurisdiction or settled with the indemnifying party's prior written consent, such consent not to be unreasonably withheld. The indemnifying party will reimburse the Indemnified Party upon written demand for any payment made by the Indemnified Party at any time in respect of any such third party claim, liability, damage or expense to which the foregoing indemnity applies. The Indemnified Party shall give the indemnifying party prompt written notice of any claim to which the foregoing indemnity applies and the indemnifying party may participate in the defense of same with counsel of its choosing at its sole cost and expense; provided that the Indemnified Party's decision in connection with the defense of any such claim shall be final.

(b) Pending the determination of any claim relating to Lender's foregoing indemnity obligation, unless Lender posts a bond in a form and amount acceptable to Company in Company's reasonable discretion, Company shall have the right to withhold from any sums due Lender hereunder an amount equal to Lender's potential liability pursuant to this paragraph. If as of the date twelve (12) months following the date such sums were initially withheld, no litigation on the claim has commenced, then the sums so withheld shall be credited to your account (subject to Company's right to once again withhold if litigation subsequently is instigated or becomes likely).

(c) If either party hereto institutes any action, suit or proceeding based upon any matter, claim or controversy arising hereunder or relating hereto, such action shall be brought solely in the State Courts of the State of California, County of Los Angeles and shall be governed by California law and the parties hereto (and Lender shall cause Producer to) submit to the jurisdiction and venue of said court, provided that notwithstanding anything to the contrary in this paragraph, if Company or Artist, or Lender or Producer, is sued or joined (e.g. by joinder or impleader) in any other court or forum by a person, or entity other than Lender or Producer, or Company or Artist, respectively, in respect of any matter that may give rise to a claim by or against Lender or Producer, or Company or Artist, hereunder, Lender and Company consent (and shall cause Producer and Artist, as applicable, to consent) to the jurisdiction of such court or forum over any such claim asserted against Lender or Producer or Company or Artist.

14. MISCELLANEOUS:

(a) Nothing contained herein shall be deemed to obligate Company or Company's Designees to embody any of the Master(s) on any Record or any other medium recorded, exploited or released by Company or Company's Designees. (b) No party will be deemed to be in breach of any of such party's obligations hereunder unless and until the other party will have given written notice setting forth the nature of such breach and the breaching party will have failed to cure such breach within thirty (30) days after the effective date of such notice (reduced to fifteen [15] days for failure to pay amounts due hereunder). In the event of any breach of this Agreement by Company, Lender's and Producer's sole remedy shall be an action at law for damages actually incurred, if any, and, except in the case of fraud, in no event shall Lender or Producer be entitled to seek equitable or other injunctive relief. It is expressly agreed that Lender is acting as an independent contractor and that nothing herein contained shall constitute a partnership, a joint venture, agency or employment relationship between Lender and Company.

(c) Company shall have the right, at its election, to assign any of its rights hereunder, in whole or in part, to any person or entity, provided Company shall remain secondarily liable hereunder. Lender shall not have the right to assign any of Lender's or Producer's obligations or rights hereunder, absent the express consent of Company, except for the right to assign payment.

(d) This Agreement supersedes all prior agreements between the parties pertaining to the subject matter hereof, whether verbal or written, and any further modification(s) to this Agreement shall not be binding unless in writing and signed by the parties hereto. This Agreement may be signed in any number of counterparts, each such counterpart being deemed to be an original instrument, but all of which shall constitute one document. Delivery of a signed counterpart of a signature page to this Agreement by facsimile or other electronic means shall be deemed effective as delivery of a manually executed original counterpart of this Agreement.

(e) All notices to be given by either party hereunder shall be in writing and shall be delivered by hand or by United States certified mail, postage prepaid, return receipt requested, to the address of each party as first set forth above until notice of a new address shall be duly given, except that royalty statements and any payments due hereunder, shall be sent to you at such address by regular mail.

(f) The parties acknowledge that they have participated jointly in the negotiation and drafting of this Agreement and, in the event an ambiguity or question of intent or interpretation arises, this Agreement shall be construed consistent with the joint drafting of this Agreement by the parties and no presumption or burden of proof shall arise favoring or disfavoring any party by virtue of the authorship of any of the provisions of this Agreement.

(g) EACH PARTY ACKNOWLEDGES AND AGREES THAT IT HAS READ THIS AGREEMENT AND HAS BEEN ADVISED OF THE SIGNIFICANT IMPORTANCE OF RETAINING AN INDEPENDENT ATTORNEY OF ITS CHOICE TO REVIEW THIS AGREEMENT ON ITS BEHALF. EACH PARTY HEREBY ACKNOWLEDGES AND AGREES THAT IT HAS HAD THE UNRESTRICTED OPPORTUNITY TO BE REPRESENTED BY AN INDEPENDENT ATTORNEY. IN THE EVENT OF A PARTY'S FAILURE TO OBTAIN AN INDEPENDENT ATTORNEY OR WAIVER THEREOF, SUCH PARTY HEREBY WARRANTS AND REPRESENTS THAT IT WILL NOT ATTEMPT TO USE SUCH FAILURE AND/OR WAIVER TO OBTAIN AN ATTORNEY AGAINST THE OTHER PARTY OR ANY OF THEIR RESPECTIVE SUCCESSORS.

AGREED AND ACCEPTED:
"Company"

__________________________________________

Its: ${variables.companySignTitle || ''}

Printed Name: ${variables.companySignName || ''}

AGREED AND ACCEPTED:
"Lender"

__________________________________________

Its: ${variables.lenderSignTitle || ''}

Printed Name: ${variables.lenderSignName || ''}

INDUCEMENT

To induce ${artist} ("Company") to enter into the foregoing agreement ("Agreement") with ${producerCompany} ("Lender"), the undersigned hereby:

(a) acknowledges that the undersigned understands and is familiar with all the terms and conditions of the Agreement;

(b) assents to the execution of the Agreement and agrees to be bound by the terms and conditions thereof, including, without limitation, each and every provision of the Agreement that relates to the undersigned in any way, directly or indirectly, the services to be rendered thereunder by the undersigned and restrictions imposed upon the undersigned in accordance with the provisions of the Agreement, and hereby guarantees to Company the full and faithful performance of all the terms and conditions of the Agreement by the undersigned and Lender (including, without limitation, all representations, warranties and indemnification obligations set forth in the Agreement); and

(c) acknowledges and agrees that Company shall be under no obligation to make any payments to the undersigned or otherwise, for or in connection with this inducement and for or in connection with the services rendered by the undersigned or in connection with the rights granted to Company thereunder and the fulfillment of the undersigned's obligations pursuant to the Agreement (except mechanical royalties and other publishing monies, if any).

AGREED AND ACCEPTED:

__________________________________________
${producer}

---

Schedule 1
List of Master(s) and Composition(s), Ownership of Composition(s), and Credit(s)

| Masters / Compositions | Ownership of Compositions (with Publishing Designees) | Credit |
|---|---|---|
| "${compositionTitle}" | ${variables.writersAndSplits || 'To be provided'} | "Produced by ${producer}" |

---

Schedule 2
Producer Royalty Provisions

1. Producer's Royalty shall be paid retroactively from "record one" after Distributor recoups the Recording Costs (excluding the Advance and any in-pocket advances paid to Artist) incurred in connection with the Masters from the "net artist royalties" (i.e. the gross "all-in" royalties payable to Artist in connection with all exploitations of the Master(s) minus the royalty payable to Producer and all third party producers and/or mixers (other than Artist) rendering services with respect to the Master(s) [other than featured artist royalties]) and further subject to Distributor's recoupment of the Advance from Producer's Royalty.

2. Producer's Royalty for records that embody the Master(s) together with master recordings that are not the Master(s) shall be pro-rated by a fraction, the numerator of which is the number of royalty-bearing Master(s) embodied thereon and the denominator of which is the number of royalty-bearing master recordings (including the Master(s)) embodied thereon.

3. Notwithstanding anything to the contrary contained herein, with respect to the release of any physical single record embodying no more than two (2) master recordings (including, without limitation, twelve-inch singles) (a "Single"), in the event the "A" side of any such Single shall embody a Master and the "B" side of such Single shall embody master recordings other than said Master, we shall nevertheless pay Producer's Royalty in respect of such Single as if both sides had embodied such Master. In the event that the "B" side of any such Single shall embody a Master and the "A" side of such Single shall embody a master recording other than said Master, no royalty shall be payable to Producer in connection with such exploitation of such Master on a "B" side, provided that such "A" side producer is entitled to similar "A" side protection.

4. On exploitations of a Master or Masters for which a percentage of net receipts, including without limitation so-called "flat fee" income, or the like, is payable (or creditable against an advance) pursuant to the Recording Agreement, Producer's Royalty will be equal to that portion of net receipts on such exploitations that is payable pursuant to the Recording Agreement multiplied by a fraction, the numerator of which is the Base Rate and the denominator of which is the un-escalated "all-in" base royalty rate pursuant to the Recording Agreement (the "Fraction"). On exploitations of audio-visual recordings embodying a Master or Masters, Producer's Royalty will be equal to fifty percent (50%) of the otherwise applicable royalty. Notwithstanding anything to the contrary in this Agreement, Producer's Royalty in connection with a Master or Masters embodied in "MTV-style" music videos, or the like, will be payable prospectively after the recoupable production costs of the applicable video have been recouped as set forth in the Recording Agreement.

5. In the event Company or Artist receives or is credited with any so-called "Direct Monies" directly from third-parties other than Distributor (e.g., monies from SoundExchange) solely and directly attributable to the Master(s), Company will pay, or shall instruct such third party to pay, Lender or Producer its pro-rata share of such Direct Monies determined by multiplying such Direct Monies, received by or credited to Company or Artist, by the Fraction. Company shall submit the irrevocable letter of direction in the form of Exhibit C attached hereto and incorporated herein by this reference as signed by Artist instructing SoundExchange to account directly to Lender or Producer its pro-rata share at the same time and subject to the same conditions pursuant to which SoundExchange accounts to Artist. In the event Company and/or Artist contract with a featured artist for the Master(s), Company and/or Artist shall obtain and submit a letter of direction in the form of Exhibit C in favor of the Producer. In the event that SoundExchange does not directly account to Lender or Producer for its share of Direct Monies, Company shall account for and pay Lender or Producer their share of SoundExchange Direct Monies pursuant to the terms of the "Accounting" paragraphs below, without regard to the recoupment status of Lender/Producer's royalty account hereunder.

6. Producer's Royalty shall not be reduced by amounts payable to any third parties.

7. As used herein, "PPD" shall mean the so-called "royalty base price" set forth in the Recording Agreement.

8. For avoidance of doubt, these provisions, and the Recording Agreement Extracts, shall continue to govern the terms and conditions of Producer's Royalty in the event the Master(s) are no longer distributed by Distributor.

Accounting:

1. Company shall use reasonable efforts to cause Distributor to pay to Lender royalties, fees and/or advances directly via an irrevocable letter of direction in substantially the form attached hereto as Exhibit B (or such form as required by Distributor). In the event that Distributor refuses or fails to pay royalties, fees, or advances directly to Lender, and following Lender's written notice to Company of such failure (e-mail to suffice), Company shall send Lender statements regarding royalties, fees or advances payable to Lender within forty-five (45) days of Company's receipt thereof together with any payments due to Lender thereunder. Company shall have the right to deduct from any amounts payable to Lender hereunder solely such portion thereof as may be required to be deducted under the provisions of any applicable statute, regulation, treaty or other law, or under any applicable union or guild agreement, and Lender and Producer shall promptly execute and deliver to Company such forms and other documents as may be reasonably required by Company in connection therewith.

2. Lender and Producer understand and agree that Company will be relying on statements provided to Company by Distributor. Accordingly, Lender shall be deemed to have consented to all royalty statements and all other accountings rendered by Company hereunder and each such royalty statement or other accounting shall be conclusive, final, and binding, shall constitute an account stated, and shall not be subject to any objection for any reason whatsoever unless specific objection in writing, stating the basis thereof, is given by Lender to Company by the date that is three (3) months prior to the date Company has to inspect the books of Distributor (the "Audit Period"). At any time within the Audit Period, Lender may, on reasonable notice to Company, appoint a certified public accountant to audit, at Lender's own expense, our books and records solely as they relate to the sale and other exploitation of the Master(s) (and related expenditures) solely for the purpose of verifying the royalties or credits due to Lender under this Agreement. Upon Artist's request, Lender shall use reasonable efforts to furnish Company with a copy of the audit report within thirty (30) days after the completion of the applicable audit. No accounting statement shall be subject to audit more than once and no more than one (1) audit shall be conducted in any calendar year. No action, suit, or proceeding of any nature in respect of any royalty statement or other accounting rendered hereunder may be maintained against Company unless such action, suit, or proceeding is commenced against Company in a court of competent jurisdiction by the date that is three (3) months prior to the date Company has to commence action against Distributor. Lender and Producer shall not have the right to audit the books and records of Distributor. Company shall credit Lender's account with Lender's pro rata share of any monies recovered by Company with respect to the Master(s) pursuant to any audit Company may elect to conduct of Distributor or claim against Distributor in connection with the Masters, or any recoveries or settlements with Distributor or any third party, after deduction "off-the-top" of any actual, out-of-pocket, third party, reasonable costs actually incurred directly as a result of such audit, claim or settlement (solely to the extent such costs have not been reimbursed by Distributor or such other third party). At Lender's written request Company shall promptly provide Lender with relevant portions of the audit report submitted to Distributor.

---

EXHIBIT A
Recording Agreement Extracts

[ATTACH RECORDING AGREEMENT EXTRACTS]

---

EXHIBIT B
Letter of Direction

${artist}
${companyAddress}

Dated as of: ${date}

Republic Records,
a division of UMG Recordings, Inc.
1755 Broadway
New York, NY 10019

Re: Producer Agreement

To Whom It May Concern:

1. We have engaged ${producerCompany} ("Lender") to furnish the non-exclusive services of ${producer} ("Producer") as an independent contractor to provide vocal production services for the master recording(s) embodying the composition(s) entitled "${compositionTitle}" to be recorded by us and delivered to you for possible embodiment on the single, EP, or LP required to be delivered to you pursuant to the distribution agreement between you and us.

2. We hereby request and irrevocably authorize you, solely as an accommodation to us, to account for and pay advances, fees, and royalties to Lender on our behalf, and to credit Producer pursuant to the applicable terms and conditions of the agreement attached hereto.

3. Your compliance with this authorization will constitute an accommodation to us alone, and nothing herein shall constitute Lender or Producer as a beneficiary of or a party to this instrument or any other agreement between you and us. All payments hereunder will constitute payment to us and you will have no liability by reason of any erroneous payment you may make or failure to comply with this authorization. We will indemnify and hold you harmless against any claims asserted against you and any damages, losses or expenses incurred by you by reason of any such payment or otherwise in connection herewith.

Very truly yours,

${artist}

By: _____________________
An Authorized Signatory

---

EXHIBIT C

SOUNDEXCHANGE, INC.
LETTER OF DIRECTION

Solely as a service and accommodation to those featured artists entitled to royalties under 17 U.S.C. § 114(g)(2)(D) who specifically authorize SoundExchange to collect and distribute royalties on their behalf, SoundExchange permits such featured artists to designate that a percentage of the royalties due them from SoundExchange relating to certain sound recordings be remitted to creative personnel (i.e., producers, mixers, or engineers) credited or recognized publicly for the commercially released sound recording on which the featured artist performs

Please note that a performer need not execute this Letter of Direction in order to be paid statutory royalties by SoundExchange.

To make such a designation, the performer submitting this Letter of Direction ("LOD") must be registered with SoundExchange.

Sections with asterisks are required.

*Name of Solo Artist(s) or Group on recording(s): ${artist}

*Legal Name of Performer(s) for this LOD: [PERFORMER LEGAL NAME]

*Name of Producer, Mixer or Engineer ("Payee") - Only Include One Payment Name: ${producer}

*Required if paying to a company: I certify that company listed above is owned solely by the producer mixer or engineer involved in the creative process for the recordings listed in the attached LOD Repertoire Chart

Payee ID (If known): ${variables.payeeId || '[PAYEE ID]'}

*Payee Address - include c/o's here: ${variables.payeeAddress || 'c/o [ADDRESS]'}

Payee Telephone Number: ${variables.payeePhone || '[PHONE]'}

*Payee E−Mail: ${variables.payeeEmail || '[EMAIL]'}

*An LOD Repertoire Chart is required to complete the LOD. Please submit a complete LOD Repertoire Chart along with all the pages in this Letter of Direction

*Effective Date: (choose one)
☐ Check here if this LOD applies to payments as of [date]
☐ Check here if this LOD applies retroactively for all tracks listed on the LOD Repertoire Chart.
☐ Check here if the Effective Payment Date varies by track. Enter the Effective Dates on the LOD Repertoire Chart.

Please note that retroactive application of an LOD is limited to available SoundExchange royalties for the tracks listed on the LOD Repertoire Chart

*Payment Percentage ("Percentage"): check applicable box
☐ ${variables.lodPaymentPercentage || '[PERCENTAGE]'}% of Performer royalties are applicable to all tracks listed on the LOD Repertoire Chart
☐ Percentage varies by each track covered by this LOD. Enter percentages on the LOD Repertoire Chart.

TERMS AND CONDITIONS

By signing this Letter of Direction and submitting it to SoundExchange, Performer agrees as follows:

1. Performer represents and warrants that Performer is the featured recording artist who performed on the sound recording(s) identified on the "LOD Repertoire Chart" attached hereto as Schedule 1 (the "Recordings").

2. Performer represents and warrants that Payee is an individual credited or recognized publicly for the commercially released sound recording identified on the LOD Repertoire Chart (i.e., a producer, mixer, or engineer).

3. Performer requests and authorizes SoundExchange to pay to and in the name of Payee an amount equal to Percentage of the royalties otherwise payable by SoundExchange to Performer in respect of the Recordings, thereby reducing the payments from SoundExchange to Performer. If a previous "Royalty Distribution Information for Featured Artist" or other letter of direction has been provided to SoundExchange that conflicts with this Letter of Direction, then any and all previous letters of direction or similar documents conflicting herewith are hereby revoked.

4. All monies becoming payable under this Letter of Direction shall be remitted to Payee at the address identified above or as Payee otherwise directs SoundExchange in writing. If SoundExchange requires additional information (e.g., Payee tax information) to remit payments under this Letter of Direction, then Performer and Payee shall be responsible for providing SoundExchange with such information promptly. To the extent SoundExchange is not provided with sufficient or correct information to remit payment to Payee, or checks mailed to Payee's last known address are returned, SoundExchange may hold the monies pending receipt of such information or pay the royalties to Performer.

5. SoundExchange will honor a written revocation by Performer of the designation made by this Letter of Direction. In the event of such a revocation, SoundExchange may, but need not, mail notice of the revocation to the last known address of Payee. The foregoing is without prejudice to any other contractual arrangements between Performer and Payee requiring payment of the Percentage by Performer. SoundExchange has no responsibility for Performer's performance or nonperformance of any such obligation.

6. SoundExchange may discontinue making payments under this Letter of Direction at any time, including if checks mailed to Payee's last known address are returned, Performer ceases to be a registrant of SoundExchange, or SoundExchange modifies its policies concerning letters of direction. If it does so, then SoundExchange may, but need not, mail notice thereof to the last known address of Performer and Payee, and monies that otherwise would have been payable under this Letter of Direction will be paid to Performer.

7. Performer acknowledges that SoundExchange is providing payments to Payee solely as an accommodation to Performer but that all royalties distributed by SoundExchange to Payee are taxable to Payee. Payee shall be solely responsible for providing SoundExchange with tax paperwork required by any governmental agency, including the Internal Revenue Service, to avoid tax withholding.

8. SoundExchange may rely conclusively, and shall have no liability when acting, upon any written notice, instruction, other document or signature that is reasonably believed by SoundExchange to be genuine and to be authorized by Performer. SoundExchange shall not be responsible for failure to act as a result of causes beyond the reasonable control of SoundExchange. SoundExchange shall not be liable to Performer, Payee or to any third party for, and Performer agrees to defend (with counsel satisfactory to SoundExchange), indemnify and hold harmless SoundExchange from, any damages or loss (including reasonable attorney's fees) in any way related to this Letter of Direction, unless such loss is caused by SoundExchange's gross negligence or willful misconduct. The provisions of this Paragraph 8 shall survive the revocation or other termination of this Letter of Direction.

9. In order to maintain flexibility in administering this Letter of Direction, SoundExchange may modify these Terms and Conditions from time to time, in its sole discretion. Such changes shall be effective immediately and Performer shall be deemed to have notice of such changes when they are made available on the SoundExchange website. Notwithstanding the foregoing, if Performer does not wish to accept any changes, Performer must provide SoundExchange written notice within thirty (30) days of notice of any changes to this Letter of Direction.

10. This Letter of Direction shall be governed by and construed in accordance with the substantive laws of the District of Columbia. Any dispute relating to or arising from this Letter of Direction shall be subject to the exclusive jurisdiction of courts sitting in the District of Columbia.

ACKNOWLEDGED AND ACCEPTED BY:
(The signature of each Performer or Authorized Signatory for each Performer is required.)

Performer Signature: ${variables.performerSignature || '[SIGNATURE]'}

*Performer Printed Legal Name: ${variables.performerPrintedName || '[NAME]'}

OR, SoundExchange Authorized LOD Signatory: ${variables.authorizedSignatory || '[SIGNATORY]'}

SoundExchange Authorized LOD Signatory Printed Name: ${variables.authorizedSignatoryPrintedName || '[NAME]'}

Date of Signature: ${variables.signatureDate || '[DATE]'}

Return the original of this form to:
SoundExchange, Inc.
733 10th Street NW, 10th Floor
Washington, DC 20001

You may also scan and email the completed forms to accounts@soundexchange.com
Or fax to: 202.640.5859

If you have questions, please call 1−800−961−2091 or email accounts@soundexchange.com

ADDITIONAL SIGNATURES PAGE (use when applicable):

ACKNOWLEDGED AND ACCEPTED BY:
Performer Signature: ${variables.additionalPerformerSignature || '[SIGNATURE]'}
*Performer Printed Legal Name: ${variables.additionalPerformerPrintedName || '[NAME]'}

OR, SoundExchange Authorized LOD Signatory: ${variables.additionalAuthorizedSignatory || '[SIGNATORY]'}
SoundExchange Authorized LOD Signatory Printed Name: ${variables.additionalAuthorizedSignatoryPrintedName || '[NAME]'}
Date of Signature: ${variables.additionalSignatureDate || '[DATE]'}

---

Schedule 1: Repertoire Chart for Featured Artist Letter of Direction

*Name of Solo Artist or Group on Recording(s): ${artist}

*Name of Producer, Mixer or Engineer (Payee): ${producer}

* indicates a Required Field. Other fields are optional, but assist in identifying reported performances.

| Sound Recording Track Name(s) | Percentage Share of artist royalties, for this track, to be assigned to the LOD recipient (as a % only, do not use "points" or fractions) | Effective Date of the LOD for this track (required if tracks have different effective dates) | Track Version (e.g., studio, re-mix version, etc) | Sound Recording Track ISRC | Album or Release Name | Label | Release Date | Other artists on this track (if applicable) |
|---|---|---|---|---|---|---|---|---|
| ${variables.lodTrackName || 'Track 1'} | ${variables.lodPaymentPercentage || '%'} | ${variables.lodEffectiveDate || 'Retro'} | ${variables.lodTrackVersion || 'Studio'} | ${variables.lodIsrc || '[ISRC]'} | ${variables.lodAlbum || '[ALBUM]'} | ${variables.lodLabel || '[LABEL]'} | ${variables.lodReleaseDate || '[DATE]'} | ${variables.lodOtherArtists || ''} |`;

  return templateContent;
};
