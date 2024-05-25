# PETROUND 프론트엔드



## 명령어
```
pnpm dev:docs     // UI 디자인시스템 문서
```

## 기술 스택
- 🎁 turborepo (monorepo + microfrontend)
- ⚡ [Next.js](https://nextjs.org) app router 사용
- 🔥 [TypeScript](https://www.typescriptlang.org)
- 💎 Shadcn UI [shadecn ui](https://ui.shadcn.com/)
- 🚨 React Query
- 🧪 Zustand
- ⌨️ React Hook Form
- 💖 Prettier [Prettier](https://prettier.io)
- 🦊 Husky (+ lint stage, commit lint, Commitizen)
- 📏 [ESLint](https://eslint.org)

## 프로젝트 구조

```
.
├── apps
│   ├── client-rn                   # 사용자 앱 (리액트 네이티브)
│   ├── partner-rn                  # 파트너 앱 (리액트 네이티브)
│   ├── admin                       # 관리자 (Next.js)
│   └── docs                        # Ui 디자인시스템 문서 (Next.js + Velite)
│ 
├── packages
│   ├── eslint-config               # eslint 설정
│   ├── typescript-config           # typescript 설정
│   └── ui                          # 공통 컴포넌트
│ 
├── package.json                       
├── turbo.josn                                          
├──      .
├──      .
├──      .
```


## 셋팅 및 가이드
- 사용 하고 있는 툴에 맞게 파일 저장시 eslint + prettier 적용 되게 셋팅 하기

## 지켜야할 규칙
### - 커밋
- 적당히 나누어서 커밋하기 (많은 수정파일 한번에 커밋 하지 않기)
- 의미있는 커밋 메시지 작성 (작업에 대한 내용을 구체적 으로 명확히)

## 컨벤션
- [클린코드 자바스크립트](https://github.com/sbyeol3/clean-code-javascript-kr)

## Info
- UI docs 는 [nextjs-velite-blog-template](https://github.com/jolbol1/nextjs-velite-blog-template) 기반 위에서 작업


## 블로그 참조
- [모노레포 - Monolithic Architecture. Advantages and Disadvantages](https://datamify.medium.com/monolithic-architecture-advantages-and-disadvantages-e71a603eec89)
