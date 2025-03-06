# 인프런 워밍업 클럽 3기 풀스택 1주차 과제 - Todo List

### 📌 프로젝트 개요

- 이 프로젝트는 **인프런 워밍업 클럽 3기 풀스택 1주차 과제**로 제출된 Next Todo 앱입니다.
- 할 일을 관리할 수 있는 CRUD 기능과 함께 완료 시간 표시 및 생성 시간 기록 기능을 제공하며, TailwindCSS를 사용하여 UI를 구현하였습니다.

### 🛠️ 설치 방법

```bash
git clone https://github.com/mynolog/inflearn-warmup-3-1-todos.git
cd ./inflearn-warmup-3-1-todos
npm install
# .env.sample 참고하여 프로젝트 루트에 .env 생성
```

### ▶️ 실행 방법

```bash
npm run dev
```

### 🎥 데모 영상

### 🚀 배포 링크

### 🧳 기술 스택

<p style="display: flex; gap: 10px;">
  <a href="https://nextjs.org/">
    <img src="https://skillicons.dev/icons?i=nextjs" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" />
  </a>
  <a href="https://tanstack.com/query/v5/docs/framework/react/overview">
  <img
      src="https://go-skill-icons.vercel.app/api/icons?i=reactquery"
    />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://skillicons.dev/icons?i=tailwind" alt="TailwindCSS" />
  </a>
  <a href="https://supabase.com/">
    <img src="https://skillicons.dev/icons?i=supabase" alt="Supabase" />
  </a>
</p>

### ✨ 기능 설명

- ✅ **할 일 추가(Create)** - 새로운 할 일을 입력하고 추가할 수 있으며, 생성 시간이 표시됨
- 📋 **할 일 목록 조회(Read)** - 저장된 할 일 목록을 확인할 수 있음
- ✏️ **할 일 수정(Update)** - 기존의 할 일 내용을 수정할 수 있음
- ❌ **할 일 삭제(Delete)** - 완료된 할 일을 삭제할 수 있음
- ☑️ **할 일 완료 표시** - 체크박스를 선택하면 완료 시간이 표시됨
- ⏳ **할 일 생성 시간 기록** - 할 일 추가 시 생성 시간이 표시됨
- 💀 **스켈레톤 UI 적용** - 로딩 중 빈 화면 대신 스켈레톤 UI를 적용하여 UX 개선 및 로딩 상태를 직관적으로 전달
- 🧠 **검색어 디바운스 적용** - 검색어 입력 시 입력이 완료된 후 일정 시간(600ms) 동안 추가 입력이 없을 때 검색 필터링 업데이트

### ⚡ 트러블 슈팅

#### 1. material-tailwind와 TailwindCSS 충돌 (2025. 3. 5)

문제 설명

- 강의와 동일한 개발 환경을 구축하기 위해 material-tailwind와 tailwindcss를 동시에 사용했으나, 일부 TailwindCSS 클래스가 제대로 적용되지 않는 문제가 발생

시도한 방법

- HTML 스타일 적용 순서 확인
  - material-tailwind와 tailwindcss의 스타일 적용 순서를 확인하여, 우선순위 문제를 해결하려 했으나 문제가 해결되지 않음
- !important 적용

  - 스타일이 적용되지 않는 요소에 !important를 사용하여 우선순위를 높이려 시도했으나, 일부 스타일이 여전히 덮어쓰여지지 않음

- tailwind.config.ts 파일 초기화

  - tailwind.config.ts에서 설정을 초기화하고, 기본 TailwindCSS 설정을 사용하였으나 문제가 해결됨. 이로 인해 material-tailwind의 설정이 영향을 미친 것으로 추정됨

- material-tailwind 의존성 제거

  - 최종적으로 material-tailwind를 프로젝트에서 제거하고, 필요한 스타일을 TailwindCSS로만 처리하여 문제가 해결됨

결론

- material-tailwind와 tailwindcss 간의 충돌로 인해 스타일이 제대로 적용되지 않았던 문제는, material-tailwind 의존성 제거를 통해 해결됨
- 라이브러리 간 충돌을 해결하려면 많은 시간과 비용이 소모될 수 있기 때문에, material-tailwind를 제거하고 tailwindcss만 사용하는 방식으로 문제를 해결하였음
- 문제를 단순화하고 개발 효율성을 높이는 방법으로 '걷어내기' 방식도 충분히 합리적인 해결책이 될 수 있음

#### 2. 초기 렌더링 및 검색 시 불필요한 데이터 패칭 문제 (2025. 3. 6)

문제 설명

- 초기 렌더링 시, getTodos 메서드를 통해서 데이터를 패칭하고, 검색어를 입력 시마다 getTodos를 호출하여 불필요한 네트워크 요청이 지속적으로 발생
- 검색어 입력 시마다 스켈레톤 UI가 계속 렌더링되는 현상 발생

해결 방법

- 검색어 디바운스 적용
  - 검색어 입력 시 일정시간 동안 딜레이를 의도적으로 발생시켜서 이후에도 계속 입력이 없으면 데이터를 패칭하도록 구현
- 데이터 필터링 적용
  - 초기 렌더링 시, getTodos로 패칭한 데이터는 'todos'로 캐싱되도록 구현했기 때문에 검색은 캐싱된 데이터를 기반으로 필터링을 적용하여 불필요한 네트워크 요청 감소
- 초기 렌더링시에만 스켈레톤 UI 적용

결과

- 데이터 패칭을 최적화하여 서버 부담을 줄이고, UI 업데이트 속도 및 UX도 일부 개선되었음
- filterdTodos로 렌더링을 하여 검색어 입력 시에 스켈레톤 UI가 렌더링되는 문제도 해결하였음
