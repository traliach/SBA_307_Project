import { ContactSection } from '../components/home/ContactSection'
import type {
  ContactItem,
  ContactSubmissionInput,
  ContactTopic,
  SubmitState,
} from '../types/site'

interface ContactPageProps {
  contactForm: ContactSubmissionInput
  contactItems: ContactItem[]
  contactTopics: ContactTopic[]
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  submitMessage: string
  submitState: SubmitState
}

export function ContactPage({
  contactForm,
  contactItems,
  contactTopics,
  onChange,
  onSubmit,
  submitMessage,
  submitState,
}: ContactPageProps) {
  return (
    <ContactSection
      contactForm={contactForm}
      contactItems={contactItems}
      contactTopics={contactTopics}
      onChange={onChange}
      onSubmit={onSubmit}
      submitMessage={submitMessage}
      submitState={submitState}
    />
  )
}
