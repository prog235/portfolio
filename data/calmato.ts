// 메인 페이지의 채널 운영 소개. 실제 채널 주소가 준비되면 channelUrl을 입력하세요.
export const calmatoChannel = {
  name: "Calmato",
  channelUrl: "",
  heading: "만들고, 반응을 읽고, 다음 콘텐츠에 반영합니다.",
  description: "음악 콘텐츠를 꾸준히 제작·운영하며, 시청자의 반응을 다음 콘텐츠의 편곡과 기획에 반영해 왔습니다.",
  audience: "5만",
  audienceLabel: "구독자 규모",
  role: "음악 콘텐츠 제작 · 지표 분석 · 콘텐츠 개선",
  // public/calmato/에 파일을 넣고 /calmato/파일명 형식으로 입력하세요.
  logo: { src: "", alt: "Calmato 채널 로고" },
  image: { src: "", alt: "Calmato 채널 대표 이미지", caption: "" },
  // src: mp4/webm 파일 경로 (YouTube 주소가 아닌 직접 재생 가능한 파일).
  // poster: 영상 표지 이미지. 대사가 있다면 captionsSrc에 한국어 WebVTT 자막 경로 입력.
  // 음악만 있는 영상은 description에 음악의 성격이나 감상 포인트를 설명하세요.
  videos: [
    { id: "clip-01", title: "", description: "", src: "", poster: "", captionsSrc: "" },
    { id: "clip-02", title: "", description: "", src: "", poster: "", captionsSrc: "" },
    { id: "clip-03", title: "", description: "", src: "", poster: "", captionsSrc: "" },
  ],
  cases: [
    {
      label: "LISTENING EXPERIENCE",
      title: "초반 이탈을 다음 편곡의 기준으로",
      observation: "초반 이탈이 큰 음원의 시청 지표를 확인했습니다.",
      action: "후속 콘텐츠의 편곡을 압축해, 청취자가 도입부에서 오래 기다리지 않도록 구성했습니다.",
    },
    {
      label: "CONTENT DEVELOPMENT",
      title: "새로운 시도를 지속되는 시리즈로",
      observation: "새로운 콘텐츠를 공개한 뒤 시청 지표로 반응을 살폈습니다.",
      action: "반응이 좋은 콘텐츠를 시리즈로 확장하며, 이후 제작 방향과 우선순위를 정했습니다.",
    },
  ],
};
