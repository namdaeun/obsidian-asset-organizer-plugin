# Images Organizer Plugin

옵시디언 볼트 내 분산된 이미지 파일들을 자동으로 `_images` 폴더로 정리해주는 플러그인입니다.

## 문제 인식

옵시디언을 사용하다 보면 이미지 파일들이 여러 곳에 분산되어 저장됩니다:

-   노트와 같은 폴더에 저장된 이미지
-   루트 폴더에 저장된 이미지
-   클립보드에서 붙여넣기로 생성된 이미지
-   드래그 앤 드롭으로 추가된 이미지

이렇게 분산된 이미지들은 볼트 관리를 어렵게 만들고, 백업이나 정리 시 혼란을 초래합니다.

## 해결책

**Images Organizer Plugin**은 이 문제를 자동으로 해결합니다:

-   플러그인 활성화 시 기존의 모든 이미지를 `_images` 폴더로 자동 정리
-   새로 추가되는 이미지도 자동으로 `_images` 폴더로 이동

## 기능

-   ✅ 기존 이미지 파일 자동 정리
-   ✅ 새로 생성되는 이미지 파일 자동 이동
-   ✅ 지원 포맷: PNG, JPG, JPEG, GIF, WebP

## 설치 방법

### 수동 설치

1. 이 저장소를 클론하거나 다운로드합니다.
2. `npm install`로 의존성을 설치합니다.
3. `npm run build`로 빌드합니다.
4. 볼트 폴더의 `.obsidian/plugins/obsidian-images-organizer-plugin/` 폴더를 생성합니다.
5. 빌드된 `main.js`와 `manifest.json`을 해당 폴더에 복사합니다.
6. Obsidian을 재시작합니다.
7. **설정 → 커뮤니티 플러그인**에서 "Images Organizer Plugin"을 활성화합니다.

### 개발 환경 설치

```bash
npm install

npm run dev

npm run build
```

## 사용 방법

플러그인을 활성화하면 자동으로 동작합니다:

1. **기존 이미지 정리**: 플러그인 활성화 시 볼트 내 모든 이미지가 `_images` 폴더로 이동됩니다.
2. **새 이미지 자동 정리**: 이후 추가되는 모든 이미지는 자동으로 `_images` 폴더에 저장됩니다.

## 폴더 구조

`as-is`

```
📁 My Vault
├── 📄 Note1.md
├── 📁 Folder
│   └── 📄 Note2.md
├── 🖼️ image1.png
├── 🖼️ image2.png
└── 🖼️ screenshot.gif

```

`to-be`

```
📁 My Vault
├── 📁 _images
│   ├── 🖼️ image1.png
│   ├── 🖼️ image2.jpg
│   └── 🖼️ screenshot.webp
├── 📄 Note1.md
└── 📁 Folder
    └── 📄 Note2.md

```

## 주의사항

-   플러그인 활성화 시 모든 이미지가 즉시 이동됩니다. 백업을 권장합니다.
-   이미지 이동 시 노트 내 링크는 Obsidian의 내장 기능으로 자동 업데이트됩니다.
-   `_images` 폴더가 없으면 자동으로 생성됩니다.
