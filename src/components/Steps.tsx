import { FitText } from './FitText'

// the steps card itself is part of the page background on both breakpoints
export function Steps() {
  return (
    <>
      <FitText as="h2" fit={[668, 1362, 4371]} fitM={[49, 360, 1814]} className="h rv" style={{ color: 'var(--brown)' }}>Your Diwali Makeover in</FitText>
      <FitText as="h2" fit={[855, 1138, 4431]} fitM={[131, 274, 1839]} className="h rv" style={{ color: 'var(--brown)' }}>5 Simple Steps</FitText>
    </>
  )
}
