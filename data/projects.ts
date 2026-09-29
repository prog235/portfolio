import type { ProblemSectionData } from "./problem";
import agentTownImage from "@/public/agent_town_img.png";

export type ProjectTheme = "theme-experience" | "theme-efficiency" | "theme-brand";
export type ProjectImage = { src: string; alt: string; caption?: string };
export type TextBlock = { title: string; body: string };
export type ProjectSections = {
  problem: ProblemSectionData;
  approach: { body: string; decisions: TextBlock[] };
  howItWorks: { body: string; diagram: ProjectImage; steps: TextBlock[] };
  challenges: { body: string; items: { challenge: string; solution: string }[] };
  results: { body: string; metrics: { label: string; value: string; context: string }[]; learning: string };
  next: { limitations: string; steps: string };
};
export type Project = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  keywords: string[];
  theme: ProjectTheme;
  image: ProjectImage;
  metadata: { type: string; period: string; role: string; stack: string[] };
  sections: ProjectSections;
};

// 각 프로젝트의 sections 안에서 빈 문자열을 채우세요. 안내 주석은 화면에 표시되지 않습니다.
// 배열 항목은 필요에 따라 복사하거나 삭제할 수 있습니다.
// Evidence type: quote / observation / metric / screenshot / log / constraint
// quote에는 확인된 실제 발언만, metric에는 측정한 값과 조건만 입력하세요.
// keyQuestion은 비워두면 숨겨집니다. 이미지를 넣을 때는 alt도 함께 작성하세요.

