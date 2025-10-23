import React from 'react';
import { LegalDocumentVariables, formatLegalDocument, LegalDocumentHeader, LegalDocumentFooter } from './legal-document-base';

interface FormProducerAgreementTemplateProps {
  variables: LegalDocumentVariables;
}

export const FormProducerAgreementTemplate: React.FC<FormProducerAgreementTemplateProps> = ({ variables }) => {
  const {
    artist,
    producer,
    company,
    companyAddress,
    companyContact,
    companyTitle,
    companyEmail,
    companyPhone,
    producerAddress,
    producerContact,
    producerTitle,
    producerEmail,
    producerPhone,
    compositionTitle,
    advance,
    royaltyRate,
    date
  } = variables;

  const templateContent = `# PRODUCER AGREEMENT

**AGREEMENT** made and entered into as of this **${date}** between the parties listed below.

---

## RECITALS

**A.** Company is engaged in the business of producing, manufacturing, and distributing phonograph records and other audio recordings;

**B.** Producer is a professional music producer with expertise in creating master recordings;

**C.** Artist is a recording artist who has entered into an exclusive recording agreement with Company;

**D.** Company desires to engage Producer to provide production services in connection with certain master recordings featuring Artist's performances;

**E.** Producer desires to provide such production services to Company on the terms and conditions set forth herein;

**NOW, THEREFORE**, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

## 1. DEFINITIONS

**1.1 "Artist"** means ${artist}.

**1.2 "Company"** means ${company}, with offices at ${companyAddress}.

**1.3 "Producer"** means ${producer}.

**1.4 "Master(s)"** means the master recording(s) embodying Artist's performance of the musical composition(s) listed in Schedule A attached hereto.

**1.5 "Composition(s)"** means the musical composition(s) listed in Schedule A.

## 2. ENGAGEMENT

**2.1 Services.** Company hereby engages Producer to provide production services in connection with the Master(s). Producer shall perform all services customarily performed by music producers in the recording industry, including but not limited to:

- Arranging and directing recording sessions
- Selecting and engaging musicians and vocalists
- Supervising the technical aspects of recording
- Mixing and mastering the Master(s)
- Delivering commercially and technically satisfactory Master(s)

**2.2 Delivery.** Producer shall deliver the completed Master(s) to Company on or before the delivery date specified in Schedule A.

## 3. COMPENSATION

**3.1 Advance.** Company shall pay Producer a non-recoupable advance in the amount of **${advance}** (the "Advance") upon execution of this Agreement.

**3.2 Royalties.** Producer shall be entitled to receive royalties in the amount of **${royaltyRate}%** of the suggested retail list price of records sold through normal retail channels in the United States, subject to the terms and conditions set forth in Schedule B.

## 4. OWNERSHIP AND RIGHTS

**4.1 Work for Hire.** Producer acknowledges that all services performed hereunder are "works made for hire" within the meaning of the Copyright Act of 1976, and that Company shall own all rights, title, and interest in and to the Master(s).

**4.2 Grant of Rights.** Producer hereby assigns to Company all rights, title, and interest in and to the Master(s), including all copyrights and neighboring rights.

## 5. CREDIT

**5.1 Producer Credit.** Company shall accord Producer credit as "Produced by ${producer}" on all records embodying the Master(s) and in all advertising and promotional materials.

## 6. REPRESENTATIONS AND WARRANTIES

**6.1 Producer's Representations.** Producer represents and warrants that:
- Producer has the full right and authority to enter into this Agreement
- Producer's services will not infringe upon the rights of any third party
- Producer will not use any unauthorized samples or copyrighted material

**6.2 Company's Representations.** Company represents and warrants that it has the full right and authority to enter into this Agreement and to exploit the Master(s) as contemplated herein.

## 7. INDEMNIFICATION

Each party shall indemnify, defend, and hold harmless the other party from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to any breach of the representations and warranties made by such party herein.

## 8. TERM AND TERMINATION

**8.1 Term.** This Agreement shall commence on the date hereof and shall continue until all obligations hereunder have been fulfilled.

**8.2 Termination.** Either party may terminate this Agreement upon written notice if the other party materially breaches any provision hereof and fails to cure such breach within thirty (30) days after written notice thereof.

## 9. GENERAL PROVISIONS

**9.1 Governing Law.** This Agreement shall be governed by and construed in accordance with the laws of the State of California.

**9.2 Entire Agreement.** This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements relating to the subject matter hereof.

**9.3 Amendment.** This Agreement may not be amended except by written instrument signed by both parties.

**9.4 Assignment.** This Agreement may not be assigned by either party without the prior written consent of the other party.

**9.5 Notices.** All notices required hereunder shall be in writing and shall be delivered to the addresses set forth below.

${LegalDocumentFooter(variables)}

---

## INDUCEMENT

To induce **${artist}** ("Company") to enter into the foregoing agreement ("Agreement") with **${producer}** ("Lender"), the undersigned hereby:

**(a)** acknowledges that the undersigned understands and is familiar with all the terms and conditions of the Agreement;

**(b)** assents to the execution of the Agreement and agrees to be bound by the terms and conditions thereof, including, without limitation, each and every provision of the Agreement that relates to the undersigned in any way, directly or indirectly, the services to be rendered thereunder by the undersigned and restrictions imposed upon the undersigned in accordance with the provisions of the Agreement, and hereby guarantees to Company the full and faithful performance of all the terms and conditions of the Agreement by the undersigned and Lender (including, without limitation, all representations, warranties and indemnification obligations set forth in the Agreement); and

**(c)** acknowledges and agrees that Company shall be under no obligation to make any payments to the undersigned or otherwise, for or in connection with this inducement and for or in connection with the services rendered by the undersigned or in connection with the rights granted to Company thereunder and the fulfillment of the undersigned's obligations pursuant to the Agreement (except mechanical royalties and other publishing monies, if any).

**AGREED AND ACCEPTED:**

__________________________________________
**${producer}**

---

## SCHEDULE A
**Master Recordings and Compositions**

- **Composition Title:** ${compositionTitle}
- **Artist:** ${artist}
- **Producer Credit:** Produced by ${producer}

## SCHEDULE B
**Producer Royalty Provisions**

1. **Royalty Rate:** ${royaltyRate}% of the suggested retail list price

2. **Royalty Base:** Royalties shall be calculated on records sold through normal retail channels in the United States

3. **Reserves:** Company may establish reasonable reserves for returns and exchanges

4. **Statements:** Company shall account to Producer quarterly within sixty (60) days after the end of each calendar quarter

5. **Audit Rights:** Producer shall have the right to audit Company's books and records relating to the Master(s) upon reasonable notice

---

**COMPANY ADDRESS:**
${companyAddress}
**Contact:** ${companyContact}
**Email:** ${companyEmail}
**Phone:** ${companyPhone}

**PRODUCER ADDRESS:**
${producerAddress || 'To be provided'}
**Contact:** ${producerContact || 'To be provided'}
**Email:** ${producerEmail || 'To be provided'}
**Phone:** ${producerPhone || 'To be provided'}`;

  return templateContent;
};