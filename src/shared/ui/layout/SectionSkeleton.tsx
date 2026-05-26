import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'

type SectionSkeletonProps = {
  minHeight?: string
  label?: string
}

/** 首頁動態載入區塊的輕量 placeholder */
export default function SectionSkeleton({
  minHeight = '24rem',
  label = '載入中',
}: SectionSkeletonProps) {
  return (
    <Section aria-label={label} aria-busy="true" className="bg-white">
      <Container>
        <div
          className="surface-card mx-auto max-w-4xl animate-pulse bg-neutral-100/80"
          style={{ minHeight }}
          role="status"
        >
          <span className="sr-only">{label}</span>
        </div>
      </Container>
    </Section>
  )
}
