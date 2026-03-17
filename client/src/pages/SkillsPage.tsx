import { SkillsSection } from '../components/home/SkillsSection'
import type { SkillGroup } from '../types/site'

interface SkillsPageProps {
  skills: SkillGroup[]
}

export function SkillsPage({ skills }: SkillsPageProps) {
  return <SkillsSection skills={skills} />
}
