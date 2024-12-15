'use server'

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'

export async function chatGPT(messages: { role: string, content: string }[]) {
  try {
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      messages,
    })
    return { response: text }
  } catch (error) {
    console.error('Error in GPT chat:', error)
    return { error: 'Failed to get response from GPT' }
  }
}

export async function chatGemini(messages: { role: string, content: string }[]) {
  try {
    const { text } = await generateText({
      model: google('gemini-pro'),
      messages,
    })
    return { response: text }
  } catch (error) {
    console.error('Error in Gemini chat:', error)
    return { error: 'Failed to get response from Gemini' }
  }
}

export async function chatClaude(messages: { role: string, content: string }[]) {
  try {
    const { text } = await generateText({
      model: anthropic('claude-3-opus'),
      messages,
    })
    return { response: text }
  } catch (error) {
    console.error('Error in Claude chat:', error)
    return { error: 'Failed to get response from Claude' }
  }
}

