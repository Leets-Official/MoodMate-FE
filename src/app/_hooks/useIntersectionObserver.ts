import { useEffect, type RefObject, useRef } from 'react'

export const useIntersectionObserver = <T extends HTMLElement>(
  targetRef: RefObject<T>,
  onIntersect: IntersectionObserverCallback,
  hasNextPage: boolean | undefined,
) => {
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (targetRef && targetRef.current) {
      observer.current = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      })

      if (!hasNextPage) {
        observer.current?.unobserve(targetRef.current)
      } else {
        observer.current.observe(targetRef.current)
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [targetRef, onIntersect, hasNextPage])
}
