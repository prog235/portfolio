// 메인 페이지의 채널 운영 소개. 실제 채널 주소가 준비되면 channelUrl을 입력하세요.
export const calmatoChannel = {
  name: "Calmato",
  channelUrl: "https://www.youtube.com/@%EC%B9%BC%EB%A7%88%ED%86%A0",
  heading: "만들고, 반응을 읽고, 다음 콘텐츠에 반영합니다.",
  description: "음악 콘텐츠를 꾸준히 제작·운영하며, 시청자의 반응을 다음 콘텐츠의 편곡과 기획에 반영해 왔습니다.",
  audience: "5.5만",
  audienceLabel: "구독자 규모",
  role: "음악 콘텐츠 제작 · 지표 분석 · 콘텐츠 개선",
  // public/calmato/에 파일을 넣고 /calmato/파일명 형식으로 입력하세요.
  logo: { src: "/Calmato_profile.svg", alt: "Calmato 채널 로고" },
  image: { src: "/Calmato_youtube.png", alt: "Calmato 채널 대표 이미지", caption: "" },
  cases: [
    {
      label: "LISTENING EXPERIENCE",
      title: "초반 이탈을 다음 편곡의 기준으로",
      observation: "업로드 이후 초반 이탈률이 큰 곡들의 특징을 분석했습니다.",
      action: "후속 콘텐츠의 편곡을 압축해, 청취자가 주요 선율을 오래 기다리지 않도록 구성했습니다.",
    },
    {
      label: "CONTENT DEVELOPMENT",
      title: "새로운 시도를 지속되는 시리즈로",
      observation: "새로운 콘텐츠를 공개한 뒤 댓글 반응과 채널 데이터를 살폈습니다.",
      action: "반응이 좋은 콘텐츠를 시리즈로 확장하며, 이후 제작 방향을 조정했습니다.",
    },
  ],
};