export const projects: Project[] = [
  {
    slug: "unity-interactive-narrative",
    category: "AI × EXPERIENCE",
    title: "Unity Interactive Narrative",
    summary: "진행 상태를 이해하는 LLM NPC를 통해 자유로운 대화와 안정적인 게임 진행을 결합했습니다.",
    keywords: ["LLM Agent", "State-based UX", "Guardrails"],
    theme: "theme-experience",
    image: { src: "/unity_img.png", alt: "unity_img" },
    metadata: { type: "개인 프로젝트", period: "2025.09 - 2025.12", role: "기획 및 개발, 음악 제작", stack: ["Unity", "C#", "FastAPI", "Python"] },
    sections: {
      "problem": {
        "summary": "기존의 많은 탈출 게임은 서사의 부재로 인해 플레이어가 몰입하기 어려웠고, 고정된 힌트는 플레이어의 상황에 맞는 도움을 제공하지 못했습니다.",
        "keyQuestion": "플레이어의 상황에 맞는 힌트를 제공하면서, 자연스럽게 서사적 경험을 전달할 수 있는 방법이 무엇일까?",
        "problems": [
          {
            "id": "no-story",
            "title": "서사의 부재로 인한 몰입도 하락",
            "description": "기존의 많은 탈출 게임은 왜 탈출해야 하는가에 대한 정당성을 부여하지 못했고, 이는 몰입도의 하락으로 이어진다고 판단했습니다.",
            "evidence": [
              {
                "type": "observation",
                "content": "기존의 많은 게임은 퍼즐 해결을 중심으로 진행되어, 사건의 배경을 자연스럽게 탐색할 수 있는 상호작용이 부족했습니다."
              }
            ]
          },
          {
            "id": "aware-hints",
            "title": "진행 상태를 반영하지 못하는 고정된 힌트",
            "description": "동영상이나 공략 글과 같은 고정된 힌트는 플레이어가 어느 방에 있는지, 어떤 퍼즐을 해결했는지에 관계없이 동일한 정보를 제공합니다.",
            "evidence": [
              {
                "type": "constraint",
                "content": "같은 질문이라도 플레이어의 진행 단계에 따라 필요한 정보가 달라져야 했습니다."
              }
            ]
          }
        ]
      },
      "approach": {
        "body": "자유롭게 질문할 수 있는 LLM NPC를 도입하고, 정보 공개와 게임 진행은 규칙으로 통제했습니다.",
        "decisions": [
          {
            "title": "서버에서 LLM 호출",
            "body": "API Key 보호와 제어 로직 분리를 위해 FastAPI가 LLM 호출·프롬프트 생성·세션 관리를 전담하도록 했습니다."
          },
          {
            "title": "진행도에 맞는 정보만 전달",
            "body": "truthLevel에 해당하는 Truth Block만 프롬프트에 포함해, 아직 발견하지 않은 정보를 입력 단계에서 제한했습니다."
          },
          {
            "title": "판단과 표현의 역할 분리",
            "body": "퍼즐 판정과 상태 변경은 Rule 기반 로직이 담당하고, LLM은 허용된 정보를 자연스러운 대화로 표현하도록 했습니다."
          }
        ]
      },
      "howItWorks": {
        "body": "Unity가 질문과 게임 상태를 보내면, FastAPI가 공개 범위를 결정하고 LLM API가 답변을 생성합니다.",
        "diagram": {
          "src": "/Unity_architecture.svg",
          "alt": "llm_architecture"
        },
        "steps": [
          {
            "title": "Unity",
            "body": "상호작용과 진행 상태를 관리하고 질문·sessionId·truthLevel을 전송합니다. 응답은 채팅 UI에 순차적으로 표시합니다."
          },
          {
            "title": "FastAPI",
            "body": "세션 문맥을 조회하고 현재 단계의 Truth Block과 규칙으로 프롬프트를 구성합니다. API Key를 서버에서 관리하며 LLM을 호출합니다."
          },
          {
            "title": "LLM API",
            "body": "전달받은 정보와 규칙을 바탕으로 NPC 답변을 생성합니다. 응답은 서버를 거쳐 Unity로 스트리밍되며, 게임 상태는 직접 변경하지 않습니다."
          }
        ]
      },
      "challenges": {
        "body": "진행 상태의 일관성, 세션 문맥 분리, 대화의 체감 속도에 집중했습니다.",
        "items": [
          {
            "challenge": "같은 단서를 반복 조사하면 truthLevel이 중복 증가해, 진행하지 않은 스토리 단계가 열릴 수 있었습니다.",
            "solution": "이벤트마다 고유 Key를 부여하고 StateManager에서 처리 이력을 기록해, 최초 조사에만 진행도를 반영했습니다."
          },
          {
            "challenge": "단일 파일에 대화를 저장하면 여러 플레이 세션의 기록과 문맥이 섞일 수 있었습니다.",
            "solution": "게임 시작 시 sessionId를 발급하고 모든 요청에 포함해, 서버의 대화 기록과 상태를 세션별로 분리했습니다."
          },
          {
            "challenge": "전체 답변이 완성될 때까지 기다리는 방식은 NPC 대화의 흐름을 끊을 수 있었습니다.",
            "solution": "생성된 텍스트부터 Unity UI에 스트리밍해, 전체 응답 완료 전에도 답변을 읽을 수 있도록 했습니다."
          }
        ]
      },
      "results": {
        "body": "진행도에 맞춰 정보를 공개하는 NPC 대화와 세션별 문맥 관리를 구현했습니다. 직접 제작한 BGM도 상태 이벤트에 연결해, 대화와 음악이 같은 진행 흐름에 반응하도록 구성했습니다.",
        "metrics": [],
        "learning": "핵심은 모델 호출보다 AI와 게임 규칙의 책임을 나누는 일이었습니다. 공개 정보와 상태 변경은 시스템이 통제하고, AI는 표현을 맡도록 설계하는 중요성을 배웠습니다."
      },
      "next": {
        "limitations": "Chapter 1 데모를 목표로 구현한 사례입니다. 몰입도·응답 지연·정보 노출률의 정량적 검증과 실제 다중 사용자 부하 검증은 남아 있습니다.",
        "steps": "진행 단계별 질문으로 정보 노출을 점검하고, 첫 응답 시간과 전체 응답 시간을 측정하고자 합니다. 플레이테스트로 힌트의 적절성과 서사 이해도를 확인하는 것이 다음 과제입니다."
      }
    },
  },
  {
    slug: "agent-town-distillation",
    category: "AI × EFFICIENCY",
    title: "Agent Town Distillation",
    summary: "기존 Agent 시스템을 로컬 LLM으로 전환하고, 경량화 모델의 활용 가능성을 평가했습니다.",
    keywords: ["Local LLM", "Distillation", "Evaluation"],
    theme: "theme-efficiency",
    image: { src: agentTownImage.src, alt: "agent_town_img", caption: "※ 프로젝트 실행 화면을 AI로 재구성한 이미지입니다. 실제 실행 화면과는 다릅니다." },
    metadata: { type: "팀 프로젝트", period: "2025.01 - 2025.04", role: "로컬 모델 통합 · 데이터 수집", stack: ["Python", "PyTorch"] },
    sections: {
      problem: {
        summary: "NPC가 기억과 주변 상황을 바탕으로 계획·행동·대화를 생성하는 시뮬레이션으로, 행동을 결정할 때마다 LLM을 반복 호출했습니다. 이에 따른 API 과금과 응답 대기를 줄이고, 로컬 전환 이후의 추론 부담도 낮추고자 했습니다.", // 해결하려고 한 핵심 문제를 1~2문장으로 작성
        keyQuestion: "외부 API 의존을 줄이면서, 작은 로컬 모델로 기존 시뮬레이션을 얼마나 안정적으로 실행할 수 있을까?", // 선택: 프로젝트의 핵심 질문
        problems: [
          {
            id: "agent-town-problem-01",
            title: "반복 호출에 따라 누적되는 API 비용", // 세부 문제 01 제목
            description: "일정 생성·행동 세분화·기억 평가 등 여러 단계에서 GPT API를 호출해, Agent 수와 실행 단계가 늘수록 과금과 응답 대기가 누적됐습니다.", // 발생 상황과 사용자 또는 시스템에 미친 영향
            evidence: [
              {
                type: "metric", // 실제 근거에 맞게 유형 변경 가능
                label: "API Cost", // 선택: 근거의 짧은 제목
                content: "3 NPC 1 Timestep 기준 약 70k 토큰을 사용하여 약 0.11$의 비용이 발생했습니다.", // 이 문제를 확인한 근거
                source: "시뮬레이션 기반 실측", // 선택: 관찰 기록, 측정 조건 또는 발언 출처
              },
            ],
          },
          {
            id: "agent-town-problem-02",
            title: "로컬 전환 이후에도 남은 추론 부담", // 세부 문제 02 제목
            description: "로컬 Teacher인 Gemma3-12B도 반복 추론의 부담이 있어, Gemma3-1B로 경량화했을 때의 실행 시간과 품질을 비교할 필요가 있었습니다.",
            evidence: [
              {
                type: "metric",
                label: "Teacher 벤치마크 실행 시간",
                content: "Benchmark 기준 약 1.95초의 실행 시간이 소요되는 Gemma3-12B보다 작은 모델을 사용하면 이를 단축할 수 있을 것이라 판단했습니다.",
                source: "Benchmark 기반 팀 실험",
              },
              // 캡처가 준비되면 주석을 해제하고 경로와 대체 텍스트를 입력하세요.
              // { type: "screenshot", content: "", imageSrc: "", imageAlt: "" },
            ],
          },
        ],
      },
      approach: {
        body: "GPT API를 로컬 Teacher 모델로 전환하여 데이터 수집 과정에서의 API 호출 비용을 없애고, Student 모델로 경량화하여 실행 시간을 단축하고자 했습니다.", // 문제 해결 방향을 1~2문장으로 요약
        decisions: [
          { title: "Gemma3-12B로의 교체", body: "외부 API 의존을 줄이고 Teacher의 response와 logits를 확보하기 위해 로컬 Gemma3-12B를 연결했습니다." }, // 결정 01: 선택한 방법과 이유
          { title: "Knowledge Distillation", body: "실제 시뮬레이션 과정의 프롬프트를 학습에 활용했습니다. 팀은 Teacher logits 기반 KLD와 response 기반 CE를 조합하는 구조로 Student를 학습시켰습니다." }, // 결정 02: 비교한 대안과 선택 기준
          { title: "Trade-off 비교", body: "팀 실험에서 Student 학습 전후의 BLEU 등의 응답 품질과 Teacher 대비 벤치마크 시간을 비교하고, 실제 출력의 한계도 확인했습니다." }, // 결정 03: 고려한 제약과 트레이드오프
        ],
      },
      howItWorks: {
        body: "기존 시스템의 호출 흐름을 유지하며 Teacher를 연결하고, 실행 중 수집한 데이터를 Student 학습과 재적용으로 이어갔습니다.", // 전체 동작 흐름 요약
        diagram: { src: "/Agent_town_architecture.svg", alt: "agent_town_architecture", caption: "" }, // 구조도는 준비될 때 입력
        steps: [
          { title: "GPT API 교체", body: "GPT API를 로컬 Teacher 모델인 Gemma3-12B로 교체합니다. 비정형 출력을 제어하기 위해 프롬프트를 강화하고, 후처리 로직을 보완했습니다." }, // 단계 01: 입력 또는 시작 지점과 역할
          { title: "데이터 수집", body: "3개 Agent의 게임 시간 기준 8시간 실행에서 prompt·response·logits 약 700개 샘플을 수집했습니다. 텍스트는 JSON, logits는 연결된 .pt 파일로 저장했습니다." }, // 단계 02: 핵심 처리와 데이터 전달
          { title: "Knowledge Distillation", body: "팀원이 수집 데이터로 Gemma3-1B를 학습했고, 저는 학습된 Student를 기존 시뮬레이션에 다시 연결했습니다." }, // 단계 03: 결과 생성 또는 사용자에게 전달
        ],
      },
      challenges: {
        body: "단순한 API 교체만으로는 시뮬레이션이 중단되는 문제가 계속해서 발생했고, 이를 해결하기 위해 로컬 모델의 응답을 제어하여 시스템을 안정화하는데 집중했습니다.", // 구현 과정에서 마주친 주요 어려움 요약
        items: [
          { challenge: "API 교체 과정에서 기존 방대한 코드베이스의 LLM 호출 지점을 찾기 어려웠습니다. 또한 초기 팀원들의 전체 방향에 대한 이해가 상이했습니다.", solution: "함수 호출과 데이터 흐름을 도식화해 모델 교체·데이터 수집 지점을 특정하고, 팀원들과 통합 시 입출력 규격을 맞췄습니다." }, // 어려움 01과 직접 연결되는 해결 방법
          { challenge: "Gemma3-12B로 모델을 교체한 이후, 기존 코드와 호환되지 않는 응답으로 인해 시뮬레이션이 중단되었습니다.", solution: "Parser가 기대하는 형식과 추가 설명 제한을 프롬프트에 명시했습니다. 또한 불필요한 텍스트 제거와 형식 검증·후처리를 보강했습니다." },
          { challenge: "Tensor를 저장하는 과정에서, 용량이 저장 공간을 초과하여 데이터 수집이 멈추고, 이로 인해 시뮬레이션까지 중단되는 문제가 있었습니다.", solution: "데이터가 일정 용량 이상 모이면 자동 압축해 저장하도록 변경하여, 수집 과정의 저장 부담을 줄였습니다." } // 어려움 02와 해결 방법
          // , // 어려움 03과 해결 방법
        ],
      },
      results: {
        body: "로컬 전환으로 GPT API 호출 과금을 제거하고, 수집 데이터를 팀의 Student 학습에 연결했습니다. 팀 실험에서 Student 모델은 Teacher 모델 대비 벤치마크 실행 시간이 3배 이상 빨랐고, 학습 전후 BLEU는 약 2배 높아졌습니다.", // 실제 구현·운영 결과와 본인의 기여
        metrics: [
          { label: "GPT API 호출 과금", value: "$0.11 -> $0", context: "로컬 추론 전환 후" }, // 지표명 / 측정값 / 비교 기준·측정 조건
          { label: "벤치마크 실행 시간", value: "1.95s → 0.58s", context: "Teacher -> Student" }, // 측정한 지표만 작성, 없으면 metrics: []
          { label: "BLEU Score", value: "0.15 → 0.30", context: "Student 학습 전 → 후"}
        ],
        learning: "프롬프트뿐 아니라 비정형 응답의 제어와 후처리가 AI 시스템 전체의 안정성과 직결됨을 배웠습니다. 또한 시스템에 적합한 AI의 성능과 비용의 균형을 찾는 것이 중요함을 깨달았습니다.", // 경험을 통해 배운 점과 이후 달라진 판단 기준
      },
      next: {
        limitations: "Student 모델이 비현실적인 계획과 과도하게 긴 응답을 생성하는 한계가 있었습니다. 또한 GPT·Teacher와의 정량 품질 비교 및 전체 시뮬레이션 시간 측정은 수행하지 못했습니다.", // 현재 한계와 아직 검증하지 못한 부분
        steps: "Student 모델의 형식 준수율·계획 타당성·전체 실행 시간을 검증할 필요가 있습니다. 복잡한 계획 생성만 큰 모델에 맡기는 혼합 구조도 향후 검토 방향입니다.", // 다음 개선 또는 검증 계획
      },
    },
  },
  {
    slug: "calmato-web",
    category: "PRODUCT × BRAND",
    title: "Calmato Web",
    summary: "5만 구독자 채널 운영에서 발견한 문제를 사용자 참여형 웹 서비스와 브랜드 경험으로 확장했습니다.",
    keywords: ["Problem Definition", "Product Design", "Brand Experience"],
    theme: "theme-brand",
    image: { src: "/calmato_mockup.png", alt: "calmato_web_mockup" },
    metadata: { type: "팀 프로젝트", period: "2025.06 - 현재", role: "기획 및 개발", stack: ["Next.js", "Supabase", "TypeScript"] },
    sections: {
      problem: {
        summary: "유튜브에서 음악을 듣는 경험을 넘어, 구독자가 곡을 신청하고 이야기를 남기며 Calmato의 음악과 정서를 탐색할 공간이 필요했습니다.", // 해결하려고 한 핵심 문제를 1~2문장으로 작성
        keyQuestion: "브랜드 정체성 강화, 구독자와의 활발한 소통, 채널 콘텐츠 아카이빙 등의 기능을 한데 모을 수 없을까?", // 선택: 프로젝트의 핵심 질문
        problems: [
          {
            id: "calmato-problem-01",
            title: "음악 감상 이후의 참여 공간이 부족했습니다.", // 세부 문제 01 제목
            description: "영상 시청과 댓글 중심의 구조에서는 구독자가 요청을 모으고, 글을 남기며, 자신만의 방식으로 브랜드와 상호작용하기 어려웠습니다.", // 발생 상황과 사용자 또는 시스템에 미친 영향
            evidence: [
              {
                type: "observation", // 실제 근거에 맞게 유형 변경 가능
                label: "", // 선택: 근거의 짧은 제목
                content: "채널에는 음악 감상과 댓글 기능이 있었지만, 곡 신청·게시판·개인화된 감상을 연결하는 독립적인 공간은 부족했습니다.", // 이 문제를 확인한 근거
                source: "", // 선택: 관찰 기록, 측정 조건 또는 발언 출처
              },
            ],
          },
          {
            id: "calmato-problem-02",
            title: "유튜브 플랫폼의 한계", // 세부 문제 02 제목
            description: "유튜브 플랫폼만으로는 영상과 음악에 담긴 기획 의도를 전달하기 어려웠고, 구독자의 신청곡 관리가 어렵다는 문제가 있었습니다.",
            evidence: [
              {
                type: "quote",
                label: "",
                content: "곡 신청이 여러 영상에 분산되어 있어 집계와 관리가 어려워요. 그리고 우리의 영상에 담긴 의도를 전달하는 아카이브가 있으면 좋을 거 같아요.",
                source: "Calmato 운영/영상 담당 팀원",
              },
              // 캡처가 준비되면 주석을 해제하고 경로와 대체 텍스트를 입력하세요.
              // { type: "screenshot", content: "", imageSrc: "", imageAlt: "" },
            ],
          },
        ],
      },
      approach: {
        body: "음악 아카이브와 참여 기능을 한 공간에 모으고, 감상 경험부터 운영 도구까지 이어지는 웹 서비스를 설계했습니다.", // 문제 해결 방향을 1~2문장으로 요약
        decisions: [
          { title: "Supabase로 인프라 통합", body: "인증·DB·파일 저장소를 따로 구축하는 부담을 줄이고자 Supabase를 선택하고, RLS로 데이터 접근 권한을 제어했습니다." }, // 결정 01: 선택한 방법과 이유
          { title: "초기 화면과 상호작용 분리", body: "초기 데이터와 로그인·권한 판단은 SSR에서, 좋아요·댓글·오디오 조작은 CSR에서 처리하도록 역할을 나눴습니다." }, // 결정 02: 비교한 대안과 선택 기준
          { title: "음악적 정체성을 웹 경험으로", body: "환경음을 직접 조합하는 Web Audio 믹서와 WebGL 물결 인터랙션을 구현해, 콘텐츠 탐색을 넘어 머무르며 감상하는 경험을 구성했습니다." }, // 결정 03: 고려한 제약과 트레이드오프
        ],
      },
      howItWorks: {
        body: "브라우저의 사용자 조작, Next.js의 초기 화면 구성, Supabase의 데이터·권한 관리를 연결했습니다.", // 전체 동작 흐름 요약
        diagram: { src: "", alt: "", caption: "" }, // 구조도는 준비될 때 입력
        steps: [
          { title: "Browser / React", body: "검색·댓글·좋아요와 오디오 믹서를 처리합니다. 좋아요는 화면에 먼저 반영하고, 요청 실패 시 이전 상태로 되돌립니다." }, // 단계 01: 입력 또는 시작 지점과 역할
          { title: "Next.js SSR", body: "요청 쿠키로 사용자를 확인하고 게시판·신청곡의 초기 데이터를 구성합니다. 관리자 페이지는 로그인 여부와 역할을 검사합니다." }, // 단계 02: 핵심 처리와 데이터 전달
          { title: "Supabase", body: "Auth·DB·Storage가 인증과 콘텐츠를 관리합니다. RLS로 접근을 제한하고, Trigger로 좋아요 집계를 갱신합니다." }, // 단계 03: 결과 생성 또는 사용자에게 전달
        ],
      },
      challenges: {
        body: "인증 상태의 일치, 좋아요 데이터의 정합성, 삭제 작업의 부분 실패를 주요 과제로 다뤘습니다.", // 구현 과정에서 마주친 주요 어려움 요약
        items: [
          { challenge: "클라이언트에서 로그인해도 SSR 페이지가 인증 상태를 인식하지 못하는 문제가 있었습니다.", solution: "SSR 전용 Supabase 유틸에서 요청 쿠키를 파싱하고 Set-Cookie 헤더를 누적해, 서버에서도 로그인 상태와 권한을 판별하도록 했습니다." }, // 어려움 01과 직접 연결되는 해결 방법
          { challenge: "좋아요 수만 저장하면 중복 요청을 막거나 사용자별 상태와 실제 집계의 일치를 보장하기 어려웠습니다.", solution: "좋아요를 관계 테이블로 분리하고 사용자·게시글 조합에 UNIQUE 제약을 적용했습니다. Trigger로 집계를 갱신하고 화면에는 Optimistic UI를 적용했습니다." }, // 어려움 02와 해결 방법
          { challenge: "게시글의 DB 데이터만 삭제하면 첨부 파일이 남고, DB와 Storage 중 한쪽만 삭제에 성공할 수도 있었습니다.", solution: "연결된 이미지 경로를 함께 정리하고, DB 삭제와 파일 삭제의 결과를 구분했습니다. 부분 실패는 관리자에게 별도 메시지로 알리도록 했습니다." }, // 어려움 03과 해결 방법
        ],
      },
      results: {
        body: "음악 아카이브에 신청곡·게시판·프로필·관리자 기능을 연결했습니다. 모바일 입력과 탐색 흐름을 개선하고, 오디오 믹서와 시각 인터랙션으로 Calmato의 음악적 정체성을 웹으로 확장했습니다.", // 실제 구현·운영 결과와 본인의 기여
        metrics: [
          { label: "", value: "", context: "" }, // 지표명 / 측정값 / 비교 기준·측정 조건
          { label: "", value: "", context: "" }, // 측정한 지표만 작성, 없으면 metrics: []
        ],
        learning: "사용자 참여 기능은 화면 구현만으로 완성되지 않았습니다. 인증·권한·데이터 정합성과 운영자의 실패 대응까지 함께 설계해야 서비스 경험이 이어진다는 점을 배웠습니다.", // 경험을 통해 배운 점과 이후 달라진 판단 기준
      },
      next: {
        limitations: "[추가 작성] 실제 공개·운영 현황과 사용자 반응, 성능 측정 결과는 확인 후 입력할 예정입니다.", // 현재 한계와 아직 검증하지 못한 부분
        steps: "[추가 작성] 운영 및 사용성 점검에서 확인한 개선 우선순위와 다음 검증 계획을 입력할 예정입니다.", // 다음 개선 또는 검증 계획
      },
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
