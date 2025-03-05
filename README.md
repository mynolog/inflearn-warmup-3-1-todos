# 인프런 워밍업 클럽 3기 풀스택 1주차 과제 - Todo List

#### 트러블 슈팅

###### material-tailwind와 TailwindCSS 충돌

문제 설명

- 강의와 동일한 개발 환경을 구축하기 위해 material-tailwind와 tailwindcss를 동시에 사용했으나, 일부 TailwindCSS 클래스가 제대로 적용되지 않는 문제가 발생.

시도한 방법

1.  HTML 스타일 적용 순서 확인
    - material-tailwind와 tailwindcss의 스타일 적용 순서를 확인하여, 우선순위 문제를 해결하려 했으나 문제가 해결되지 않음.
2.  !important 적용

    - 스타일이 적용되지 않는 요소에 !important를 사용하여 우선순위를 높이려 시도했으나, 일부 스타일이 여전히 덮어쓰여지지 않음.

3.  tailwind.config.ts 파일 초기화

    - tailwind.config.ts에서 설정을 초기화하고, 기본 TailwindCSS 설정을 사용하였으나 문제가 해결됨. 이로 인해 material-tailwind의 설정이 영향을 미친 것으로 추정됨.

4.  material-tailwind 의존성 제거

    - 최종적으로 material-tailwind를 프로젝트에서 제거하고, 필요한 스타일을 TailwindCSS로만 처리하여 문제가 해결됨.

결론

- material-tailwind와 tailwindcss 간의 충돌로 인해 스타일이 제대로 적용되지 않았던 문제는, material-tailwind 의존성 제거를 통해 해결됨.
- 라이브러리 간 충돌을 해결하려면 많은 시간과 비용이 소모될 수 있기 때문에, material-tailwind를 제거하고 tailwindcss만 사용하는 방식으로 문제를 해결하였음.
- 문제를 단순화하고 개발 효율성을 높이는 방법으로 '걷어내기' 방식도 충분히 합리적인 해결책이 될 수 있음.
