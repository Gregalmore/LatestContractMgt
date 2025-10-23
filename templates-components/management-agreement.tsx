import React from 'react';
import { LegalDocumentVariables, formatLegalDocument, LegalDocumentHeader, LegalDocumentFooter } from './legal-document-base';

interface ManagementAgreementTemplateProps {
  variables: LegalDocumentVariables;
}

export const ManagementAgreementTemplate: React.FC<ManagementAgreementTemplateProps> = ({ variables }) => {
  const {
    artist,
    producer: manager,
    company,
    companyAddress,
    companyContact,
    companyTitle,
    companyEmail,
    companyPhone,
    producerAddress: managerAddress,
    producerContact: managerContact,
    producerTitle: managerTitle,
    producerEmail: managerEmail,
    producerPhone: managerPhone,
    artistAddress,
    artistContact,
    artistEmail,
    artistPhone,
    commissionRate,
    termYears,
    date
  } = variables;

  const templateContent = `# PERSONAL MANAGEMENT AGREEMENT

**AGREEMENT** made and entered into as of this **${date}** between the parties listed below.

---

## RECITALS

**A.** Manager is a "personal manager" in the business of guiding and advising various artists in connection with their careers in the Entertainment Industry (as hereunder defined);

**B.** Artist is active as a singer, performer, songwriter, producer and otherwise in the Entertainment Industry; as used herein, the "Entertainment Industry" includes, without limitation, the fields of recording, writing, publishing, personal appearances and touring, producing, merchandising, motion pictures, television, radio, stage, endorsements, commercials, acting and performing (including in the foregoing media), webcasting, and all other activities and interests, in any way connected with the entertainment industry and related fields (subject to the terms and conditions of this Agreement);

**C.** Artist desires to obtain the counsel and advice of Manager in regard to Artist's career in the Entertainment Industry;

**NOW, THEREFORE**, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

## 1. ENGAGEMENT

**1.1 Exclusive Engagement.** Artist hereby engages Manager as Artist's sole, exclusive and most senior ranking personal manager in the Entertainment Industry throughout the world during the Term (as hereinafter defined) of this Agreement (with Manager having final approval over any management decisions), and Manager hereby accepts such engagement subject to the terms and conditions set forth herein.

**1.2 Exclusivity.** Artist shall not engage any other person, firm or corporation to render the same or similar management services as Manager during the Term hereof (it being understood and agreed that this prohibition shall not prevent Artist from engaging a Business Manager(s) during the Term).

## 2. TERM

**2.1 Initial Period.** Subject to paragraphs 2.2 and 2.3 below, the term of this Agreement ("Term") shall be for an initial period of **${termYears}** years from the date hereof ("Initial Period").

**2.2 Option Period.** At the expiration of the Initial Period, Manager shall have the option to extend the Term for an additional one (1) year period (the "Option Period"). The Option Period shall be deemed automatically exercised by Manager at the expiration of the Initial Period unless Manager gives written notice to the Artist terminating the Term prior to the expiration of the Initial Period.

**2.3 Term Continuation.** After expiration of the Initial Period or Option Period (if the option is exercised by Manager), the Term shall continue in force unless and until one party gives the other party 30 days written notice of the termination of this Agreement.

## 3. SERVICES

**3.1 Advice and Counsel.** As and when reasonably requested by Artist, Manager shall advice and counsel Artist in all aspects of Artist's career including, without limitation:

- The selection of musical, artistic and literary material
- The selection of artists with whom Artist may write, record and perform
- Decisions on recording and publishing and third party agreements with respect to same
- Public relations and social media activity
- The adoption of proper formats for presentation of Artist's talents
- The selection of artistic talent to assist, accompany or embellish Artist's presentation
- Decisions on performing and touring
- The selection and engagement of a booking agent
- Decisions on engaging in any other areas of the Entertainment Industry
- Terms upon which Artist shall render services to third parties
- General practices in the Entertainment Industry

**3.2 Availability.** Manager shall be reasonably available for scheduled conference calls and meetings at Artist's request.

**3.3 Referrals.** Artist agrees to promptly refer to Manager (and to instruct booking agents and all other parties to refer to Manager) all verbal and written leads, communications or requests in connection with all arrangements that Artist receives whereby Artist's name, likeness, voice, services or talents are utilized or which are otherwise within the scope of this Agreement, for advice and counsel.

## 4. COMPENSATION

**4.1 Commission Rate.** Artist agrees that Artist will pay or cause to be paid "Commissions" to Manager in an amount equal to **${commissionRate}%** (the "Commission Rate") of all Gross Monies (as hereinafter defined) earned and received by or on behalf of Artist or for Artist's account during and after the Term which are derived from Term Product (as hereinafter defined).

**4.2 Term Product.** "Term Product" means solely the following activities, work or efforts of Artist in all fields of the Entertainment Industry:

- Any and all services rendered or substantially rendered (including, without limitation, as a recording artist, producer, mixer, composer, arranger and/or songwriter) and/or works or products created or substantially created (including, without limitation, records, songs, videos or films) prior to or during the Term
- Any and all live performances or tours performed during the Term or within six (6) months following the expiration of the Term if booked under a Term Agreement
- Endorsement or acting work or services rendered or substantially rendered during the Term or within six (6) months of expiration of the Term under a Term Agreement

**4.3 Gross Monies.** "Gross Monies" means all forms of compensation (including, but not limited to, fees, salaries, earnings, advances, royalties, residuals, report and/or union fees, bonuses, proceeds of sales, leases or licenses, gifts (paid in lieu of compensation), shares of stock (paid in lieu of compensation), partnership interests and amounts paid for packaged television, motion pictures and programs) directly or indirectly earned and received at any time by Artist or Artist's heirs, successors and assigns or earned and received by anyone on Artist's behalf, as a result of Artist's activities in and throughout the Entertainment Industry.

## 5. MANAGER'S OTHER BUSINESS

**5.1 Non-Exclusive Services.** Artist understands that Manager may also represent other persons and performers and that Manager's services hereunder are not exclusive. Artist agrees that Manager shall not be required to devote Manager's entire time and attention to fulfilling Manager's obligations under this Agreement and that Manager shall have the right to render services to other persons, firms and corporations either in the capacity which Manager is employed hereunder or otherwise, provided that Manager continues to perform Manager's obligation hereunder and act in Artist's best interests.

## 6. ARTIST PUBLICITY

**6.1 Authorization.** Manager shall be authorized with Artist's prior written approval (email or text shall suffice), in each instance, on Artist's behalf, to approve and permit: (i) any and all publicity and advertising for Artist, and (ii) the use of Artist's name, approved photograph, approved likeness, which Artist had previously approved in each instance, for the purposes of advertising and publicity (excluding any endorsements, merchandise or similar uses).

## 7. MANAGER EXPENSES

**7.1 Reimbursement.** Artist agrees to promptly reimburse Manager for all approved expenses, other than office overhead expenses, which Manager incurs on behalf of Artist in connection with the activities pursuant to this Agreement (including, without limitation, long distance telephone calls, transportation or travel undertaken at Artist's prior written request (email or text shall suffice) or with Artist's prior written consent (email or text shall suffice), expenses incurred in connection therewith and other expenses approved in advance by Artist in writing (email or text shall suffice) which are incurred on behalf of Artist), provided that Manager has provided any reasonably required substantiating documentation for any incurred costs.

## 8. ACCOUNTINGS AND AUDIT RIGHTS

**8.1 Payment Schedule.** Artist shall account for and pay (or shall cause to be accounted for and paid) the Commissions to Manager pursuant to this Agreement within thirty (30) days after the close of each calendar month during the Term and for so long as Manager is entitled to receive Commissions in accordance with the terms and conditions of this Agreement.

## 9. NON-SOLICITATION

**9.1 Restriction.** Artist covenants and agrees that, throughout the Term and for one (1) year thereafter, Artist shall not, and shall cause Artist and Artist's affiliated and/or related entities not to, (either directly or indirectly), without the express prior written consent of Manager (which may be withheld for any or no reason), (i) recruit, solicit, hire or otherwise employ or engage (nor attempt to recruit, solicit, hire or otherwise employ or engage) in any capacity whatsoever any person employed by (or independent contractor engaged by) or a client represented by Manager in the artist management business, or (ii) contact or communicate with any such persons for the purpose of inducing them to terminate their employment, engagement or association with Manager.

## 10. POWER OF ATTORNEY

**10.1 Grant of Power.** Artist hereby irrevocably constitutes and appoints Manager as Artist's non-exclusive attorney-in-fact throughout the Term in the Entertainment Industry, with full power of substitution, solely to do the following:

- Engage, direct and/or discharge theatrical agencies, booking agencies, employment agencies and other third parties that may from time to time seek to obtain employment or engagements for Artist provided that in each instance Artist is made fully aware of engagements in a timely manner and Artist approves same in advance in writing (with email to constitute a writing for this purpose)
- Approve and permit the use of the names and approved likenesses of Artist (including, without limitation, all professional, group and fictitious names heretofore, now or hereafter used by Artist), the voice of Artist and approved biographical material concerning Artist for advertising of and publicity for only Artist and Artist's services and the products thereof

## 11. REPRESENTATIONS AND WARRANTIES

**11.1 Artist's Representations.** Artist represents and warrants that Artist has the right and authority to enter into and fully perform its obligations under this Agreement, and that Artist has not entered nor will hereafter enter into any agreement(s) inconsistent herewith.

**11.2 Manager's Representations.** Manager represents and warrants that Manager has the right and authority to enter into and fully perform its obligations under this Agreement, and no act or omission by Manager in connection with the performance of Manager's services hereunder will violate any right or interest of any person or entity, or will subject Artist to any liability to or claim by any person or entity.

## 12. INDEMNIFICATION

**12.1 By Manager.** Manager agrees to and does hereby indemnify, save, defend and hold Artist and each of his agents, affiliates, heirs and assigns harmless from and against any and all claims, suits, actions, losses, damages, liabilities, costs and expenses (including reasonable attorneys' fees and expenses) arising out of or connected with any third party claim which: (i) arises out of any breach by Manager of any agreement, warranty or representation made by Manager in this Agreement, or (ii) results from the actions, inactions, errors, omissions or negligence of Manager.

**12.2 By Artist.** Artist agrees to and does hereby indemnify, save, defend and hold Manager and each of Manager's officers, agents, affiliates, heirs and assigns harmless from and against any and all claims, suits, actions, losses, damages liabilities, costs and expenses (including reasonable attorneys' fees and expenses) arising out of or connected with any third party claim which: (i) arises out of any breach by Artist of any agreement, warranty or representation made by Artist in this Agreement, or (ii) results from the actions, inactions, errors, omissions or negligence of Artist.

## 13. ASSIGNMENT

**13.1 Manager.** Manager shall have the right to assign this Agreement and/or any portion of Manager's rights hereunder, in whole or in part, to any subsidiary, parent company, affiliate, or to any third party acquiring all or substantially all of its assets or stock.

**13.2 Artist.** Artist shall not have the right to assign this Agreement (except to a company wholly owned by Artist) without Manager's prior written consent other than to a wholly owned furnishing entity.

## 14. DISPUTE RESOLUTION

**14.1 Early Resolution.** The parties will negotiate in good faith for a period of at least thirty (30) days (the "Earliest Initiation Date") to attempt to resolve promptly any and all disputes, claims or controversies arising out of or relating to this Agreement or the breach, termination, enforcement, interpretation or validity thereof, and if the matter is not resolved through such negotiations within such period, then either party may cause such matter to be submitted to JAMS for final and binding arbitration pursuant to paragraph 14.2 below.

**14.2 JAMS.** At any time after the Earliest Initiation Date, either party may initiate arbitration with respect to the matters then under dispute by filing with JAMS a written demand for arbitration which shall be determined by arbitration in the City of Los Angeles, State of California.

## 15. INDEPENDENT COUNSEL

**15.1 Legal Representation.** The parties hereto warrant and represent that in executing this Agreement, they have relied solely upon their own judgment, belief and knowledge and the advice and recommendations of their own independently selected and retained counsel, concerning the nature, extent and duration of their rights and claims, and that they have not been influenced to any extent whatsoever in executing this Agreement by any representations or statements with respect to any matters made by any party or representative of any party.

## 16. NOTICES

**16.1 Notice Requirements.** Any notice required to be given hereunder shall be in writing and shall be deemed given if sent by pre-paid first class post, telecopy, email or by delivering of the same by hand or courier to the address of the addressee specified in the Contract or such other address as the addressee may from time to time have notified in writing to the addresser.

## 17. MISCELLANEOUS

**17.1 Breach.** The failure by either party to perform any of such party's obligations hereunder shall not be deemed a breach of this Agreement unless the non-breaching party gives the other party written notice of such failure to perform and such failure (solely if curable) is not corrected within thirty (30) days from and after such party's receipt of such notice.

**17.2 Confidentiality.** The parties acknowledge that this Agreement is confidential to them and they agree not to disclose its terms to any other party without the prior written consent of the other party, except as disclosure may be required to professional advisers or by law, or for carrying out the purposes of this Agreement.

**17.3 Entire Agreement.** This Agreement represents the sole understanding of the parties hereto with regard to the matters prescribed herein and no subsequent change or amendment to this Agreement shall be valid unless it is in writing and signed on behalf of the parties hereto.

**17.4 Governing Law.** This Agreement shall be governed by and construed in accordance with the laws of the State of California applicable to contracts entered in and performed entirely within the State of California without giving any effect to the choice of law principles in the State of California. The parties hereby submit to the jurisdiction of the courts of the State of California.

${LegalDocumentFooter(variables)}

---

**MANAGER ADDRESS:**
${managerAddress || 'To be provided'}
**Contact:** ${managerContact || 'To be provided'}
**Email:** ${managerEmail || 'To be provided'}
**Phone:** ${managerPhone || 'To be provided'}

**ARTIST ADDRESS:**
${artistAddress || 'To be provided'}
**Contact:** ${artistContact || 'To be provided'}
**Email:** ${artistEmail || 'To be provided'}
**Phone:** ${artistPhone || 'To be provided'}`;

  return templateContent;
};