import streamlit as st
from transformers import pipeline
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import streamlit as st

st.components.v1.iframe("https://multi-ai-iframe.vercel.app/")
st.markdown(
    """
      <style>
        .stMainBlockContainer {
          position: absolute;
          left: 0px;
          padding: 0px;
          z-index: 9999999
        }
      
        iframe {
          width: 100vw;
          height: 100vh;
          position: absolute;
          left: 0px;
        }
      </style>
    """,
    unsafe_allow_html=True,
)



# 요약 모델 초기화
summarizer = pipeline("summarization")

def summarize_text(text, max_length=60, min_length=25):
    """
    주어진 텍스트를 요약하는 함수
    :param text: 요약할 텍스트
    :param max_length: 요약문 최대 길이
    :param min_length: 요약문 최소 길이
    :return: 요약된 텍스트
    """
    if not text or len(text) < min_length:
        return text  # 텍스트가 짧으면 요약하지 않음
    summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
    return summary[0]['summary_text']

def generate_wordcloud(text):
    """
    주어진 텍스트를 기반으로 WordCloud 생성
    :param text: WordCloud를 생성할 텍스트
    :return: WordCloud 이미지의 base64 인코딩 값
    """
    if not text:
        return None

    # WordCloud 생성
    wordcloud = WordCloud(
        width=800,
        height=400,
        background_color='white',
        colormap='viridis',
        max_words=100
    ).generate(text)

    # WordCloud 이미지를 BytesIO에 저장
    image_stream = BytesIO()
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.tight_layout(pad=0)
    plt.savefig(image_stream, format='png')
    plt.close()

    # base64로 인코딩
    image_stream.seek(0)
    return base64.b64encode(image_stream.getvalue()).decode('utf-8')

# 세션 상태 초기화
for key in ["gpt", "gemini", "claude", "llama", "qwen"]:
    if f"{key}_summaries" not in st.session_state:
        st.session_state[f"{key}_summaries"] = []
    if f"{key}_wordclouds" not in st.session_state:
        st.session_state[f"{key}_wordclouds"] = []

# 새로운 프롬프트 처리 시 요약 및 WordCloud 생성
if prompt:
    summaries = []
    wordclouds = []

    for response in responses:  # AI 모델 응답 리스트
        summaries.append(summarize_text(response))
        wordclouds.append(generate_wordcloud(response))

    # 각 모델의 요약 및 WordCloud 세션 상태 업데이트
    st.session_state["gpt_summaries"].append(summaries[0])
    st.session_state["gemini_summaries"].append(summaries[1])
    st.session_state["claude_summaries"].append(summaries[2])
    st.session_state["llama_summaries"].append(summaries[3])
    st.session_state["qwen_summaries"].append(summaries[4])

    st.session_state["gpt_wordclouds"].append(wordclouds[0])
    st.session_state["gemini_wordclouds"].append(wordclouds[1])
    st.session_state["claude_wordclouds"].append(wordclouds[2])
    st.session_state["llama_wordclouds"].append(wordclouds[3])
    st.session_state["qwen_wordclouds"].append(wordclouds[4])

# 탭 구성에 요약 및 WordCloud 추가
with All:
    st.write("### 응답 요약 및 WordCloud")

    for i, (model_name, summaries, wordclouds) in enumerate([
        ("GPT", st.session_state["gpt_summaries"], st.session_state["gpt_wordclouds"]),
        ("Gemini", st.session_state["gemini_summaries"], st.session_state["gemini_wordclouds"]),
        ("Claude", st.session_state["claude_summaries"], st.session_state["claude_wordclouds"]),
        ("Llama", st.session_state["llama_summaries"], st.session_state["llama_wordclouds"]),
        ("Qwen", st.session_state["qwen_summaries"], st.session_state["qwen_wordclouds"]),
    ]):
        st.markdown(f"**{model_name} 요약**:")
        st.write(summaries[-1] if summaries else "요약 없음")

        st.markdown(f"**{model_name} WordCloud**:")
        if wordclouds and wordclouds[-1]:
            st.image(f"data:image/png;base64,{wordclouds[-1]}", use_column_width=True)
        else:
            st.write("WordCloud 생성 실패")
