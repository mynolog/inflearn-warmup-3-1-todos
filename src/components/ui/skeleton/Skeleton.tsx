type SkeletonProps = {
  width?: string
  height?: string
  borderRadius?: string
}

export default function Skeleton({
  width = '100%',
  height = '40px',
  borderRadius = '4px',
}: SkeletonProps) {
  return (
    <div
      className={`bg-gray-100 animate-pulse`}
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  )
}
