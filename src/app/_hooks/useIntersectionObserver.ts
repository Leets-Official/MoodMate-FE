import { useEffect, type RefObject, useRef } from 'react'

export const useIntersectionObserver = <T extends HTMLElement>(
  containerRef: RefObject<T>,
  topDivRef: RefObject<T>,
  onIntersect: () => void,
  hasNextPage: boolean | undefined,
) => {
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target === topDivRef.current &&
          hasNextPage
        ) {
          setTimeout(() => {
            fetchNextPage()
          }, 300)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    if (containerRef.current && topDivRef.current) {
      observer.observe(topDivRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasNextPage, fetchNextPage])
}
