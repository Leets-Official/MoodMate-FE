import { useEffect, type RefObject, useRef } from 'react'

export const useIntersectionObserver = <T extends HTMLElement>(
  targetRef: RefObject<T>, //관찰하는 요소
  onIntersect: IntersectionObserverCallback, //관찰 되었을 때 실행하고 싶은 함수
  hasNextPage: boolean | undefined, //무한 스크롤로 더 불러올 요소가 있는지
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
        return
      }

      observer.current.observe(targetRef.current)
    }

    return () => observer && observer.current?.disconnect()
  }, [targetRef, onIntersect])
}
