'use client';

import { useEffect, useState } from 'react';
import { GatedForm, type Field } from '@/components/GatedForm';
import { AUDIENCE_LABEL, readAssessment, type PartnershipAssessment } from '@/lib/assessment';

const FIELDS: Field[] = [
  {
    kind: 'select',
    id: 'c-type',
    label: 'Enquiry type',
    required: true,
    options: [
      'General enquiries',
      'Strategic partnerships',
      'Incubators and accelerators',
      'Capital relationships',
    ],
  },
  { kind: 'text', id: 'c-name', label: 'Name', required: true, autoComplete: 'name' },
  { kind: 'email', id: 'c-email', label: 'Work email', required: true, autoComplete: 'email' },
  { kind: 'text', id: 'c-org', label: 'Organisation', autoComplete: 'organization' },
  {
    kind: 'textarea',
    id: 'c-message',
    label: 'Message',
    required: true,
    hint: 'Do not include passwords, payment details or documents you are not ready to share by email.',
  },
];

export function ContactForm() {
  const [carried, setCarried] = useState<PartnershipAssessment | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const data = readAssessment();
    if (data && data.audience !== 'founder') setCarried(data);
    setReady(true);
  }, []);

  if (!ready) return <div className="form" aria-busy="true" />;

  const enquiryType = carried ? 'Incubators and accelerators' : '';

  return (
    <>
      {carried ? (
        <div className="qualifier">
          <p>
            <strong>From your startup partnership assessment.</strong> You are marked as{' '}
            {AUDIENCE_LABEL[carried.audience].toLowerCase()}. Stage: {carried.stage}. Need: {carried.need}.
            Structure: {carried.structure}. Context: {carried.context}. The enquiry type below is set to
            match. You can change it. Personal contact details are only needed if you choose to email us.
          </p>
        </div>
      ) : null}
      <GatedForm
        id="contact-form"
        fields={FIELDS}
        defaults={enquiryType ? { 'c-type': enquiryType } : undefined}
        consents={[
          {
            id: 'c-privacy',
            required: true,
            label:
              'I have read the Privacy Notice and understand that emailing Pixelette Holdings Ltd will let them use this information to respond to my enquiry.',
          },
        ]}
        submitLabel="Send enquiry"
        mailSubject="Contact enquiry"
        note="Sending an enquiry does not create a partnership, an investment or a commitment by either side."
      />
    </>
  );
}
