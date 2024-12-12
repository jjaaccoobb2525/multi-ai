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
