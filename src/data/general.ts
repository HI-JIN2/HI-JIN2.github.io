import type { ResumeVariant } from "./index";

export const GENERAL_RESUME: ResumeVariant = {
  profile: {
    name: "유진",
    headline: "나무보다 숲을 보는 주니어 개발자 — 제품 단위로 만들고 운영하며 개선",
    links: [
      {
        label: "Email",
        value: "qldls0307@naver.com",
        href: "mailto:qldls0307@naver.com",
      },
      { label: "GitHub", value: "https://github.com/HI-JIN2" },
      { label: "Blog", value: "https://velog.io/@jini_1514" },
    ],
  },
  about: [
    {
      title: "제품을 운영하며 개선해온 개발자입니다.",
      descriptions: [
        "기능 단위가 아니라 프로덕트 단위로 개발하고 운영한 경험이 있습니다.",
        "EAT-SSU를 2년간 운영하며 사용자 4,000명 규모 서비스의 품질을 개선했습니다.",
        "CS·피드백 반영, UI/UX 개선, 성능/안정성 개선, 배포/정책 대응까지 운영 사이클을 반복했습니다.",
        "그 결과 WAU/MAU가 21.8% → 62.4%로 개선되며 재방문율을 끌어올렸습니다.",
      ],
    },
    {
      title: "운영 환경을 고려해 안정적인 구조를 고민합니다.",
      descriptions: [
        "배포 후 발생할 수 있는 실패/재시도/중복 실행을 고려해 책임 분리와 작업 단위 분리를 우선으로 설계합니다.",
        "예를 들어 마니또 배정/메일 발송 서비스를 API → 배정 로직 → 발송 작업으로 나눠 중복 실행 상황을 줄이도록 구성했습니다.",
      ],
    },
    {
      title: "협업을 위한 기준(문서/리뷰/컨벤션)을 정리합니다.",
      descriptions: [
        "EAT-SSU 팀을 3명 → 27명 규모로 확장하며 커피챗/세미나/KPT 회고/코드리뷰/컨벤션으로 협업 기준을 정착시켰습니다.",
        "커뮤니티에서 2년간 CS 인터뷰·회고·테크블로그 스터디를 운영하며 함께 성장하는 문화를 만들었습니다.",
      ],
    },
  ],
  skills: [
    {
      title: "Working Style",
      items: [
        "요구사항 정리 / 우선순위",
        "MVP → 운영 → 개선",
        "피드백/지표 기반 개선",
        "코드리뷰 / 컨벤션",
      ],
    },
    {
      title: "Android",
      items: [
        "Kotlin",
        "Jetpack Compose",
        "Coroutine / Flow",
        "Hilt",
        "Room",
        "Firebase",
      ],
    },
    {
      title: "Backend",
      items: ["Kotlin", "Spring Boot", "JPA", "REST API 설계", "JavaMailSender"],
    },
    {
      title: "Infra & Data",
      items: [
        "AWS",
        "Docker",
        "Docker Compose",
        "Linux",
        "PostgreSQL",
        "MySQL",
        "Firebase",
        "Flyway",
      ],
    },
    {
      title: "Tooling",
      items: ["Git", "GitHub", "GitHub Actions", "Fastlane", "Notion", "Figma"],
    },
  ],
  experience: [
    {
      corp: "SK 엠앤서비스",
      about: ["Biz솔루션사업본부 Mobility사업 담당", "(TMAP AUTO 솔루션 개발)"],
      position: "Software Developer Intern",
      from: "2025.07",
      to: "2025.09",
      features: [
        {
          title: "TMAP AUTO 디버깅을 위한 Mock GPS 인터널 앱 개발",
          from: "2025.08",
          to: "2025.09",
          description:
            "차량 없이도 주행 로그를 재현할 수 있도록 Mock GPS 데이터를 생성하는 안드로이드 앱 개발",
          achievements: [],
          contributions: [
            "차량 주행로그 파싱 시 발생하는 병목과 ==OOM==을 ==I/O 버퍼== 크기 확장, ==1000줄== 단위 배치 처리, 정규식 단순화로 파싱 속도 ==50.6%== 개선",
            "경로 탐색으로 ==GPS== 생성시, ==Base64== 자사규격 데이터를 디코딩하여 기존 API 대비 ==48%== 속도 개선",
            "==Compose== 화면에서 ==WebView==가 표시되지 않는 문제를 ==View layoutParams== 지정으로 해결",
            "==Room==으로 다양한 주행 시나리오를 데이터를 로컬에 저장할 수 있도록 설계",
          ],
          spec: [
            "Kotlin",
            "Compose",
            "Multi-Module",
            "Build Logic",
            "Room",
            "JUnit",
          ],
        },
        {
          title: "TMAP EDC SDK를 활용한 HUD Device 연동 프로젝트",
          from: "2025.07",
          to: "2025.07",
          description:
            "EDC SDK를 활용해 주행 정보를 HUD 디바이스로 전송하는 안드로이드 앱 개발",
          achievements: [],
          contributions: [
            "==EDC SDK== 리스너 콜백으로 ==1초==마다 수신되는 주행 정보를 ==Bundle==에서 파싱 후 UI 표출 및 ==HUD==로 ==BLE== 전송",
            "==BLE write==의 비동기로 인한 통신 순서 불일치를 ==Command Queue==와 ==Flag==로 해결",
            "==HUD==의 ==BLE== 프로토콜에 맞춰 ==3Byte== 데이터를 ==Big Endian== 방식으로 분할 전송 로직 구현",
          ],
          spec: [
            "Kotlin",
            "Compose",
            "Multi-Module",
            "BLE",
            "Hilt",
            "Tmap EDC SDK",
          ],
        },
      ],
    },
    {
      corp: "레이시오",
      about: ["GPS 기반 사이클링 컴퓨터 스타트업"],
      position: "Software Developer Intern",
      from: "2024.09",
      to: "2024.12",
      features: [
        {
          title: "전기자전거 신호 모킹 가상 자전거 앱",
          from: "2024.09",
          to: "2024.09",
          description:
            "해외 전시회에서 프로토타입을 시연해야 하는 상황에서, 실제 전기자전거 없이도 주행 신호를 송수신할 수 있는 데모 앱 개발",
          achievements: [
            "해외 전시회에서 해당 데모로 전기자전거 속도계를 시연해 파트너사 계약 체결에 기여",
          ],
          contributions: [
            "==BLE Advertising==을 활용해 실제 기기 없이도 주행 신호를 송수신하도록 구현",
            "==LaunchedEffect(speed)== 변화를 감지해 ==frameDuration==을 재계산하며 자연스러운 속도 애니메이션 구성",
            "==Foreground Service==와 ==Notification== 조합으로 백그라운드 상태에서도 ==BLE== 연결 유지",
          ],
          spec: ["Kotlin", "Jetpack Compose", "BLE", "Service", "Coroutine"],
        },
        {
          title: "trimm Cycling Center",
          from: "2024.10",
          to: "2024.12",
          description:
            "앱 신기능 개발 및 유지보수",
          achievements: [
            "운동 목표 설정 기능 정식 출시로 사용자 맞춤 경험 강화",
          ],
          contributions: [
            "중장년층 베타테스터 피드백을 토대로 depth를 줄여 접근성을 확보",
            "==Thread.join== 기반 동기 로직을 ==Coroutine== 비동기로 전환해 처리 속도를 ==250ms==에서 ==0.5ms==로 단축",
            "==Deprecated== 라이브러리 제거와 최신 버전 교체로 유지보수성 향상",
          ],
          spec: ["Kotlin", "XML", "Jetpack Compose", "Coroutine", "BLE"],
        },
      ],
    },
    {
      corp: "사각",
      about: ["마이데이터 및 헬스케어 B2C 스타트업"],
      position: "Software Developer Intern",
      from: "2023.06",
      to: "2023.08",
      features: [
        {
          title: "쇼핑몰 결제내역 파싱 API",
          from: "2023.06",
          to: "2023.08",
          description:
            "다양한 쇼핑몰 결제 내역을 통합 포맷으로 정규화하는 API를 TDD와 페어 프로그래밍으로 개발",
          achievements: [
            "쇼핑몰별 다른 HTML 구조를 단일 포맷으로 통합해 마이데이터 활용을 높임",
          ],
          contributions: [
            "Selenium과 BeautifulSoup으로 로그인부터 상세 페이지까지 크롤링 파이프라인 구성",
          ],
          spec: ["Python", "Selenium", "BeautifulSoup", "Flask"],
        },
      ],
    },
  ],
  personalProjects: [
    {
      title: "EAT-SSU(잇슈)",
      from: "2022.11",
      to: "",
      links: [
        {
          title: "GitHub",
          url: "https://github.com/EAT-SSU/Android",
        },
      ],
      features: [
        {
          title: "누적 가입자 4,000+명이 사용하는 학식 리뷰 서비스 기획 · 개발 · 운영",
          spec: [
            "Kotlin",
            "XML",
            "Compose",
            "Clean Architecture",
            "MVVM",
            "Hilt",
            "Retrofit",
            "Coroutine",
            "Flow",
            "WorkManager",
            "Notification",
            "Glance",
            "Firebase",
            "Gson",
          ],
          achievements: [
            "==Crashlytics== 로그 분석으로 ==15건== 이상의 주요 크래시를 해결해 비정상 종료율 ==0%== 유지",
            "==40회== 이상 업데이트와 플레이스토어·에브리타임·인스타그램 피드백 채널로 사용자 요구를 빠르게 반영",
            "==Remote Config==를 도입해 학기별 식당 운영 시간 변경을 코드 수정 없이 즉시 반영",
            "교내 ==2023== 소프트웨어 공모전 금상 수상",
          ],
          contributions: [
            "레거시 ==XML== 구조를 ==MVVM + Clean Architecture==로 재설계하고 ==sealed UiState==로 일관된 로딩 경험 제공",
            "==SharedFlow== 기반 ==UiEvent== 관리로 Toast 중첩 문제를 제거",
            "==Compressor== 기반 이미지 압축으로 용량을 ==84~93%== 절감해 ==S3== 비용을 최적화하고 ==suspend== 기반 이미지 업로드로 처리 안정성 확보",
            "==Glance== 위젯 + ==WorkManager== + ==DataStore==를 결합해 위젯 자동 업데이트와 사용자 커스터마이징 기능 구현",
          ],
        },
      ],
    },
    {
      title: "마니또 파티",
      from: "2025.12",
      to: "",
      links: [
        {
          title: "GitHub",
          url: "https://github.com/HI-JIN2/manitto-backend",
        },
      ],
      features: [
        {
          title: "마니또 배정 및 이메일 전송 자동화 서비스",
          spec: [
            "Kotlin",
            "Spring Boot",
            "JPA",
            "JavaMailSender",
            "PostgreSQL",
            "Docker",
            "Docker Compose",
            "Flyway",
          ],
          achievements: [
            "1인 풀스텍 설계 · 개발 · 운영",
            "9개의 그룹, 43명의 사용자가 이용",
          ],
          contributions: [
            "마니또 배정 규칙(자기 자신 배정 방지, 중복 배정 방지)을 만족하는 배정 알고리즘을 설계하고 코드로 모델링",
            "배정 결과를 기반으로 이메일 발송 작업을 비동기 처리 구조로 구현해 사용자 요청과 발송 작업을 분리",
            "서비스 실행 흐름을 API → 배정 로직 → 메일 발송 단계로 분리해 책임이 명확한 구조로 설계",
            "운영 환경에서 발생할 수 있는 재시도, 중복 실행을 고려해 배정 로직의 멱등성을 확보",
          ],
        },
      ],
    },
    {
      title: "새길",
      from: "2025.03",
      to: "2025.07",
      links: [
        {
          title: "GitHub",
          url: "https://github.com/saegil-project/Saegil-Android",
        },
      ],
      features: [
        {
          title: "북한이탈주민 정착 지원 서비스 안드로이드 앱",
          spec: [
            "Kotlin",
            "Compose",
            "Navigation2",
            "Clean Architecture",
            "MVVM",
            "Multi-Module Architecture",
            "Hilt",
            "Ktor",
            "Coroutine",
            "Flow",
            "Naver Maps Compose",
            "Coil",
            "OPEN AI Realtime API",
            "WebSocket",
          ],
          achievements: [
            "15회 숭실 캡스톤디자인 경진대회 장려상 수상",
            "전공종합설계 교과목 A학점 달성",
          ],
          contributions: [
            "==OpenAI Realtime API WebSocket==을 도입해 기존 ==REST + TTS== 대비 응답 지연을 ==11초==에서 ==3초==로 단축",
            "지도 중심 좌표 이동에 ==0.1km== 임계값을 적용해 API 호출량을 ==78%== 감소",
            "줌 레벨로 요청 범위를 조정해 전달받는 데이터를 최적화하고 서버 부하를 완화",
          ],
        },
      ],
    },
    {
      title: "ISBN 바코드 스캔 기반 도서 전산 시스템",
      from: "2024.07",
      to: "2024.07",
      links: [
        {
          title: "GitHub",
          url: "https://github.com/HI-JIN2/isbn-scanner-mini-library",
        },
      ],
      features: [
        {
          title: "ISBN 기반 도서 전산 자동화 시스템 (개인 프로젝트)",
          spec: [
            "Kotlin",
            "ZXing(Scanner)",
            "Google Books API",
            "Google Spreadsheet API",
          ],
          achievements: [
            "인도네시아 해외봉사 중, 500권 이상의 도서를 빠르게 등록하기 위한 자동화 시스템",
            "4시간 만에 MVP를 완성해 수작업 대비 6배 이상의 등록 효율을 달성",
          ],
          contributions: [
            "==ISBN== 바코드 스캔 → ==Google Books API== 조회 → ==Google Spreadsheet== 저장을 자동화해 ==1권당 1분== 걸리던 작업을 ==10초==로 단축",
            "비개발자 봉사단원을 위해 ==Google Apps Script==로 Spreadsheet를 데이터베이스처럼 활용하도록 설계",
          ],
        },
      ],
    },
    {
      title: "COOING",
      from: "2023.10",
      to: "2023.12",
      links: [
        {
          title: "GitHub",
          url: "https://github.com/COOING-team/COOING-Server",
        },
      ],
      features: [
        {
          title: "쿠잉, 아이의 음성으로 쓰는 성장일기",
          achievements: [
            "백엔드 개발 및 인프라 구축",
          ],
          contributions: [
            "음성 데이터 처리 및 저장 시스템 개발",
            "NCP 기반 서버 인프라 설계 및 운영",
          ],
        },
      ],
    },
    {
      title: "머니메이트",
      from: "2023.10",
      to: "2023.11",
      links: [
        {
          title: "GitHub",
          url: "https://github.com/MoneyMate-project/MoneyMate",
        },
      ],
      features: [
        {
          title: "금융 API와 AI를 활용한 금융조언 앱",
          achievements: [
            "AI활용 온라인 개발대회 싱커톤 시즌3 최우수상(2위) 수상",
          ],
          contributions: [
            "안드로이드 개발, 백엔드, 프롬프팅, 팀장",
            "금융 API 연동 및 OPENAI 기반 금융 조언 기능 구현",
          ],
        },
      ],
    },
  ],
};
