import { AboutSection } from '../components/home/AboutSection'
import type { ProfileContent } from '../types/site'

interface AboutPageProps {
  profile: ProfileContent
}

export function AboutPage({ profile }: AboutPageProps) {
  return <AboutSection profile={profile} />
}
